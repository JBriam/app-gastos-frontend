export interface Gasto {
  id?: number; // El ? indica que es opcional (útil al momento de crear un nuevo gasto)
  categoria: string;
  descripcion: string;
  monto: number;
  fecha: string;
  hora: string;
}

