import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Gasto } from '../../models/gasto.model';
import { GastoService } from '../../services/gasto.service'; // Importante para inyectar el servicio
import { HttpClientModule } from '@angular/common/http'; // ✅ Añade esta línea

@Component({
  selector: 'app-gasto-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    //HttpClientModule, // ✅ Añade esto para que HttpClient esté disponible
  ],
  templateUrl: './gasto-form.component.html',
})
export class GastoFormComponent {
  descripcion: string = '';
  monto: number | null = null;
  categoria: string = '';

  @Output() nuevoGasto = new EventEmitter<Gasto>();

  constructor(private gastoService: GastoService) {} // Añadimos esta línea para la inyección

  agregar() {
    if (this.descripcion && this.monto && this.categoria) {
      const nuevoGasto: Omit<Gasto, 'id' | 'fecha' | 'hora'> = { // Modificamos esta línea para la inyección (this.nuevoGasto.emit)
        categoria: this.categoria,
        descripcion: this.descripcion,
        monto: this.monto
      };

      // Agregamos todo este campo para la inyección
      this.gastoService.agregarGasto(nuevoGasto).subscribe({
        next: (gastoGuardado) => {
          // Emitir el evento para actualizar la lista
          this.nuevoGasto.emit(gastoGuardado);
          
          console.log('Gasto guardado en el backend:', gastoGuardado);

          // Limpiar campos del formulario
          this.descripcion = '';
          this.monto = null;
          this.categoria = '';
        },
        error: (error) => {
          console.error('Error al guardar el gasto:', error);
        }
      });
    }
  }
  cancelar() {
    // Limpiar los campos del formulario
      this.descripcion = '';
      this.monto = null;
      this.categoria = '';
  }
}


