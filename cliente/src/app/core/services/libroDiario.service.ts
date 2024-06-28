import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import config from 'config/config';
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

  constructor(private http: HttpClient) {}

  //ruta a la api
  private url = config.URL_API_BASE + 'libroDiario';


  //crear un libro diario
  createLibroDiario(libroDiario: any) {
    return this.http.post<LibroDiario>(`${this.url}`, libroDiario);
  }

  //obtener los libros diarios de un cliente
  getLibrosDiarios(int_cliente_id: number){
    return this.http.get<any>(`${this.url}/cliente/${int_cliente_id}`);
  }








}
