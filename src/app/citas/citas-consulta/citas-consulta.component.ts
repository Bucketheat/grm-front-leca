import { Component, inject, TemplateRef } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { CitaDTO } from '../../model/citaDTO.model';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { noop } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citas-consulta',
  templateUrl: './citas-consulta.component.html',
  styleUrl: './citas-consulta.component.css'
})
export class CitasConsultaComponent {

  model!: NgbDateStruct;
  date!: { year: number; month: number };
  time = { hour: 13, minute: 30 };
  fecha: any;
  inputDatetimeFormat = 'yyyy-MM-dd HH:mm:ss';
  private onTouched: () => void = noop;


  idCita?: number ;
  paciente?: string;
  tipoCita?: string;
  medico?: string;


  page = 1;
	pageSize = 4;
	collectionSize = 0;
	citas:CitaDTO[];
  citasFull: CitaDTO[];

  private modalService = inject(NgbModal);
	closeResult = '';

	constructor(private apiService:ApiServiceService,private router:Router) { 
		this.citas = [];
    this.citasFull = [];
    this.consultarLista();
    this.refreshCountries();
	}

	consultarLista() {
    this.apiService.obtenerCitas().subscribe({
      next: (response) =>{ 
        this.citas = response.data
        this.citasFull = response.data; 
        this.collectionSize = this.citas.length;
        console.log(this.citas)
      },
      error: (error) =>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.mensaje, 
        }) 
      },
      complete: () => {
        console.log('fin de ejecución');
      }
    })
	}

  refreshCountries() {
		this.citas = this.citasFull?.map((country, i) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}


  editarCita(citaObj:CitaDTO,content: TemplateRef<any>){
    this.open(content);
    console.log(citaObj);

    this.idCita = citaObj.idCita;
    this.paciente = citaObj.paciente;
    this.fecha = citaObj.fecha;
    this.medico = citaObj.medico;
    this.tipoCita = citaObj.tipoCita;
  }


  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}


  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}


  onSubmit(form: any): void {
    if (form.valid) {
      
     this.apiService.editarCita(form.value).subscribe({
      next: (response) =>{
        Swal.fire(
          'Actualizacion Exitoso',
          response.mensaje,
          'success'
        ).then( (result) =>{
          if(result.isConfirmed){
            
            this.consultarLista();
            this.router.navigate(['consultaCita']);
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
            this.router.navigate(['consultaCita']);
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

  
  inputBlur($event: any) {
    this.onTouched();
  }
  dateChange() {
    this.fecha = new Date(this.model.year, this.model.month, this.model.day, this.time.hour, this.time.minute)
  }

  eliminar(citaDto:CitaDTO){

    console.log(citaDto);

    Swal.fire({
      title: "Esta seguro?",
      text: "No volverá a editar este paciente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar esto!"
    }).then((result) => {
      if (result.isConfirmed) {
        
        let citaNew: CitaDTO = new Object();

        citaNew.idCita = citaDto.idCita;
        citaNew.paciente = citaDto.paciente;
        citaNew.medico = citaDto.medico;
        citaNew.fecha = citaDto.fecha;
        citaNew.statusCita = citaDto.statusCita;
        citaNew.tipoCita = citaDto.tipoCita;

        this.apiService.eliminarCita(citaNew).subscribe({
          next: (response) =>{
            Swal.fire({
              title: "Eliminado!",
              text: response.mensaje,
              icon: "success"
            });
            this.consultarLista();
          },
          error: (error) =>{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.error.mensaje, 
            });
          },
          complete: () => {
            console.log('fin de ejecución');
          }
        }) 
      }
    });



    console.log(citaDto);
  }
}
