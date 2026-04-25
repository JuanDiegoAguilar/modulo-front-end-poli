import { Component, computed, effect, inject } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ServicesStore } from '../../../core/services/services-store.service';
import { Service } from '../../../core/models/service.model';

interface InfoCell {
  label: string;
  value: string;
  highlight?: boolean;
}

@Component({
  selector: 'app-service-detail',
  imports: [RouterLink],
  templateUrl: './service-detail.component.html',
})
export class ServiceDetailComponent {
  protected readonly store = inject(ServicesStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly params = toSignal<Params, Params>(this.route.params, {
    initialValue: {},
  });

  protected readonly service = computed<Service | undefined>(() => {
    const id = this.params()['id'] as string | undefined;
    if (!id) return undefined;
    return this.store.getById(id);
  });

  protected readonly infoCells = computed<InfoCell[]>(() => {
    const s = this.service();
    if (!s) return [];
    return [
      { label: 'Tiempo estimado', value: s.estimatedTime || '—' },
      { label: 'Modalidad', value: s.modality || '—' },
      { label: 'Tecnologías', value: s.technologies || '—' },
      { label: 'Disponibilidad', value: 'Disponible', highlight: true },
    ];
  });

  protected readonly relatedServices = computed(() => {
    const current = this.service();
    if (!current) return [];
    return this.store
      .services()
      .filter((s) => s.category === current.category && s.id !== current.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  });

  readonly favoriteBtnClasses = computed(() => {
    const s = this.service();
    if (!s) return '';
    const base = 'cursor-pointer rounded-lg border px-6 py-3 text-sm transition-colors';
    return this.store.isFavorite(s.id)
      ? `${base} border-red-200 bg-red-50 text-red-500`
      : `${base} border-gray-cararra text-gray-cod hover:border-red-200 hover:bg-red-50 hover:text-red-500`;
  });

  constructor() {
    effect(() => {
      const id = this.params()['id'] as string | undefined;
      if (id && !this.store.getById(id)) {
        this.router.navigate(['/servicios']);
      }
    });
  }

  goTo(id: string): void {
    this.router.navigate(['/servicios', id]);
  }

  onDelete(id: string): void {
    const ok = confirm(
      '¿Estás seguro de que deseas eliminar este servicio? Esta acción no se puede deshacer.',
    );
    if (!ok) return;
    this.store.deleteService(id);
    this.router.navigate(['/servicios']);
  }
}
