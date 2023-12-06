import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientesDataSource } from './clientes-datasource';
import { ClientesService } from '../servicios/clientes/clientes.service';
import { ClientesItem } from './clientes-item';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ClientesItem>;
  dataSource: ClientesDataSource;

  constructor(
    private clientesService: ClientesService 
  ){
    this.dataSource = new ClientesDataSource(clientesService);
  }
  
  displayedColumns = ['id', 'nombre', 'apellido', 'email', 'createAt'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
