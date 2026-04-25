import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

interface NavLink {
  key: string;
  label: string;
  path: string;
  exact: boolean;
}

const NAV_LINKS: NavLink[] = [
  { key: 'inicio', label: 'Inicio', path: '/', exact: true },
  { key: 'servicios', label: 'Servicios', path: '/servicios', exact: false },
  { key: 'favoritos', label: 'Favoritos', path: '/favoritos', exact: false },
  { key: 'nosotros', label: 'Nosotros', path: '/nosotros', exact: false },
  { key: 'contacto', label: 'Contacto', path: '/contacto', exact: false },
];

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ButtonComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly links = NAV_LINKS;
  protected readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
