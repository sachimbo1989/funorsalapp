import { Component, OnInit } from '@angular/core';
import { libroDiarioService } from '../core/services/libroDiario.service';

@Component({
  selector: 'app-balanceComprobacion',
  templateUrl: './balanceComprobacion.component.html',
  styleUrls: ['./balanceComprobacion.component.css']
})
export class BalanceComprobacionComponent implements OnInit {

  clientes: any[] = [];
  librosDiarios: any[] = [];
  displayedColumns: string[] = ['fecha', 'descripcion', 'tipoTransaccion', 'acciones'];

  constructor(private libroDiarioService: libroDiarioService) {}

  ngOnInit() {
    this.libroDiarioService.getClientesE().subscribe(data => {
      this.clientes = data;
    });
  }

  onClienteChange(event: any) {
    const clienteId = event.value;
    this.libroDiarioService.getLibrosDiariosPorCliente(clienteId).subscribe(data => {
      this.librosDiarios = data;
    });
  }

  verDetalles(libroDiarioId: number) {
    // Aquí puedes manejar la lógica para ver los detalles del libro diario
    console.log('Ver detalles del libro diario:', libroDiarioId);
  }

}
