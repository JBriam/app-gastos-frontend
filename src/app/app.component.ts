import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GastoFormComponent } from './components/gasto-form/gasto-form.component';
import { GastoListComponent } from './components/gasto-list/gasto-list.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { CommonModule } from '@angular/common';
import { Gasto } from './models/gasto.model';
import { GastoService } from './services/gasto.service'; // ✅ Añade esta línea

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    GastoFormComponent,
    GastoListComponent,
    ResumenComponent,
    //GraficasComponent,
  ],
  templateUrl: './app.component.html',
  //providers: [GastoService], // ✅ Proporciona GastoService aquí (opcional si ya usa providedIn: 'root')
})
export class AppComponent implements OnInit {
  gastos: Gasto[] = [];

  constructor(private gastoService: GastoService) {} // Solo para inyección de dependencias

  ngOnInit() {
    this.cargarGastos(); // ✅ Lugar correcto para inicialización
  }

  // Para cargar los gastos en mi página
  cargarGastos() {
    this.gastoService.obtenerGastos().subscribe({
      next: (gastos) => {
        this.gastos = gastos;
      },
      error: (error) => {
        console.error('Error al cargar gastos:', error);
      },
    });
  }

  // Para agregar gastos
  agregarGasto(nuevoGasto: Gasto) {
     this.cargarGastos(); // Vuelve a cargar todo desde el servidor
  }

  eliminarGasto(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este gasto?')) {
      this.gastoService.eliminarGasto(id).subscribe({
        next: () => this.cargarGastos(),
        error: err => console.error('Error eliminando gasto:', err)
      });
    }
  }

  get total() {
    return this.gastos.reduce((sum, g) => sum + g.monto, 0);
  }
}
