import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';
import { Observable } from 'rxjs'; 
import { ResponseModel } from '../model/response.model';
import { CitaDTO } from '../model/citaDTO.model';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }


  public loginUser (user:UserModel): Observable<UserModel>{
    let url = 'http://localhost:4200/assets/data/user.data.json'
    return this.http.post<UserModel>(url,user);
  }


  public crearCita(citaModel:CitaDTO): Observable<ResponseModel>{ 
    let url = 'http://localhost:8080/apiCitas/crearCita'
    citaModel.statusCita= 1;
    return this.http.post<ResponseModel>(url,citaModel);
  }

  public editarCita(citaModel:CitaDTO): Observable<ResponseModel>{ 
    let url = 'http://localhost:8080/apiCitas/editarCita'
    citaModel.statusCita= 1;
    return this.http.put<ResponseModel>(url,citaModel);
  }

  public eliminarCita(citaDTO:CitaDTO): Observable<ResponseModel>{
    let url = 'http://localhost:8080/apiCitas/eliminarCita'
    citaDTO.statusCita= 0;
    return this.http.delete<ResponseModel>(url,{body:citaDTO});
  }


  public obtenerCitas(): Observable <ResponseModel>{
    let url = 'http://localhost:8080/apiCitas/consultarCitas';
    return this.http.get<ResponseModel>(url);
  }

}
