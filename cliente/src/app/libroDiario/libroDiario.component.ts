import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { CuentasService } from '../core/services/cuentas.service';
import { ClienteService } from '../core/services/cliente.service';
import { Cuenta } from '../plan-cuentas/plan-cuentas.component';
import { Subject, takeUntil } from 'rxjs';
import { libroDiarioService } from '../core/services/libroDiario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-libroDiario',
  templateUrl: './libroDiario.component.html',
  styleUrls: ['./libroDiario.component.css']
})
export class LibroDiarioComponent implements OnInit {
  informacionQuesera!: any;
  fechaSeleccionada!: Date;
  journalForm: FormGroup;
  fecha !: Date;
  private destroy$ = new Subject<any>();
  cuentas: Cuenta[] = [];
  availableAccounts!: Cuenta[];
  totalDebit = 0;
  totalCredit = 0;
  filteredAccounts: any[][] = [];
  currentComponent = 'VerDiarios';

  constructor(private fb: FormBuilder,
    private srvCuentas: CuentasService,
    private srvCliente: ClienteService,
    private srvLibroDiario: libroDiarioService
  ) {
    this.fechaSeleccionada = new Date();
    this.srvCliente.selectClienteLogueado$.subscribe((cliente: any) => {
      this.informacionQuesera = cliente;
      this.srvCuentas.obtenerCuentasDelCliente(this.informacionQuesera.int_cliente_id);
      this.obtenerCuentas();
    });

    this.journalForm = this.fb.group({
      entries: this.fb.array([this.createEntry()])
    });
  }
  obtenerCuentas(){
    this.srvCuentas.getCuentas$
    .pipe(takeUntil(this.destroy$))
    .subscribe((cuentas: any) => {
      this.availableAccounts = cuentas;
    });
  }
  verDiarios(){
    console.log('ver diarios');
    this.currentComponent = 'VerDiarios';
  }
  showComponent(component: string) {
    this.currentComponent = component;
  }
  ngOnInit() {
    this.updateSums();
  }

  get entries(): FormArray {
    return this.journalForm.get('entries') as FormArray;
  }

  createEntry(): FormGroup {
    return this.fb.group({
      // date: ['', Validators.required],
      code: ['', Validators.required],
      account: ['', Validators.required],
      debit: [0, Validators.min(0)],
      credit: [0, Validators.min(0)]
    });
  }

  addEntry() {
    this.entries.push(this.createEntry());
  }
  removeEntry(index: number) {
    this.entries.removeAt(index);
    this.updateSums();
  }

  updateSums() {
    this.totalDebit = this.entries.controls.reduce((sum, entry) => sum + Number(entry.get('debit')?.value || 0), 0);
    this.totalCredit = this.entries.controls.reduce((sum, entry) => sum + Number(entry.get('credit')?.value || 0), 0);
  }

  get isBalanced(): boolean {
    return this.totalDebit === this.totalCredit;
  }

  onSubmit() {
    if (this.journalForm.valid && this.isBalanced) {
      // Aquí puedes manejar la lógica de guardado
      console.log(this.journalForm.value);
      let infoLibroDiario = {
        fecha: this.fechaSeleccionada,
        entradas: this.journalForm.value.entries,
        idCliente: this.informacionQuesera.int_cliente_id
      };
      this.srvLibroDiario.createLibroDiario(infoLibroDiario)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if(data.status){
            Swal.fire({
              title: 'Registro exitoso',
              text: data.message,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            //limpiar formulario
            this.journalForm = this.fb.group({
              entries: this.fb.array([this.createEntry()])
            });
          }else{
            Swal.fire({
              title: 'Error',
              text: 'Ha ocurrido un error al crear el libro diario',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        },
      });



    } else {
      alert('Las sumas de débitos y créditos no coinciden o hay campos inválidos.');
    }
  }
  filterAccounts(index: number) {
    const entry = this.entries.at(index);
    const filterValue = entry.get('account')?.value.toLowerCase();
    this.filteredAccounts[index] = this.availableAccounts.filter(account =>
      account.str_cuenta_nombre.toLowerCase().includes(filterValue) || account.str_cuenta_codigo.toLowerCase().includes(filterValue)
    );
  }
  onAccountSelected(event: any, index: number) {
    const selectedAccount = this.availableAccounts.find(account => account.str_cuenta_nombre === event.option.value);
    if (selectedAccount) {
      const entry = this.entries.at(index);
      entry.patchValue({
        code: selectedAccount.str_cuenta_codigo,
        account: selectedAccount.str_cuenta_nombre
      });
    }
  }

  initializeFilteredAccounts() {
    this.filteredAccounts = this.entries.controls.map(() => this.availableAccounts.slice());
  }
  getAccountControl(index: number): FormControl {
    return this.entries.at(index).get('account') as FormControl;
  }
}
