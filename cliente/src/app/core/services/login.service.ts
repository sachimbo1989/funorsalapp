import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import config from "config/config";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { }

  //Rutas de la API
  private urlApi_login : string = config.URL_API_BASE + 'login';

  logueado: boolean = false;
  public idClienteLogueado!: number;

  setClienteLogueado(idCliente: number) {
    this.idClienteLogueado = idCliente;
  }



  //Inicio de sesión
  login(usuario: string, contrasena: string) {
    return this.http.post(this.urlApi_login, {usuario, contrasena});
  }

}
