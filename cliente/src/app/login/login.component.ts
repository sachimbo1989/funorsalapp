import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../core/services/login.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Formulario de inicio de sesión
  public usuario: string = "";
  public contrasena: string = "";
  loginForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      usuario: ['',[Validators.required]],
      contrasena: ['', [Validators.required]]
    });
  }

  ngOnInit() {

  }

  iniciarSesion(){
      if (this.loginForm.valid) {
        // Conectarse al servidor
        Swal.fire({
          title: 'Iniciando sesión',
          text: 'Espere por favor...',
          allowOutsideClick: false,
          showConfirmButton: false
        });
        this.loginService.login(this.loginForm.get('usuario')?.value, this.loginForm.get('contrasena')?.value).subscribe(
          (data: any) => {
            if(data.status){
              console.log("Data usuario Logueado",data);
              Swal.close();
              Swal.fire({
                title: 'Inicio de sesión correcto',
                text: 'Bienvenido',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/inicio']);
              this.loginService.logueado = true;
            }else{
              Swal.close();
              Swal.fire({
                title: 'Error',
                text: 'Usuario o contraseña incorrectos',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/login']);
            }

          },
          (error) => {
            console.log(error);
            Swal.close();
            Swal.fire({
              title: 'Error',
              text: 'Usuario o contraseña incorrectos',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
            });
          }
        );

      } else {
        console.log("Formulario inválido");
      }


  }

}
