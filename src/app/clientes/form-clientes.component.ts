import { Component } from '@angular/core';
import { ClientesComponent } from './clientes.component';
import { ClientesItem } from './clientes-item';
import { MatFormField } from '@angular/material/form-field';
import { ClientesService } from '../servicios/clientes/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrl:'./form-clientes.component.css'
})
export class FormClientesComponent {
  
  private titulo:string = "Crear cliente";
  public cliente: ClientesItem = new ClientesItem();

  constructor(
    private clienteService: ClientesService,
    private router: Router
  ){

  }
  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
      response => this.router.navigate(['/clientes'])
    )
  }

}
