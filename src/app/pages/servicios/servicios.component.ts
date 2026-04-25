import {
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { ServicesStore } from '../../core/services/services-store.service';
import { CATEGORIES } from '../../core/data/default-services';
import { ServiceCardComponent } from '../../shared/service-card/service-card.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { AddServiceModalComponent } from './add-service-modal/add-service-modal.component';

const SEARCH_DEBOUNCE_MS = 280;

@Component({
  selector: 'app-servicios',
  imports: [
    RouterOutlet,
    ServiceCardComponent,
    ButtonComponent,
    AddServiceModalComponent,
  ],
  templateUrl: './servicios.component.html',
})
export class ServiciosComponent {
  protected readonly store = inject(ServicesStore);
  private readonly router = inject(Router);

  readonly allCategories = ['all', ...CATEGORIES] as const;

  protected readonly activeCategory = signal<string>('all');
  protected readonly searchInput = signal<string>('');
  protected readonly searchQuery = signal<string>('');
  protected readonly modalOpen = signal(false);

  protected readonly showingDetail = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url.startsWith('/servicios/')),
      startWith(this.router.url.startsWith('/servicios/')),
    ),
    { initialValue: false },
  );

  readonly filteredServices = computed(() => {
    const cat = this.activeCategory();
    const q = this.searchQuery().toLowerCase();
    return this.store.services().filter((s) => {
      const matchesCat = cat === 'all' || s.category === cat;
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  });

  private searchTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect((onCleanup) => {
      const value = this.searchInput();
      if (this.searchTimer) clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.searchQuery.set(value.trim());
      }, SEARCH_DEBOUNCE_MS);
      onCleanup(() => {
        if (this.searchTimer) clearTimeout(this.searchTimer);
      });
    });
  }

  filterClasses(cat: string): string {
    const base =
      'rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer';
    return this.activeCategory() === cat
      ? `${base} border-gray-cod bg-gray-cod text-white`
      : `${base} border-gray-cararra bg-transparent text-gray-dove hover:border-gray-cod hover:text-gray-cod`;
  }

  setCategory(cat: string): void {
    this.activeCategory.set(cat);
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchInput.set(value);
  }

  goToService(id: string): void {
    this.router.navigate(['/servicios', id]);
  }

  openAddModal(): void {
    this.modalOpen.set(true);
  }
}
