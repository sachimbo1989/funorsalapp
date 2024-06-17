
import { Cuenta } from '../models/cuentas';
// cuentas.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  private cuentas: Cuenta[] = [];

  public idClienteLogueado!: number;

  private cuentasSubject$= new Subject<Cuenta[]>();

  private cuentasHijasByPadreId$: BehaviorSubject<Cuenta[]> = new BehaviorSubject<Cuenta[]>([]);

  private cuentaSeleccionada$: BehaviorSubject<Cuenta> = new BehaviorSubject<Cuenta>({
    int_cuenta_id: 0,
    str_cuenta_nombre: '',
    str_cuenta_codigo: '',
    int_cuenta_padre_id: null
  });

  setClienteLogueado(idCliente: number) {
    this.idClienteLogueado = idCliente;
  }


  constructor(private http:HttpClient) { }

  //rutas de la api
  private url = config.URL_API_BASE + 'cuentas';

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




  get getCuentas$() {
    return this.cuentasSubject$.asObservable();
  }
  //return this.http.post(this.urlApi_clientes, cliente);
  agregarCuenta(cuenta: any) {
    console.log('Agregando cuenta:', cuenta);
    //return this.http.post(this.url,cuenta);
  }


  agregarCuentaByIdCliente(cuenta: any) {
    console.log('Agregando cuenta:', cuenta);
    return this.http.post(this.url + '/cliente' ,cuenta,{

    });
  }

  //obtener cuentas por id de cliente
  getCuentasByIdCliente(id: number) {
    return this.http.get(this.url + '/cliente/' + id);
  }

  //funcion general para obtener las cuentas del cliente
  obtenerCuentasDelCliente(id:any){
    this.getCuentasByIdCliente(id).pipe().
    subscribe((cuentas: any) => {
      console.log('Cuentas 2:', cuentas.body);
      this.cuentasSubject$.next(cuentas.body);
    });
  }



  private getNextId(): number {
    return this.cuentas.length + 1;
  }




}




