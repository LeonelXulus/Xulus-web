import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  scrolled = false;
  isMobile = false;

  private boundScroll = this.handleScroll.bind(this);
  private boundResize = this.handleResize.bind(this);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 900;
      this.scrolled = this.getScrollY() > 50;

      window.addEventListener('scroll', this.boundScroll, true);
      window.addEventListener('resize', this.boundResize);
    }
  }

  private getScrollY(): number {
    return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  private handleScroll() {
    const wasScrolled = this.scrolled;
    this.scrolled = this.getScrollY() > 50;
    if (wasScrolled !== this.scrolled) {
      this.cdr.detectChanges();
    }
  }

  private handleResize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 900;
    if (wasMobile !== this.isMobile) {
      if (!this.isMobile && this.isMenuOpen) {
        this.closeMenu();
      }
      this.cdr.detectChanges();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.updateBodyScroll();
  }

  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.updateBodyScroll();
    }
  }

  private updateBodyScroll() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isMenuOpen) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    }
  }

  scrollTo(sectionId: string) {
    this.closeMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('menu-open');
      window.removeEventListener('scroll', this.boundScroll, true);
      window.removeEventListener('resize', this.boundResize);
    }
  }
}
