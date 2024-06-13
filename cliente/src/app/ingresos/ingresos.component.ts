import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

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
