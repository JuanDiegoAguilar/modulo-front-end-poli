import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FooterLink {
  label: string;
  path?: string;
  href?: string;
}

const NAV_LINKS: FooterLink[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Servicios', path: '/servicios' },
  { label: 'Favoritos', path: '/favoritos' },
  { label: 'Nosotros', path: '/nosotros' },
  { label: 'Contacto', path: '/contacto' },
];

const SERVICE_LINKS: FooterLink[] = [
  { label: 'Desarrollo Web', href: '#' },
  { label: 'Cloud & DevOps', href: '#' },
  { label: 'Ciberseguridad', href: '#' },
  { label: 'Soporte IT', href: '#' },
];

const CONTACT_LINKS: FooterLink[] = [
  { label: 'info@technova.co', href: 'mailto:info@technova.co' },
  { label: '+57 300 123 4567', href: 'tel:+573001234567' },
  { label: 'Medellín, Colombia', href: '#' },
  { label: 'Formulario', path: '/contacto' },
];

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly navLinks = NAV_LINKS;
  readonly serviceLinks = SERVICE_LINKS;
  readonly contactLinks = CONTACT_LINKS;
}
