import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientesDataSource } from './clientes-datasource';
import { ClientesService } from '../servicios/clientes/clientes.service';
import { ClientesItem } from './clientes-item';
import Swal from 'sweetalert2';

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
  ) {
    this.dataSource = new ClientesDataSource(clientesService);
  }

  displayedColumns = ['id', 'nombre', 'apellido', 'email', 'createAt', 'editar', 'eliminar'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  delete(cliente: ClientesItem): void {
    Swal.fire({
      title: "Estás seguro?",
      text: `Seguro que desea eliminar al cliente ${cliente.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.delete(cliente).subscribe(
          response => {
              // Eliminar el cliente del arreglo de datos
            const index = this.dataSource.data.indexOf(cliente)
            this.dataSource.data.splice(index, 1)
            
              // Actualizar la referencia de datos de la tabla
            this.table.renderRows();
            
            Swal.fire({
              title: "Cliente eliminado",
              text: "Tu registro ha sido eliminado",
              icon: "success"
            });
          }
        )
      }
    });
  }
}
