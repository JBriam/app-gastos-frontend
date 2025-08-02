import { Injectable } from '@angular/core';

export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
}

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  
  constructor() { }

  /**
   * Calcula la información de paginación
   */
  calculatePagination(totalItems: number, currentPage: number, itemsPerPage: number): PaginationInfo {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return {
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      startIndex,
      endIndex
    };
  }

  /**
   * Obtiene los elementos de una página específica
   */
  getPageItems<T>(items: T[], currentPage: number, itemsPerPage: number): T[] {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }

  /**
   * Genera un array de números de página para mostrar en la navegación
   */
  getPageNumbers(totalPages: number, currentPage: number, maxVisible: number = 5): number[] {
    const pages: number[] = [];
    
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
}
