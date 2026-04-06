export interface CaseStudy {
  tag: string;
  title: string;
  description: string;
  techStack: string;
  stats: string;
  challenge: string;
  overview: {
    client: string;
    duration: string;
    stack: string;
    teamSize: string;
  };
  highlights: string[];
  architecture: {
    leftLabel: string;
    leftItems: { name: string; icon: string }[];
    centerLabel: string;
    centerIcon: string;
    centerSubLabel: string;
    rightItems: { name: string; icon: string }[];
  };
}
