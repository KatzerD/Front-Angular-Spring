import { Injectable } from '@angular/core';
import { ClientesDataSource } from '../../clientes/clientes-datasource'
import { Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { ClientesItem } from '../../clientes/clientes-item';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private url: String = "http://localhost:8080/api";

  constructor(
    private _http: HttpClient
  ) { }

  //Con el Datasource
  /*getClientes(): ClientesDataSource{
    return new ClientesDataSource();
  }*/

  //Con la Api Rest
  getClientes(): Observable<ClientesItem[]>{
    return this._http.get<ClientesItem[]>(this.url+"/clientes");
  }
}

