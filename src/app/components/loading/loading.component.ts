import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 shadow-xl max-w-sm mx-4 text-center">
        <!-- Spinner -->
        <div class="flex justify-center mb-4">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
        
        <!-- Loading text -->
        <p class="text-gray-700 font-medium">{{ message }}</p>
        
        <!-- Progress bar (optional) -->
        <div *ngIf="showProgress" class="mt-4">
          <div class="bg-gray-200 rounded-full h-2">
            <div 
              class="bg-amber-500 h-2 rounded-full transition-all duration-300 ease-out"
              [style.width.%]="progress">
            </div>
          </div>
          <p class="text-sm text-gray-500 mt-2">{{ progress }}%</p>
        </div>
      </div>
    </div>
  `
})
export class LoadingComponent {
  @Input() isLoading: boolean = false;
  @Input() message: string = 'Cargando...';
  @Input() showProgress: boolean = false;
  @Input() progress: number = 0;
}
