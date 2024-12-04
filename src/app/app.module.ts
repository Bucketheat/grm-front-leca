import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitasAltaComponent } from './citas/citas-alta/citas-alta.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './shared/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbDatepickerModule, NgbModule, NgbPopoverModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CitasConsultaComponent } from './citas/citas-consulta/citas-consulta.component';
import { HomeComponent } from './shared/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CitasAltaComponent,
    NavbarComponent,
    LoginComponent,
    CitasConsultaComponent,
    HomeComponent
  ],
  imports: [
    NgbDatepickerModule,
    NgbTimepickerModule, 
    NgbPopoverModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
