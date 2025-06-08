import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resumen',
  standalone: true,
  templateUrl: './resumen.component.html'
})
export class ResumenComponent {
  @Input() total: number = 0;
}
