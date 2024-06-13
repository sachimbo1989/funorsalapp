import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  constructor() { }
  informacionQuesera!: any;
  currentComponent: string = 'registroIngreso';


  ngOnInit() {
    this.llenarInformacionQuesera();
  }

  llenarInformacionQuesera(){
    this.informacionQuesera = {
      nombre: "Cañitas",
      direccion: "Calle 123",
      telefono: "1234567890",
    }
  }


  showComponent(component: string) {
    this.currentComponent = component;
  }

}
