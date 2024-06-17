import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Transaccion {
  int_transaccion_id: number;
  str_transaccion_nombre: string;
  str_transaccion_codigo: string;
  int_cuenta_id: number;
  dc_detalle_transaccion_cantidad: number;
  dt_fecha_creacion: string;
}

@Component({
  selector: 'app-reportes-ingresos',
  templateUrl: './reportes-ingresos.component.html',
  styleUrls: ['./reportes-ingresos.component.css']
})
export class ReportesIngresosComponent implements OnInit {

  dataReporteIngresosGastos: Transaccion[] = [
    {int_transaccion_id: 1, str_transaccion_nombre: 'Gasto operaciones', str_transaccion_codigo: 'I1', int_cuenta_id: 5, dc_detalle_transaccion_cantidad: 10, dt_fecha_creacion: '2021-09-01'},
    {int_transaccion_id: 2, str_transaccion_nombre: 'FUNCONQUERUCOM', str_transaccion_codigo: 'I2', int_cuenta_id: 5, dc_detalle_transaccion_cantidad: 20, dt_fecha_creacion: '2021-09-02'},
    {int_transaccion_id: 3, str_transaccion_nombre: 'AMBROCIO YANCHALIQUIN', str_transaccion_codigo: 'I3', int_cuenta_id: 5, dc_detalle_transaccion_cantidad: 30, dt_fecha_creacion: '2021-09-03'},
    {int_transaccion_id: 4, str_transaccion_nombre: 'NUÑEZ DARWIN', str_transaccion_codigo: 'I4', int_cuenta_id: 5, dc_detalle_transaccion_cantidad: 40, dt_fecha_creacion: '2021-09-04'},
    {int_transaccion_id: 5, str_transaccion_nombre: 'venta COMEDOR MEDITERRANEO', str_transaccion_codigo: 'I1', int_cuenta_id: 6, dc_detalle_transaccion_cantidad: 25.3, dt_fecha_creacion: '2021-09-01'},
    {int_transaccion_id: 6, str_transaccion_nombre: 'venta FUNCONQUERUCOM', str_transaccion_codigo: 'I2', int_cuenta_id: 6, dc_detalle_transaccion_cantidad: 40.80, dt_fecha_creacion: '2021-09-02'},
    {int_transaccion_id: 7, str_transaccion_nombre: 'venta AMBROCIO YANCHALIQUIN', str_transaccion_codigo: 'I3', int_cuenta_id: 6, dc_detalle_transaccion_cantidad: 85.88, dt_fecha_creacion: '2021-09-03'},
    {int_transaccion_id: 8, str_transaccion_nombre: 'venta NUÑEZ DARWIN', str_transaccion_codigo: 'I4', int_cuenta_id: 6, dc_detalle_transaccion_cantidad: 50.22, dt_fecha_creacion: '2021-09-04'},
  ];

  ingresos: Transaccion[] = [];
  gastos: Transaccion[] = [];
  totalIngresos: number = 0;
  totalGastos: number = 0;
  resultadoEjercicio: number = 0;

  constructor() { }

  ngOnInit() {
    this.procesarDatos();
  }
  procesarDatos() {
    this.ingresos = this.dataReporteIngresosGastos.filter(t => t.int_cuenta_id === 6);
    this.gastos = this.dataReporteIngresosGastos.filter(t => t.int_cuenta_id === 5);

    this.totalIngresos = this.ingresos.reduce((acc, curr) => acc + curr.dc_detalle_transaccion_cantidad, 0);
    this.totalGastos = this.gastos.reduce((acc, curr) => acc + curr.dc_detalle_transaccion_cantidad, 0);

    this.resultadoEjercicio = this.totalIngresos - this.totalGastos;
  }

  //opcion de tomar captura de pantalla

  generarPDF() {
    const data = document.getElementById('reporte');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('reporte_ingresos_gastos.pdf');
      }).catch(error => {
        console.error('Error generating PDF:', error);
      });
    } else {
      console.error('Element with id "reporte" not found!');
    }
  }

}
