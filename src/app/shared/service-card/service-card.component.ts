import { Component, computed, input, output } from '@angular/core';
import { Service } from '../../core/models/service.model';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
})
export class ServiceCardComponent {
  readonly service = input.required<Service>();
  readonly isFavorite = input<boolean>(false);

  readonly viewDetail = output<string>();
  readonly toggleFavorite = output<string>();

  readonly iconAreaClasses = computed(
    () => `${this.service().color || 'bg-gray-pampas'}`,
  );

  readonly favoriteBtnClasses = computed(() => {
    const base =
      'flex size-9 cursor-pointer items-center justify-center rounded-full border transition-all duration-200';
    return this.isFavorite()
      ? `${base} border-red-200 bg-red-50 text-red-500`
      : `${base} border-gray-cararra text-gray-dusty hover:border-red-200 hover:bg-red-50 hover:text-red-500`;
  });
}
