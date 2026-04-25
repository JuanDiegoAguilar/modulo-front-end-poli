import {
  Component,
  DestroyRef,
  HostListener,
  effect,
  inject,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  readonly open = input<boolean>(false);
  readonly title = input<string>('');
  readonly submitText = input<string>('Guardar');
  readonly showFooter = input<boolean>(true);

  readonly closed = output<void>();
  readonly submitted = output<void>();

  constructor() {
    effect(() => {
      if (typeof document === 'undefined') return;
      document.body.style.overflow = this.open() ? 'hidden' : '';
    });

    // Si el modal se destruye (p. ej. el padre lo quita del DOM con @if)
    // mientras estaba abierto, el effect no alcanza a restablecer el scroll.
    // Garantizamos que siempre se libere al destruir el componente.
    inject(DestroyRef).onDestroy(() => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    });
  }

  onBackdropClick(_: MouseEvent): void {
    this.closed.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.closed.emit();
  }
}
