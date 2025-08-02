import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Gasto } from '../../models/gasto.model';
import { GastoService } from '../../services/gasto.service';
import { PaginationService, PaginationInfo } from '../../services/pagination.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-gasto-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    PaginationComponent
  ],
  templateUrl: './gasto-list.component.html'
})
export class GastoListComponent implements OnInit, OnChanges {
  @Input() gastos: Gasto[] = [];
  @Output() eliminar = new EventEmitter<number>();

  // Propiedades para paginación
  currentPage: number = 1;
  itemsPerPage: number = 10;
  paginatedGastos: Gasto[] = [];
  paginationInfo!: PaginationInfo;

  constructor(
    private gastoService: GastoService,
    private paginationService: PaginationService
  ) {}

  ngOnInit() {
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['gastos']) {
      this.updatePagination();
    }
  }

  private updatePagination() {
    this.paginationInfo = this.paginationService.calculatePagination(
      this.gastos.length,
      this.currentPage,
      this.itemsPerPage
    );
    
    this.paginatedGastos = this.paginationService.getPageItems(
      this.gastos,
      this.currentPage,
      this.itemsPerPage
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  onItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reset to first page
    this.updatePagination();
  }

  onEliminar(id: number) {
    this.eliminar.emit(id);
  }

  getCategoryColor(categoria: string): string {
    const colors: { [key: string]: string } = {
      'Alimentación': 'bg-orange-400',
      'Transporte': 'bg-blue-400',
      'Entretenimiento': 'bg-purple-400',
      'Salud': 'bg-red-400',
      'Educación': 'bg-green-400',
      'Vivienda': 'bg-yellow-400',
      'Ropa': 'bg-pink-400',
      'Servicios': 'bg-indigo-400',
      'Otros': 'bg-gray-400'
    };
    return colors[categoria] || 'bg-gray-400';
  }
}
