import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CaseDetailDialogComponent } from '../case-detail-dialog/case-detail-dialog.component';
import { AiReceptionistDialogComponent } from '../ai-receptionist-dialog/ai-receptionist-dialog.component';
import { TradingEngineDialogComponent } from '../trading-engine-dialog/trading-engine-dialog.component';
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
    },
    {
      tag: 'AI Automation',
      title: 'AI Receptionist System',
      description: 'We built an AI-powered system capable of handling calls, SMS, and appointment scheduling across multiple service-based businesses.',
      techStack: 'Twilio · NPL · Node.js · Redis',
      stats: '70% automated · 24/7 support',
      challenge: 'The client needed an automated system capable of handling customer inquiries, booking appointments, and routing calls 24/7 without human intervention.',
      overview: {
        client: 'Service Automation Startup',
        duration: '6 Weeks',
        stack: 'Node.js\nTwilio\nNPL\nRedis',
        teamSize: '1 Backend Architect\n2 Developers'
      },
      highlights: [
        '70% automated interactions',
        'Reduced manual workload',
        'Multi-business ready'
      ],
      architecture: {
        leftLabel: 'Channels',
        leftItems: [
          { name: 'Twilio', icon: 'case-studies/nube-celeste.svg' },
          { name: 'Calls', icon: 'case-studies/nube-violeta.svg' },
          { name: 'SMS', icon: 'case-studies/nube-violeta-oscura.svg' }
        ],
        centerLabel: 'AI Receptionist',
        centerIcon: 'case-studies/AI-Receptionist.svg',
        centerSubLabel: 'Node.js API\nBooking Engine',
        rightItems: [
          { name: 'Calendar\nService', icon: 'case-studies/Calendar-Service.svg' },
          { name: 'CRM\nIntegration', icon: 'case-studies/CRM-Integration.svg' },
          { name: 'Redis\nCache', icon: 'case-studies/Redis-Cache.svg' }
        ]
      }
    },
    {
      tag: 'SaaS Backend',
      title: 'Real-Time Trading Engine',
      description: 'We designed a high-performance backend system capable of processing real-time transactions with latency and strong consistency.',
      techStack: 'Go · Kafka · PostgreSQL · Redis',
      stats: '10k TPS · Sub-second latency',
      challenge: 'The client needed a high-performance trading engine capable of handling massive concurrent transactions with minimal latency and zero data loss.',
      overview: {
        client: 'Crypto Trading Platform',
        duration: '8 Weeks',
        stack: 'Go\nKafka\nPostgreSQL\nRedis',
        teamSize: '1 Backend Architect\n3 Developers'
      },
      highlights: [
        'High transaction throughput',
        'Low-latency processing',
        'Strong data consistency',
        'Resilient event-driven architecture'
      ],
      architecture: {
        leftLabel: 'Sources',
        leftItems: [
          { name: 'Users', icon: 'case-studies/nube-celeste.svg' },
          { name: 'Bots', icon: 'case-studies/nube-violeta.svg' }
        ],
        centerLabel: 'Matching Engine',
        centerIcon: 'case-studies/Matching-Engine.svg',
        centerSubLabel: 'Core System',
        rightItems: [
          { name: 'Kafka\nStream', icon: 'case-studies/Kafka-Stream.svg' },
          { name: 'PostgreSQL', icon: 'case-studies/PostgreSQL.svg' },
          { name: 'Redis', icon: 'case-studies/Redis.svg' }
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

    const dialogComponents = [
      CaseDetailDialogComponent,
      AiReceptionistDialogComponent,
      TradingEngineDialogComponent
    ];

    const component = dialogComponents[index] || CaseDetailDialogComponent;

    this.dialog.open(component, {
      data: this.caseStudies[index],
      panelClass: 'case-study-dialog-panel',
      maxWidth: '1050px',
      width: '95vw',
      autoFocus: false,
      disableClose: false
    });
  }
}
