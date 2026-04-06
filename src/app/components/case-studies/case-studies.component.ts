import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CaseDetailDialogComponent } from '../case-detail-dialog/case-detail-dialog.component';
import { CaseStudy } from '../../models/case-study.model';

@Component({
  selector: 'app-case-studies',
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.scss']
})
export class CaseStudiesComponent implements OnInit, OnDestroy {
  currentCard = 0;
  totalCards = 3;
  isMobile = false;
  slideDirection: 'left' | 'right' = 'right';

  private resizeListener: (() => void) | null = null;

  // Case studies data
  caseStudies: CaseStudy[] = [
    {
      tag: 'SaaS Backend',
      title: 'Multi-tenant Analytics Platform',
      description: 'We developed a scalable SaaS backend for real-time subscription analytics, capable of handling high concurrency multi-tenant environments.',
      techStack: 'Java · Spring Boot · PostgreSQL · Redis',
      stats: '10k+ users · -40% latency',
      challenge: 'The client needed a robust backend to support high-concurrency SaaS operations while isolating data between tenants.',
      overview: {
        client: 'Subscription Analytics Startup',
        duration: '8 Weeks',
        stack: 'PostgreSQL + Redis\nAPI Gateway\nJava + Spring Boot',
        teamSize: '1 Backend Architect\n3 Developers'
      },
      highlights: [
        'Architecture for multiple tenants',
        'Scalable under high load (+10k users)',
        'Ready for third-party integrations'
      ],
      architecture: {
        leftLabel: 'Tenants',
        leftItems: [
          { name: 'Tenant', icon: 'case-studies/nube-celeste.svg' },
          { name: 'Tenant', icon: 'case-studies/nube-violeta.svg' },
          { name: 'Tenant', icon: 'case-studies/nube-violeta-oscura.svg' }
        ],
        centerLabel: 'API Gateway',
        centerIcon: 'case-studies/api-gateway.svg',
        centerSubLabel: 'JWT Auth',
        rightItems: [
          { name: 'Core', icon: 'case-studies/core.svg' },
          { name: 'Agent', icon: 'case-studies/agent.svg' },
          { name: 'Metrics', icon: 'case-studies/metrics.svg' }
        ]
      }
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
      this.resizeListener = () => {
        this.isMobile = window.innerWidth <= 768;
        this.cdr.detectChanges();
      };
      window.addEventListener('resize', this.resizeListener);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
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

  openCaseStudy(index: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.caseStudies[index]) return;

    this.dialog.open(CaseDetailDialogComponent, {
      data: this.caseStudies[index],
      panelClass: 'case-study-dialog-panel',
      maxWidth: '1050px',
      width: '95vw',
      autoFocus: false,
      disableClose: false
    });
  }
}
