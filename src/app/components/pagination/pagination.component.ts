import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationInfo } from '../../services/pagination.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
      <!-- Información de paginación -->
      <div class="text-sm text-gray-600 order-2 sm:order-1">
        Mostrando {{ paginationInfo.startIndex + 1 }} - {{ paginationInfo.endIndex }} 
        de {{ paginationInfo.totalItems }} elementos
      </div>
      
      <!-- Controles de paginación -->
      <div class="flex items-center gap-2 order-1 sm:order-2" *ngIf="paginationInfo.totalPages > 1">
        <!-- Botón anterior -->
        <button 
          (click)="goToPage(paginationInfo.currentPage - 1)"
          [disabled]="paginationInfo.currentPage === 1"
          class="px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed
                 enabled:hover:bg-teal-100 enabled:text-teal-700
                 bg-white border border-gray-300">
          ‹ Anterior
        </button>
        
        <!-- Números de página -->
        <div class="hidden sm:flex items-center gap-1">
          <button 
            *ngFor="let page of visiblePages"
            (click)="goToPage(page)"
            [class]="getPageButtonClasses(page)"
            class="px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200">
            {{ page }}
          </button>
        </div>
        
        <!-- Selector de página en móvil -->
        <div class="sm:hidden">
          <select 
            [value]="paginationInfo.currentPage"
            (change)="onPageSelectChange($event)"
            class="px-2 py-1 rounded-md text-sm border border-gray-300 bg-white">
            <option *ngFor="let page of allPages" [value]="page">
              Página {{ page }}
            </option>
          </select>
        </div>
        
        <!-- Botón siguiente -->
        <button 
          (click)="goToPage(paginationInfo.currentPage + 1)"
          [disabled]="paginationInfo.currentPage === paginationInfo.totalPages"
          class="px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed
                 enabled:hover:bg-teal-100 enabled:text-teal-700
                 bg-white border border-gray-300">
          Siguiente ›
        </button>
      </div>
      
      <!-- Selector de elementos por página -->
      <div class="flex items-center gap-2 text-sm order-3">
        <label for="itemsPerPage" class="text-gray-600">Mostrar:</label>
        <select 
          id="itemsPerPage"
          [value]="paginationInfo.itemsPerPage"
          (change)="onItemsPerPageChange($event)"
          class="px-2 py-1 rounded-md border border-gray-300 bg-white text-gray-700">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
      </div>
    </div>
  `
})
export class PaginationComponent {
  @Input() paginationInfo!: PaginationInfo;
  @Input() maxVisiblePages: number = 5;
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  get visiblePages(): number[] {
    const pages: number[] = [];
    const totalPages = this.paginationInfo.totalPages;
    const currentPage = this.paginationInfo.currentPage;
    const maxVisible = Math.min(this.maxVisiblePages, totalPages);
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxVisible / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, start + maxVisible - 1);
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  get allPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.paginationInfo.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  getPageButtonClasses(page: number): string {
    const baseClasses = 'hover:bg-teal-100 hover:text-teal-700';
    const activeClasses = 'bg-teal-500 text-white hover:bg-teal-600';
    const inactiveClasses = 'bg-white border border-gray-300 text-gray-700';
    
    return page === this.paginationInfo.currentPage ? activeClasses : `${baseClasses} ${inactiveClasses}`;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.paginationInfo.totalPages && page !== this.paginationInfo.currentPage) {
      this.pageChange.emit(page);
    }
  }

  onPageSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const page = parseInt(target.value, 10);
    this.goToPage(page);
  }

  onItemsPerPageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const itemsPerPage = parseInt(target.value, 10);
    this.itemsPerPageChange.emit(itemsPerPage);
  }
}
