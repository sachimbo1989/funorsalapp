import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { libroDiarioService } from '../core/services/libroDiario.service';
import { Body } from '../core/models/cliente';

@Component({
  selector: 'app-libroDiario',
  templateUrl: './libroDiario.component.html',
  styleUrls: ['./libroDiario.component.css']
})
export class LibroDiarioComponent implements OnInit {

  transaccionForm: FormGroup;
  cuentas: any[] = [];
  clientes: any[] = [];
  data!: any;
  dataCuentas!: any;

  constructor(
    private fb: FormBuilder,
    private srvLibroDiario: libroDiarioService
  ) {
    this.transaccionForm = this.fb.group({
      cliente_id: ['', Validators.required], // Nuevo campo para cliente
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      detalles: this.fb.array([])
    });
  }

  ngOnInit() {

    this.srvLibroDiario.getClientes().subscribe(data => {
      this.data = data;
      this.llenarClientesEnSelect();
    }
    );

  }

  llenarClientesEnSelect() {
    this.clientes = this.data.body;
    console.log(this.clientes);
    for (let i = 0; i < this.clientes.length; i++) {
      this.clientes[i].nombre = this.clientes[i].str_cliente_nombre;
      // Asegurándonos de que el id esté correctamente asociado
      this.clientes[i].id = this.clientes[i].int_cliente_id;
    }
  }

  get detalles() {
    return this.transaccionForm.get('detalles') as FormArray;
  }

  addDetalle() {
    const detalleForm = this.fb.group({
      cuenta_id: ['', Validators.required],
      tipo: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0.01)]],
    });
    this.detalles.push(detalleForm);
  }

  removeDetalle(index: number) {
    this.detalles.removeAt(index);
  }


onClienteChange(event: Event) {
    const clienteId = this.transaccionForm.get('cliente_id')?.value;
    console.log('Cliente seleccionado ID:', clienteId);

    // Aquí llamas a tu servicio para obtener las cuentas del cliente por su ID
    this.srvLibroDiario.getCuentasPorCliente(clienteId).subscribe(cuentas => {
      this.dataCuentas = cuentas;
      console.log('Cuentas del cliente:', this.dataCuentas);
      this.llenarCuentasEnSelect();
    });
  }

  llenarCuentasEnSelect() {
    this.cuentas = this.dataCuentas.body;
    console.log('Cuentas:', this.cuentas);
    for (let i = 0; i < this.cuentas.length; i++) {
      this.cuentas[i].nombre = this.cuentas[i].str_cuenta_nombre;
      // Asegurándonos de que el id esté correctamente asociado
      this.cuentas[i].id = this.cuentas[i].int_cuenta_id;
    }

  }

  onSubmit() {
    if (this.transaccionForm.valid) {
      this.srvLibroDiario.createTransaccion(this.transaccionForm.value).subscribe(response => {
        console.log('Transacción creada', response);
        this.transaccionForm.reset();
        this.detalles.clear();
      });
    }
  }

}
