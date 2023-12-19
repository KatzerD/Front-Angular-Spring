import { Component, OnInit } from '@angular/core';
import { ClientesItem } from './clientes-item';
import { ClientesService } from '../servicios/clientes/clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrl: './form-clientes.component.css'
})
export class FormClientesComponent {
  form: FormGroup;
  public cliente: ClientesItem = new ClientesItem();
  public errores: string[] = [];

  constructor(
    private clienteService: ClientesService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
          this.enlazarFormulario();
        })
      }
    })
  }

  enlazarFormulario(): void {
    this.form.setValue({
      nombre: this.cliente.nombre,
      apellido: this.cliente.apellido,
      email: this.cliente.email
    });
  }

  create(): void {

    this.cliente = { ...this.cliente, ...this.form.value };

    this.clienteService.create(this.cliente)
      .subscribe(
        cliente => {
          this.router.navigate(['/clientes']);
          Swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error("ERROR STATUS" + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.cliente = { ...this.cliente, ...this.form.value };
    this.clienteService.update(this.cliente).subscribe(cliente => {
      this.router.navigate(['/clientes']);
      Swal.fire('Cliente actualizado', `Cliente ${cliente.nombre} actualizado con éxito`, 'success')
    })
  }

}
