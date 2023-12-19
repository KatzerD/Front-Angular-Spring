import { Injectable } from '@angular/core';
import { formatDate} from '@angular/common';
import { Observable, map, of, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientesItem } from '../../clientes/clientes-item';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private url: string = "http://localhost:8080/api";

  private  _httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  //Con el Datasource
  /*getClientes(): ClientesDataSource{
    return new ClientesDataSource();
  }*/

  //Con la Api Rest
  getClientes(): Observable<ClientesItem[]>{
    return this._http.get<ClientesItem[]>(this.url+"/clientes").pipe(
      map(response=>{
        let clientes = response as ClientesItem[];

        return clientes.map(cliente=>{

          cliente.nombre = cliente.nombre.toUpperCase();
          cliente.createAt = formatDate(cliente.createAt, 'EEEE dd, MMMM yyyy', 'es');
          return cliente;

        })
      })
    );
  }
  
  getCliente(id: number): Observable<ClientesItem>{
    return this._http.get<ClientesItem>(this.url+"/clientes/"+id).pipe(
      catchError(e=>{
        this._router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e)
      })
    );
  }

  create(cliente: ClientesItem): Observable<ClientesItem>{
    return this._http.post(this.url+"/clientes/form", cliente, {headers: this._httpHeaders}).pipe(
      map((response: any) => response.cliente as ClientesItem),
      catchError(e=>{

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e)
      })
    );
  }

  update(cliente: ClientesItem): Observable<ClientesItem>{
    return this._http.put<ClientesItem>(this.url+"/clientes/"+cliente.id, cliente, {headers: this._httpHeaders}).pipe(
      map((response: any) => response.cliente as ClientesItem),
      catchError(e=>{

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e)
      })
    );;
  }

  delete(cliente: ClientesItem): Observable<ClientesItem>{
    return this._http.delete<ClientesItem>(this.url+"/clientes/"+cliente.id, {headers: this._httpHeaders}).pipe(
      map((response: any) => response.cliente as ClientesItem),
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e)
      })
    );
  }
}

