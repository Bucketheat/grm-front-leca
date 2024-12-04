import { Component } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap'; 
import { noop } from 'rxjs';
import { ApiServiceService } from '../../services/api-service.service';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citas-alta',
  templateUrl: './citas-alta.component.html',
  styleUrl: './citas-alta.component.css'
})
export class CitasAltaComponent {
  model!: NgbDateStruct;
  date!: { year: number; month: number };
  time = { hour: 13, minute: 30 };
  fecha: any;
  inputDatetimeFormat = 'yyyy-MM-dd HH:mm:ss';
  private onTouched: () => void = noop;


  idCita: string = '';
  paciente: string = '';
  tipoCita: string = '';
  medico: string = '';

  constructor(private apiService:ApiServiceService,private router:Router) {


  }

  inputBlur($event: any) {
    this.onTouched();
  }
  dateChange() {
    this.fecha = new Date(this.model.year, this.model.month, this.model.day, this.time.hour, this.time.minute)
  }

  onSubmit(form: any): void {
    if (form.valid) {
     this.apiService.crearCita(form.value).subscribe({
      next: (response) =>{
        Swal.fire(
          'Registro Exitoso',
          response.mensaje,
          'success'
        ).then( (result) =>{
          if(result.isConfirmed){
            this.router.navigate(['home']);
          }
        })
      },
      error: (error) =>{
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.mensaje, 
        }).then( (result) =>{
          if(result.isConfirmed){
            this.router.navigate(['home']);
          }
        })
      },
      complete: () => {
        console.log('fin de ejecución');
      }
     })
    } else {
      console.log('Form is invalid');
    }
  }
}
