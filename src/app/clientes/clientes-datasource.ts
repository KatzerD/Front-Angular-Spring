import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { ClientesService } from '../servicios/clientes/clientes.service';
import { ClientesItem } from './clientes-item';

export class ClientesDataSource extends DataSource<ClientesItem> {
  data: ClientesItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(
    private clienteService: ClientesService
  ) {
    super();
  }

  connect(): Observable<ClientesItem[]> {
    if (this.paginator && this.sort) {
      return merge(this.paginator.page, this.sort.sortChange)
        .pipe(
          startWith({}),
          switchMap(() => this.clienteService.getClientes()),
          map((data) => {
            this.data = this.getPagedData(this.getSortedData([...data]))
            return this.data
          }),
          catchError(() => {
            throw Error('Error loading clientes');
          })
        );
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {}

  private getPagedData(data: ClientesItem[]): ClientesItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: ClientesItem[]): ClientesItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/nombre columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
