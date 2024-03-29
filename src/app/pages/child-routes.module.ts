import { NgModule } from '@angular/core';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { AccountSettingsComponent } from "./accountSettings/accountSettings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { PerfilComponent } from "./perfil/perfil.component";

import { UsuariosComponent } from "./mantenimientos/usuarios/usuarios.component";
import { HospitalesComponent } from "./mantenimientos/hospitales/hospitales.component";
import { MedicosComponent } from "./mantenimientos/medicos/medicos.component";
import { MedicoComponent } from "./mantenimientos/medicos/medico.component";
import { BusquedasComponent } from "./busquedas/busquedas.component";
import { AdminGuard } from "../guards/admin.guard";
import { RouterModule, Routes } from '@angular/router';

const childRoutes:Routes = [
  {path:'',component:DashboardComponent, data:{titulo:'Dashboard'}},
  {path:'account-settings',component:AccountSettingsComponent, data:{titulo:'Settings'}},
  {path:'buscar/:termino',component:BusquedasComponent, data:{titulo:'Búsquedas'}},
  {path:'perfil',component:PerfilComponent, data:{titulo:'Perfil'}},
  {path:'grafica1',component:Grafica1Component, data:{titulo:'Grafica1'}},
  {path:'progress',component:ProgressComponent, data:{titulo:'Progress'}},
  {path:'promesas',component:PromesasComponent, data:{titulo:'Promesas'}},
  {path:'rxjs',component:RxjsComponent, data:{titulo:'RXJS'}},
  
  // Mantenimientos
  {path:'hospitales',component: HospitalesComponent, data:{titulo:'Hospitales de aplicación'}},
  {path:'medicos',component: MedicosComponent, data:{titulo:'Medicos de aplicación'}},
  {path:'medico/:id',component: MedicoComponent, data:{titulo:'Medicos de aplicación'}},
  
  // Rutas de administrador
  {path:'usuarios',canActivate: [AdminGuard], component: UsuariosComponent, data:{titulo:'Usuarios de aplicación'}},
];

@NgModule({
  imports:[RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }
