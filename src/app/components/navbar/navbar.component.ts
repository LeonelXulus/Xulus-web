import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;
  scrolled = false;
  isMobile = false; // Valor por defecto para SSR

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      this.scrolled = scrollY > 50;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
      // Si cambia a escritorio y el menú estaba abierto, lo cerramos y quitamos el bloqueo del scroll
      if (!this.isMobile && this.isMenuOpen) {
        this.closeMenu();
      }
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

  // Actualiza la clase en el body para bloquear/desbloquear el scroll
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
    // Cierra el menú antes de desplazar
    this.closeMenu();

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Limpiamos la clase al destruir el componente para evitar efectos persistentes
  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('menu-open');
    }
  }
}