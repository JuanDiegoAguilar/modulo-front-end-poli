import { Component, inject, output, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ServicesStore } from '../../../core/services/services-store.service';
import {
  CATEGORIES,
  CATEGORY_COLORS,
} from '../../../core/data/default-services';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { Service } from '../../../core/models/service.model';

const MAX_INCLUDES = 10;

function modalityValidator(group: AbstractControl): ValidationErrors | null {
  const remote = group.get('remote')?.value;
  const hybrid = group.get('hybrid')?.value;
  return remote || hybrid ? null : { modalityRequired: true };
}

@Component({
  selector: 'app-add-service-modal',
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: './add-service-modal.component.html',
})
export class AddServiceModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(ServicesStore);

  readonly closed = output<void>();
  readonly created = output<Service>();

  readonly categories = CATEGORIES;
  readonly maxIncludes = MAX_INCLUDES;

  protected readonly modalityError = signal(false);

  readonly form = this.fb.group(
    {
      emoji: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      estimatedTime: ['', Validators.required],
      category: ['', Validators.required],
      remote: [false],
      hybrid: [false],
      technologies: [''],
      includes: this.fb.array<FormControl<string>>([]),
    },
    { validators: modalityValidator },
  );

  get includesArray(): FormArray<FormControl<string>> {
    return this.form.controls.includes;
  }

  hasError(name: keyof typeof this.form.controls): boolean {
    const ctrl = this.form.controls[name];
    return !!(ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty));
  }

  addInclude(): void {
    if (this.includesArray.length >= MAX_INCLUDES) return;
    this.includesArray.push(this.fb.nonNullable.control(''));
  }

  removeInclude(i: number): void {
    this.includesArray.removeAt(i);
  }

  submitForm(): void {
    this.form.markAllAsTouched();
    this.modalityError.set(this.form.errors?.['modalityRequired'] === true);

    if (this.form.invalid) return;

    const v = this.form.getRawValue();
    const modalityParts: string[] = [];
    if (v.remote) modalityParts.push('Remoto');
    if (v.hybrid) modalityParts.push('Híbrido');

    const category = v.category ?? '';
    const service: Service = {
      id: `service-id-${Date.now()}`,
      emoji: v.emoji ?? '',
      title: v.name ?? '',
      description: v.description ?? '',
      category,
      color: CATEGORY_COLORS[category] ?? 'bg-gray-pampas',
      estimatedTime: v.estimatedTime ?? '',
      modality: modalityParts.join(' / '),
      technologies: v.technologies ?? '',
      includes: (v.includes ?? []).map((s) => s.trim()).filter(Boolean),
    };

    this.store.addService(service);
    this.created.emit(service);
    this.closed.emit();
  }
}
