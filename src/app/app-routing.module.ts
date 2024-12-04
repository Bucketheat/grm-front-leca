import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasAltaComponent } from './citas/citas-alta/citas-alta.component';
import { LoginComponent } from './shared/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CitasConsultaComponent } from './citas/citas-consulta/citas-consulta.component';
import { HomeComponent } from './shared/home/home.component';

const APP_ROUTES: Routes = [
  
  {path:'login',component:LoginComponent}, 
  {path:'home', component:HomeComponent},
  {path:'altaCitas',component:CitasAltaComponent}, 
  {path:'consultaCita',component:CitasConsultaComponent}, 
  {path:'**',pathMatch:'full',redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
