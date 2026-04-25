import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ServicesStore } from '../../core/services/services-store.service';
import { ContactInfoCardComponent } from '../../shared/contact-info-card/contact-info-card.component';

function trimmedRequired(control: AbstractControl): ValidationErrors | null {
  if (typeof control.value !== 'string') return null;
  return control.value.trim().length === 0 ? { required: true } : null;
}

const CONTACT_INFO = [
  {
    emoji: '📧',
    label: 'Email',
    value: 'info@technova.co',
    bgColor: '#ebf1ff',
  },
  {
    emoji: '📞',
    label: 'Teléfono',
    value: '+57 300 123 4567',
    bgColor: '#f0fdf4',
  },
  {
    emoji: '📍',
    label: 'Ubicación',
    value: 'Medellín, Colombia',
    bgColor: '#fff7ed',
  },
  {
    emoji: '🕐',
    label: 'Horario',
    value: 'Lun – Vie, 8:00 – 18:00',
    bgColor: '#f5f3ff',
  },
];

@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule, ContactInfoCardComponent],
  templateUrl: './contacto.component.html',
})
export class ContactoComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(ServicesStore);

  readonly contactInfo = CONTACT_INFO;
  readonly services = this.store.services;

  protected readonly submitted = signal(false);

  readonly form = this.fb.group({
    nombre: ['', [Validators.required, trimmedRequired]],
    apellido: ['', [Validators.required, trimmedRequired]],
    email: ['', [Validators.required, Validators.email]],
    telefono: [''],
    servicio: ['', Validators.required],
    mensaje: ['', [Validators.required, trimmedRequired]],
  });

  inputClasses(name: keyof typeof this.form.controls): string {
    const base =
      'w-full rounded-lg border bg-[#fafaf9] px-4 py-3 text-[15px] text-gray-cod outline-none transition-all duration-300 placeholder:text-gray-dusty focus:border-blue-royal focus:bg-white focus:ring-[3px] focus:ring-blue-royal/15';
    return this.showError(name)
      ? `${base} border-red-500 focus:border-red-500 focus:ring-red-500/15`
      : `${base} border-gray-cararra`;
  }

  showError(name: keyof typeof this.form.controls): boolean {
    const ctrl = this.form.controls[name];
    return !!(ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty));
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.submitted.set(true);
  }

  reset(): void {
    this.form.reset({
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      servicio: '',
      mensaje: '',
    });
    this.submitted.set(false);
  }
}
