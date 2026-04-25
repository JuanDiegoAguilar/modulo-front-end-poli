import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/inicio/inicio.component').then((m) => m.InicioComponent),
    title: 'TechNova — Plataforma de Servicios Digitales',
  },
  {
    path: 'servicios',
    loadComponent: () =>
      import('./pages/servicios/servicios.component').then(
        (m) => m.ServiciosComponent,
      ),
    title: 'TechNova — Servicios',
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/servicios/service-detail/service-detail.component').then(
            (m) => m.ServiceDetailComponent,
          ),
      },
    ],
  },
  {
    path: 'favoritos',
    loadComponent: () =>
      import('./pages/favoritos/favoritos.component').then(
        (m) => m.FavoritosComponent,
      ),
    title: 'TechNova — Mis favoritos',
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./pages/contacto/contacto.component').then(
        (m) => m.ContactoComponent,
      ),
    title: 'TechNova — Contacto',
  },
  {
    path: 'nosotros',
    loadComponent: () =>
      import('./pages/nosotros/nosotros.component').then(
        (m) => m.NosotrosComponent,
      ),
    title: 'TechNova — Nosotros',
  },
  { path: '**', redirectTo: '' },
];
