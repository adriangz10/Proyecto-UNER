import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GestionAdminComponent } from './components/gestion-admin/actividades-admin.component';
import { loginGuard } from './guards/isloggedin.guard';
import { rolesGuard } from './guards/roles.guard';
import { RolesEnum } from './enums/roles.enum';
import { ActividadesTransportistaComponent } from './components/gestion-repartidor/actividades-trasnportista.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: GestionAdminComponent,
    canMatch: [loginGuard],
    canActivate: [rolesGuard],
    data: { role: RolesEnum.administrador },
  },
  {
    path: 'repartidor',
    component: ActividadesTransportistaComponent,
    canMatch: [loginGuard],
    canActivate: [rolesGuard],
    data: { role: RolesEnum.repartidor },
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
