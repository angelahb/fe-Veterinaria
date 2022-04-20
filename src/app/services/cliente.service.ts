import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient
  ) { }

    //Obtener Ventas
    getClientes(): Observable<any>{
      //console.log(environment.URL_VENTAS);     
      return this.http.get(environment.URL_CLIENTE);
    }
  
    //Obtener una Venta segun el ID
    getUnCliente(id:string){
      return this.http.get(environment.URL_CLIENTE+'/'+id);
    }
  
    deleteCliente(id: string): Observable<any> {
      console.log("llego servicio");
      return this.http.delete(environment.URL_CLIENTE+'/'+id);
    }
  
    saveCliente(cliente: Cliente): Observable<any> {
      return this.http.post(environment.URL_CLIENTE, cliente);
    }
  
    editCliente(id: string, cliente: Cliente): Observable<any> {
      return this.http.put(environment.URL_CLIENTE+'/'+id, cliente);
    }

}
