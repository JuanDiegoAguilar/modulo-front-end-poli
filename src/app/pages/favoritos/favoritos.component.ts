import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesStore } from '../../core/services/services-store.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';

@Component({
  selector: 'app-favoritos',
  imports: [ButtonComponent, EmptyStateComponent],
  templateUrl: './favoritos.component.html',
})
export class FavoritosComponent {
  protected readonly store = inject(ServicesStore);
  private readonly router = inject(Router);

  protected readonly removingId = signal<string | null>(null);

  readonly count = computed(() => this.store.favoriteServices().length);

  goToDetail(id: string): void {
    this.router.navigate(['/servicios', id]);
  }

  remove(id: string): void {
    this.removingId.set(id);
    setTimeout(() => {
      this.store.toggleFavorite(id);
      this.removingId.set(null);
    }, 300);
  }
}
