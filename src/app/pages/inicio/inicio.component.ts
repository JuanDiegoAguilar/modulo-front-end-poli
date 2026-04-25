import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesStore } from '../../core/services/services-store.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { ServiceCardComponent } from '../../shared/service-card/service-card.component';
import { TestimonialCardComponent } from '../../shared/testimonial-card/testimonial-card.component';
import { FeatureCardComponent } from '../../shared/feature-card/feature-card.component';
import { StatComponent } from '../../shared/stat/stat.component';

const TESTIMONIALS = [
  {
    name: 'Carlos Méndez',
    role: 'CTO, DataFlow Corp',
    initials: 'CM',
    quote:
      'Migraron toda nuestra infraestructura a AWS en tiempo récord. El soporte post-migración fue excepcional.',
  },
  {
    name: 'Laura Ríos',
    role: 'CEO, ComercioYa',
    initials: 'LR',
    quote:
      'La app móvil que desarrollaron incrementó nuestras ventas un 40% en el primer trimestre.',
  },
  {
    name: 'Jorge Patiño',
    role: 'Director TI, FinServ',
    initials: 'JP',
    quote:
      'Su equipo de ciberseguridad detectó vulnerabilidades que otros 3 proveedores no encontraron.',
  },
];

const FEATURES = [
  {
    emoji: '⚡',
    title: 'Respuesta rápida',
    description: 'Tiempos de respuesta menores a 2 horas en soporte técnico.',
  },
  {
    emoji: '🔄',
    title: 'Metodología ágil',
    description:
      'Sprints semanales con entregables visibles y retroalimentación constante.',
  },
  {
    emoji: '📈',
    title: 'Escalabilidad',
    description:
      'Arquitecturas diseñadas para crecer con tu negocio sin fricciones.',
  },
];

const STATS = [
  { value: '120+', label: 'Servicios' },
  { value: '3.2k', label: 'Clientes' },
  { value: '99.9%', label: 'Uptime' },
];

@Component({
  selector: 'app-inicio',
  imports: [
    ButtonComponent,
    ServiceCardComponent,
    TestimonialCardComponent,
    FeatureCardComponent,
    StatComponent,
  ],
  templateUrl: './inicio.component.html',
})
export class InicioComponent {
  protected readonly store = inject(ServicesStore);
  private readonly router = inject(Router);

  readonly testimonials = TESTIMONIALS;
  readonly features = FEATURES;
  readonly stats = STATS;

  readonly featuredServices = computed(() => {
    const all = this.store.services();
    if (all.length <= 6) return all;
    return [...all].sort(() => Math.random() - 0.5).slice(0, 6);
  });

  goToService(id: string): void {
    this.router.navigate(['/servicios', id]);
  }
}
