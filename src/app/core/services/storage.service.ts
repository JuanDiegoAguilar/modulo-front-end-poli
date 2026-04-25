import { Injectable } from '@angular/core';

export const SERVICES_KEY = 'technova_services';
export const FAVORITES_KEY = 'technova_favorites';

@Injectable({ providedIn: 'root' })
export class StorageService {
  read<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  write<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* localStorage no disponible o cuota excedida — fallamos en silencio. */
    }
  }
}
