// cuenta.interface.ts

export interface Cuenta {
  int_cuenta_id: number;
  nombre: string;
  codigo: string;
  int_cuenta_padre_id: number | null;
  children?: Cuenta[]; // Propiedad opcional para almacenar las cuentas hijas
}
