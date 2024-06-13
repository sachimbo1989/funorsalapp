import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
// cliente.model.ts
export interface Cliente {
  int_cliente_id: number;
  str_cliente_nombre: string;
}

// libro-diario.model.ts
export interface LibroDiario {
  int_libro_diario_id: number;
  dt_libro_diario_fecha: Date;
  int_tipo_transaccion_id: number;
  str_libro_diario_descripcion: string;
  int_cliente_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class libroDiarioService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createTransaccion(transaccion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transacciones`, transaccion);
  }

  // getCuentas(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/cuentas`);
  // }

  getCuentas(){
    return this.http.get(`${this.apiUrl}/cuentas`);
  }
  getCuentasPorCliente(id:any){
    return this.http.get(`${this.apiUrl}/cuentas/cliente/${id}`);
  }

  // getClientes(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/clientes`);
  // }
  getClientes(){
    return this.http.get(`${this.apiUrl}/clientes/todos`);
  }

  getClientesE(): Observable<Cliente[]> {
    const clientes: Cliente[] = [
      { int_cliente_id: 1, str_cliente_nombre: 'Cliente 1' },
      { int_cliente_id: 2, str_cliente_nombre: 'Cliente 2' },
      { int_cliente_id: 3, str_cliente_nombre: 'Cliente 3' }
    ];
    return of(clientes);
  }


  getLibrosDiariosPorCliente(clienteId: number): Observable<any> {
    const librosDiarios = [
      {
        int_libro_diario_id: 1,
        dt_libro_diario_fecha: new Date(),
        int_tipo_transaccion_id: 1,
        str_libro_diario_descripcion: 'Descripción 1',
        int_cliente_id: 1
      },
      {
        int_libro_diario_id: 2,
        dt_libro_diario_fecha: new Date(),
        int_tipo_transaccion_id: 2,
        str_libro_diario_descripcion: 'Descripción 2',
        int_cliente_id: 1
      },
      {
        int_libro_diario_id: 3,
        dt_libro_diario_fecha: new Date(),
        int_tipo_transaccion_id: 1,
        str_libro_diario_descripcion: 'Descripción 3',
        int_cliente_id: 2
      }
    ];
    const filteredLibrosDiarios = librosDiarios.filter(libro => libro.int_cliente_id === clienteId);
    return of(filteredLibrosDiarios);
  }



}
