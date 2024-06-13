
import { Cuenta } from '../models/cuentas';
// cuentas.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  private cuentas: Cuenta[] = [];

  private cuentasSubject: BehaviorSubject<Cuenta[]> = new BehaviorSubject<Cuenta[]>(this.cuentas);

  private cuentasHijasByPadreId$: BehaviorSubject<Cuenta[]> = new BehaviorSubject<Cuenta[]>([]);

  private cuentaSeleccionada$: BehaviorSubject<Cuenta> = new BehaviorSubject<Cuenta>({
    int_cuenta_id: 0,
    nombre: '',
    codigo: '',
    int_cuenta_padre_id: null
  });

  constructor(private http:HttpClient) { }

  //rutas de la api
  private url = config.URL_API_BASE + '/cuentas';

  setCuentasHijasByPadreId(cuentasHijasByPadreId: Cuenta[]) {
    this.cuentasHijasByPadreId$.next(cuentasHijasByPadreId);
  }
  get selectCuentasHijasByPadreId() {
    return this.cuentasHijasByPadreId$.asObservable();
  }

  setCuentaSeleccionada(cuenta: Cuenta) {
    this.cuentaSeleccionada$.next(cuenta);
  }

  get selectCuentaSeleccionada() {
    return this.cuentaSeleccionada$.asObservable();
  }

  getCuentas(): Observable<Cuenta[]> {
    return this.cuentasSubject.asObservable();
  }
//return this.http.post(this.urlApi_clientes, cliente);
  agregarCuenta(cuenta: any) {
    console.log('Agregando cuenta:', cuenta);
    //return this.http.post(this.url,cuenta);
  }

  editarCuenta(cuenta: Cuenta) {
    const index = this.cuentas.findIndex(c => c.int_cuenta_id === cuenta.int_cuenta_id);
    if (index !== -1) {
      this.cuentas[index] = cuenta;
      this.ordenarCuentas();
      this.cuentasSubject.next(this.cuentas);
    }
  }

  private getNextId(): number {
    return this.cuentas.length + 1;
  }

  private ordenarCuentas() {
    // Ordenar por int_cuenta_id para asegurar un orden inicial antes de estructurar
    this.cuentas.sort((a, b) => a.int_cuenta_id - b.int_cuenta_id);

    // Crear una estructura jerárquica de cuentas
    const cuentasJerarquicas = this.organizarCuentasJerarquicamente(this.cuentas);

    // Sustituir el array plano por el array jerárquico
    this.cuentas = cuentasJerarquicas;
  }

  private organizarCuentasJerarquicamente(cuentas: Cuenta[]): Cuenta[] {
    const cuentasMap = new Map<number, Cuenta>();

    // Crear un mapa de cuentas por su int_cuenta_id
    cuentas.forEach(cuenta => {
      cuentasMap.set(cuenta.int_cuenta_id, cuenta);
      cuenta.children = [];
    });

    // Construir la estructura jerárquica
    const cuentasJerarquicas: Cuenta[] = [];
    cuentas.forEach(cuenta => {
      if (cuenta.int_cuenta_padre_id !== null && cuentasMap.has(cuenta.int_cuenta_padre_id)) {
        const padre = cuentasMap.get(cuenta.int_cuenta_padre_id);
        if (padre) {
          if (!padre.children) {
            padre.children = []; // Asegurar que padre.children esté inicializado
          }
          padre.children.push(cuenta);
        }
      } else {
        cuentasJerarquicas.push(cuenta);
      }
    });

    return cuentasJerarquicas;
  }
}




