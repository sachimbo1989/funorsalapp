import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {


  constructor() { }
  informacionQuesera!: any;
  currentComponent: string = 'cliente';


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
