import { Component, Input } from '@angular/core';
import { Gasto } from '../../models/gasto.model';

@Component({
  selector: 'app-resumen',
  standalone: true,
  templateUrl: './resumen.component.html'
})
export class ResumenComponent {
  @Input() total: number = 0;
  @Input() gastos: Gasto[] = [];

  getCurrentDate(): string {
    const today = new Date();
    return today.toLocaleDateString('es-PE', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  getTransactionCount(): number {
    return this.gastos.length;
  }

  getAverageAmount(): string {
    if (this.gastos.length === 0) return 'S/ 0.00';
    const average = this.total / this.gastos.length;
    return `S/ ${average.toFixed(2)}`;
  }
}
