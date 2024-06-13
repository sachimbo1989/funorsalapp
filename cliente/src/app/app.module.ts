import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FailedComponent } from './failed/failed.component';
import { RouterModule } from '@angular/router';
import { LibroDiarioComponent } from './libroDiario/libroDiario.component';
import { BalanceGeneralComponent } from './balanceGeneral/balanceGeneral.component';
import { BalanceComprobacionComponent } from './balanceComprobacion/balanceComprobacion.component';
import { EstadoResultadosComponent } from './estadoResultados/estadoResultados.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PlanCuentasComponent } from './plan-cuentas/plan-cuentas.component';


import {MatTreeModule} from '@angular/material/tree';
import { SubcuentasComponent } from './subcuentas/subcuentas.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ModalComponent } from './modal/modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IngresosComponent } from './ingresos/ingresos.component';
import { RegistroIngresoComponent } from './registro-ingreso/registro-ingreso.component';
import { AgregarIngresosComponent } from './agregar-ingresos/agregar-ingresos.component';
import { ReportesIngresosComponent } from './reportes-ingresos/reportes-ingresos.component';
import { GastosComponent } from './gastos/gastos.component';
import { RegistroGastoComponent } from './registro-gasto/registro-gasto.component';
import { AgregarGastoComponent } from './agregar-gasto/agregar-gasto.component';
import { ReportesComponent } from './reportes/reportes.component';
import { AgregarCuentaComponent } from './agregar-cuenta/agregar-cuenta.component';
import {NativeDateAdapter} from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { EditarCuentaComponent } from './plan-cuentas/editar-cuenta/editar-cuenta.component';



@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    DashboardComponent,
      LoginComponent,
      FailedComponent,
      LibroDiarioComponent,
      BalanceGeneralComponent,
      BalanceComprobacionComponent,
      EstadoResultadosComponent,
      ConfiguracionComponent,
      ClienteComponent,
      CrearClienteComponent,
      InicioComponent,
      PerfilComponent,
      PlanCuentasComponent,
      SubcuentasComponent,
      ModalComponent,
      IngresosComponent,
      RegistroIngresoComponent,
      AgregarIngresosComponent,
      ReportesIngresosComponent,
      GastosComponent,
      RegistroGastoComponent,
      AgregarGastoComponent,
      ReportesComponent,
      AgregarCuentaComponent,
      EditarCuentaComponent
   ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatTreeModule,
    MatPaginatorModule,
    MatDialogModule,
    NativeDateModule,
    MatExpansionModule



  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent],

})
export class AppModule { }
