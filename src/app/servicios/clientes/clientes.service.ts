import { Injectable } from '@angular/core';
import { ClientesDataSource } from '../../clientes/clientes-datasource'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientesItem } from '../../clientes/clientes-item';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private url: string = "http://localhost:8080/api";

  private  _httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

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

  create(cliente: ClientesItem): Observable<ClientesItem>{
    return this._http.post<ClientesItem>(this.url, cliente, {headers: this._httpHeaders});
  }
}

