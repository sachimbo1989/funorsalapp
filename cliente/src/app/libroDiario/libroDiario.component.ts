import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { libroDiarioService } from '../core/services/libroDiario.service';
import { Body } from '../core/models/cliente';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-libroDiario',
  templateUrl: './libroDiario.component.html',
  styleUrls: ['./libroDiario.component.css']
})
export class LibroDiarioComponent implements OnInit {

  libroDiarioForm: FormGroup;

  cuentas = [
    { codigo: '100', nombre: 'Caja' },
    { codigo: '200', nombre: 'Bancos' },
    // Agrega más cuentas según sea necesario
  ];

  columnas: string[] = ['cuenta', 'nombreCuenta', 'codigoCuenta', 'montoCredito', 'montoDebito', 'eliminar'];

  constructor(private fb: FormBuilder) {
    this.libroDiarioForm = this.fb.group({
      entradas: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.agregarEntrada(); // Agregar una entrada inicial al iniciar el componente
  }

  get entradasFormArray() {
    return this.libroDiarioForm.get('entradas') as FormArray;
  }

  agregarEntrada() {
    const entrada = this.fb.group({
      cuenta: ['', Validators.required],
      nombreCuenta: [''],
      codigoCuenta: [''],
      montoCredito: ['', Validators.required],
      montoDebito: ['', Validators.required],
    });

    this.entradasFormArray.push(entrada);
  }

  seleccionarCuenta(event: MatSelectChange, entradaIndex: number) {
    const cuentaSeleccionada = event.value;
    const cuenta = this.cuentas.find(c => c.codigo === cuentaSeleccionada);
    if (cuenta) {
      const entradaFormGroup = this.entradasFormArray.at(entradaIndex);
      entradaFormGroup.patchValue({
        nombreCuenta: cuenta.nombre,
        codigoCuenta: cuenta.codigo
      });
    }
  }

  eliminarEntrada(index: number) {
    this.entradasFormArray.removeAt(index);
  }

  calcularTotalCreditos() {
    let totalCreditos = 0;
    if (this.entradasFormArray) {
      this.entradasFormArray.controls.forEach(entrada => {
        const montoCreditoControl = entrada.get('montoCredito');
        if (montoCreditoControl && montoCreditoControl.value) {
          const montoCredito = parseFloat(montoCreditoControl.value);
          if (!isNaN(montoCredito)) {
            totalCreditos += montoCredito;
          }
        }
      });
    }
    return totalCreditos;
  }

  calcularTotalDebitos() {
    let totalDebitos = 0;
    if (this.entradasFormArray) {
      this.entradasFormArray.controls.forEach(entrada => {
        const montoDebitoControl = entrada.get('montoDebito');
        if (montoDebitoControl && montoDebitoControl.value) {
          const montoDebito = parseFloat(montoDebitoControl.value);
          if (!isNaN(montoDebito)) {
            totalDebitos += montoDebito;
          }
        }
      });
    }
    return totalDebitos;
  }

  onSubmit() {
    if (this.libroDiarioForm.valid) {
      // Lógica para guardar el libro diario
      console.log(this.libroDiarioForm.value);
    } else {
      // Mostrar errores o manejar formulario inválido según sea necesario
      console.log('Formulario inválido');
    }
  }
}
