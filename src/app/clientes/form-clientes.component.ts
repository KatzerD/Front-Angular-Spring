import { Component } from '@angular/core';
import { ClientesComponent } from './clientes.component';
import { ClientesItem } from './clientes-item';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrl:'./form-clientes.component.css'
})
export class FormClientesComponent {
  
  public cliente: ClientesItem = new ClientesItem();

  public create(): void{
    console.log("Clicked");
    console.log(this.cliente);
  }

}
