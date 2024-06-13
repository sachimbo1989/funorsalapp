import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import config from "config/config";
import { Cliente } from "../models/cliente";
import Swal from "sweetalert2";
import { Subject, takeUntil } from "rxjs";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
 export class ClienteService {

  constructor(private http: HttpClient) { }

  private destroy$ = new Subject<any>();
  private clientesPaginados$ = new Subject<Cliente>();

  //metodos de accesos

  setClientesPaginados(clientes: any) {
    this.clientesPaginados$.next(clientes);
  }

  get selectClientesPaginados$() {
    return this.clientesPaginados$.asObservable();
  }



  //Rutas de la API
  private urlApi_clientes : string = config.URL_API_BASE + 'clientes';


  //Obtener todos los clientes
  getClientes() {
    return this.http.get<Cliente>(this.urlApi_clientes);
  }

  //Obtener clientes paginados
  getClientesPaginados(page: number, limit: number) {
    let params = new HttpParams()
    .set('page', page)
    .set('size', limit);
    return this.http.get(this.urlApi_clientes, {params});
  }

  //Obtener un cliente
  getCliente(id: string) {
    return this.http.get(this.urlApi_clientes + '/' + id);
  }

  //Crear un cliente
  createCliente(cliente: any) {
    return this.http.post(this.urlApi_clientes, cliente);
  }

  //Actualizar un cliente
  updateCliente(id: number, cliente: any) {
    return this.http.put(this.urlApi_clientes + '/' + id, cliente);
  }

  //Eliminar un cliente

  deleteCliente(id: string) {
    return this.http.delete(this.urlApi_clientes + '/' + id);
  }

  //funcion general para obtener los clientes

  obtenerClientesPaginados(page: number, limit: number) {
    console.log('Obteniendo clientes paginados', page, limit);
    this.getClientesPaginados(page, limit)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: any) => {
        this.setClientesPaginados(data);
      },
      error: (error: any) => {
        Swal.fire('Error', error.message, 'error');
      }
    })
  }




 }
