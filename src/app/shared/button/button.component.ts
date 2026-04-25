import { Component, computed, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

export type ButtonType = 'primary' | 'secondary' | 'ghost';

const BASE_CLASS =
  'inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium no-underline transition-all duration-300';

const TYPE_CLASSES: Record<ButtonType, string> = {
  primary: `${BASE_CLASS} bg-gray-cod text-white hover:opacity-85 cursor-pointer`,
  secondary: `${BASE_CLASS} border border-gray-cararra bg-white text-gray-cod hover:bg-gray-pampas cursor-pointer`,
  ghost: `${BASE_CLASS} text-gray-dove hover:bg-gray-pampas hover:text-gray-cod cursor-pointer`,
};

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  readonly type = input<ButtonType>('primary');
  readonly href = input<string | null>(null);
  readonly routerLink = input<string | string[] | null>(null);
  readonly customClass = input<string>('');
  readonly buttonType = input<'button' | 'submit'>('button');
  readonly clicked = output<MouseEvent>();

  readonly classes = computed(() => {
    const base = TYPE_CLASSES[this.type()] ?? TYPE_CLASSES.primary;
    return `${base} ${this.customClass()}`.trim();
  });
}
