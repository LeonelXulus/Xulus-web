// check-icon.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-check-icon',
  standalone: false,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="check-icon"
    >
      <defs>
        <linearGradient [id]="gradientId" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9000FF" />
          <stop offset="100%" stop-color="#9000FF" />
        </linearGradient>
      </defs>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" [attr.stroke]="'url(#' + gradientId + ')'" />
      <polyline points="22 4 12 14.01 9 11.01" [attr.stroke]="'url(#' + gradientId + ')'" />
    </svg>
  `,
  styles: [`
    .check-icon {
      display: block;
      flex-shrink: 0;
    }
  `]
})
export class CheckIconComponent {
  @Input() size: number = 16;
  // Generar un ID único para cada instancia del gradiente
  gradientId = `grad-${Math.random().toString(36).substr(2, 9)}`;
}