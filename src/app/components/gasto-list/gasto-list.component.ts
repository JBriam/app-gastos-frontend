import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Gasto } from '../../models/gasto.model';
import { GastoService } from '../../services/gasto.service'; // Importante para inyectar el servicio
import { HttpClientModule } from '@angular/common/http'; // ✅ Añade esta línea

@Component({
  selector: 'app-gasto-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    //HttpClientModule, // ✅ Añade esto para que HttpClient esté disponible
  ],
  templateUrl: './gasto-list.component.html'
})
export class GastoListComponent {
  @Input() gastos: Gasto[] = [];
  @Output() eliminar = new EventEmitter<number>();

  constructor(private gastoService: GastoService) {} // Añadimos esta línea para la inyección
}
