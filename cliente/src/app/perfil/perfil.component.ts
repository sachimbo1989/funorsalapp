import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  dataCuenta = {
    int_usuario_id: 1,
    str_usuario_nombre: 'Juan',
    str_usuario_apellido: 'Perez',
    str_usuario_email: 'correo@gmail.com',
    str_usuario_password: 'hola',
    str_usuario_telefono: '12345678',
    str_usuario_direccion: 'direccion',
    str_usuario_rol: 'usuario',
    str_usuario_estado: 'ACTIVO'
  }
  perfilForm!: FormGroup;


  ngOnInit() {
    this.perfilForm = this.fb.group({
      str_usuario_nombre: [this.dataCuenta.str_usuario_nombre],
      str_usuario_apellido: [this.dataCuenta.str_usuario_apellido],
      str_usuario_email: [this.dataCuenta.str_usuario_email],
      str_usuario_password: [this.dataCuenta.str_usuario_password],
      str_usuario_telefono: [this.dataCuenta.str_usuario_telefono],
      str_usuario_direccion: [this.dataCuenta.str_usuario_direccion],
      str_usuario_rol: [this.dataCuenta.str_usuario_rol],
      str_usuario_estado: [this.dataCuenta.str_usuario_estado]
    });
  }

  constructor(public dialog: MatDialog,private fb: FormBuilder) {}

  openModal(size: string): void {
    this.dialog.open(ModalComponent, {
      data: { size: size,
              contentType: 'editarCuenta'
       }
    });
  }

  onSave() {
    console.log("Click",this.perfilForm.value);
  }

}
