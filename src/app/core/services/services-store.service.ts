import { Injectable, computed, inject, signal } from '@angular/core';
import { Service } from '../models/service.model';
import { DEFAULT_SERVICES } from '../data/default-services';
import { FAVORITES_KEY, SERVICES_KEY, StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class ServicesStore {
  private readonly storage = inject(StorageService);

  private readonly _services = signal<Service[]>(this.loadServices());
  private readonly _favorites = signal<string[]>(this.loadFavorites());

  readonly services = this._services.asReadonly();
  readonly favorites = this._favorites.asReadonly();

  readonly favoriteServices = computed(() => {
    const favs = this._favorites();
    return this._services().filter((s) => favs.includes(s.id));
  });

  isFavorite(id: string): boolean {
    return this._favorites().includes(id);
  }

  getById(id: string): Service | undefined {
    return this._services().find((s) => s.id === id);
  }

  addService(service: Service): void {
    const next = [...this._services(), service];
    this._services.set(next);
    this.storage.write(SERVICES_KEY, next);
  }

  deleteService(id: string): void {
    const next = this._services().filter((s) => s.id !== id);
    this._services.set(next);
    this.storage.write(SERVICES_KEY, next);

    // Si el servicio borrado estaba en favoritos, también lo limpiamos.
    const favs = this._favorites();
    if (favs.includes(id)) {
      const cleaned = favs.filter((f) => f !== id);
      this._favorites.set(cleaned);
      this.storage.write(FAVORITES_KEY, cleaned);
    }
  }

  toggleFavorite(id: string): boolean {
    const favs = this._favorites();
    const isNowFav = !favs.includes(id);
    const next = isNowFav ? [...favs, id] : favs.filter((f) => f !== id);
    this._favorites.set(next);
    this.storage.write(FAVORITES_KEY, next);
    return isNowFav;
  }

  setFavorites(ids: string[]): void {
    this._favorites.set(ids);
    this.storage.write(FAVORITES_KEY, ids);
  }

  private loadServices(): Service[] {
    const stored = this.storage.read<Service[]>(SERVICES_KEY);
    if (stored && Array.isArray(stored)) {
      return stored;
    }
    this.storage.write(SERVICES_KEY, DEFAULT_SERVICES);
    return [...DEFAULT_SERVICES];
  }

  private loadFavorites(): string[] {
    const stored = this.storage.read<string[]>(FAVORITES_KEY);
    if (!stored || !Array.isArray(stored)) {
      return [];
    }
    // Purga ids inválidos (replica pruneInvalidFavoriteIds del legacy).
    const validIds = new Set(this.loadServicesForPrune().map((s) => s.id));
    const pruned = stored.filter((id) => validIds.has(id));
    if (pruned.length !== stored.length) {
      this.storage.write(FAVORITES_KEY, pruned);
    }
    return pruned;
  }

  private loadServicesForPrune(): Service[] {
    return this.storage.read<Service[]>(SERVICES_KEY) ?? DEFAULT_SERVICES;
  }
}
