import { Component, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-case-studies',
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.scss']
})
export class CaseStudiesComponent {
  currentCard = 0;
  totalCards = 3;
  isMobile = false;
  slideDirection: 'left' | 'right' = 'right';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  prev() {
    if (this.currentCard > 0) {
      this.slideDirection = 'left';
      this.currentCard--;
    }
  }

  next() {
    if (this.currentCard < this.totalCards - 1) {
      this.slideDirection = 'right';
      this.currentCard++;
    }
  }
}
