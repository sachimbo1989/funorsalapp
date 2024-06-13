import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

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
