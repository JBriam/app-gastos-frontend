import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Gasto } from '../../models/gasto.model';


@Component({
  selector: 'app-graficas',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './graficas.component.html',
})
export class GraficasComponent implements OnChanges {
  @Input() gastos: Gasto[] = [];

  gastosPorDiaData: ChartData<'line'> = { labels: [], datasets: [] };
  topCategoriasData: ChartData<'bar'> = { labels: [], datasets: [] };
  gastosMensualesData: ChartData<'line'> = { labels: [], datasets: [] };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
  };

  ngOnChanges(): void {
    if (this.gastos && this.gastos.length > 0) {
      this.gastosPorDiaData = this.generarGastosPorDia();
      this.topCategoriasData = this.generarTopCategorias();
      this.gastosMensualesData = this.generarGastoMensual();
    }
  }

  private generarGastosPorDia(): ChartData<'line'> {
    const agrupado: { [mes: string]: number } = {};

    this.gastos.forEach(gasto => {
      const date = new Date(gasto.fecha);
      const mes = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      agrupado[mes] = (agrupado[mes] || 0) + gasto.monto;
    });

    const labels = Object.keys(agrupado).sort((a, b) =>
      new Date(a).getTime() - new Date(b).getTime()
    );
    const data = labels.map(mes => agrupado[mes]);

    return {
      labels,
      datasets: [
        {
          label: 'Gasto diario',
          data,
          fill: false,
          tension: 0.1,
        },
      ],
    };
  }

  private generarTopCategorias(): ChartData<'bar'> {
    const agrupado: { [categoria: string]: number } = {};
    this.gastos.forEach(gasto => {
      const categoria = gasto.categoria;
      agrupado[categoria] = (agrupado[categoria] || 0) + gasto.monto;
    });

    const labels = Object.keys(agrupado).sort();
    const data = labels.map(categoria => agrupado[categoria]);

    return {
      labels,
      datasets: [{ label: 'Categoría', data, backgroundColor: '#3b82f6' }],
    };
  }

  private generarGastoMensual(): ChartData<'line'> {
    const agrupado: { [mes: string]: number } = {};

    this.gastos.forEach(gasto => {
      const date = new Date(gasto.fecha);
      const mes = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      agrupado[mes] = (agrupado[mes] || 0) + gasto.monto;
    });

    const labels = Object.keys(agrupado).sort((a, b) =>
      new Date(a).getTime() - new Date(b).getTime()
    );
    const data = labels.map(mes => agrupado[mes]);

    return {
      labels,
      datasets: [
        {
          label: 'Gasto mensual',
          data,
          fill: false,
          borderColor: '#10b981',
          tension: 0.1,
        },
      ],
    };
  }
}

