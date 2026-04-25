import { Component, computed, input } from '@angular/core';

export type FeatureCardTheme = 'light' | 'dark';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
})
export class FeatureCardComponent {
  readonly emoji = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly theme = input<FeatureCardTheme>('light');

  readonly wrapperClasses = computed(() => {
    const base = 'flex gap-3.5 rounded-xl p-5';
    return this.theme() === 'dark'
      ? `${base} border border-white/[0.08] bg-white/[0.06]`
      : `${base} border border-gray-cararra bg-white`;
  });

  readonly iconClasses = computed(() => {
    const base =
      'flex size-10 min-w-10 items-center justify-center rounded-[10px] text-base';
    return this.theme() === 'dark' ? `${base} bg-white/10` : `${base} bg-gray-pampas`;
  });

  readonly titleClasses = computed(() =>
    this.theme() === 'dark'
      ? 'mb-1 text-[0.95rem] font-semibold text-white'
      : 'mb-1 text-[0.95rem] font-semibold text-gray-cod',
  );

  readonly descClasses = computed(() =>
    this.theme() === 'dark'
      ? 'text-[0.82rem] leading-snug text-white/55'
      : 'text-[0.82rem] leading-snug text-gray-dove',
  );
}
