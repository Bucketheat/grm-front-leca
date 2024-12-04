import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import Swal from 'sweetalert2';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public formControl:FormGroup;

  constructor(private apiSerice: ApiServiceService,private router:Router){
    this.formControl = new FormGroup({
      user : new FormControl('',Validators.required),
      password : new FormControl('',Validators.required),
    });
  }



  login(){

    console.log(this.formControl.value)
    this.apiSerice.loginUser(this.formControl.value).subscribe({
      next: (response) =>{
        console.log(response)
        if(response.user == this.formControl.get('user')?.value && response.password == this.formControl.get('password')?.value){
          Swal.fire(
            'Inicio Exitoso',
            'Bienvenido '+response.user,
            'success'
          ).then( (result) =>{
            if(result.isConfirmed){
              this.router.navigate(['home']);
            }
          })
        }
      },
      error: (error)=>{
        console.log(error)
      },
      complete: () => {
        console.log('fin de ejecución');
      }
    })
  }

}
