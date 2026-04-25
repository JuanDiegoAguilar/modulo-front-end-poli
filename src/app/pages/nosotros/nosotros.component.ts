import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { StatComponent } from '../../shared/stat/stat.component';
import { FeatureCardComponent } from '../../shared/feature-card/feature-card.component';

interface ValueCard {
  emoji: string;
  title: string;
  description: string;
}

interface MissionVisionCard {
  emoji: string;
  title: string;
  description: string;
  bgClass: string;
}

const STATS = [
  { value: '10+', label: 'Años de experiencia' },
  { value: '3.2k', label: 'Clientes' },
  { value: '120+', label: 'Servicios' },
  { value: '99.9%', label: 'Uptime' },
];

const MISSION_VISION: MissionVisionCard[] = [
  {
    emoji: '🎯',
    title: 'Misión',
    bgClass: 'bg-blue-50',
    description:
      'Democratizar el acceso a tecnología de alto impacto para empresas de todos los tamaños. Ofrecemos soluciones digitales escalables, seguras y eficientes que generan valor real y medible en cada proyecto que emprendemos.',
  },
  {
    emoji: '🔭',
    title: 'Visión',
    bgClass: 'bg-violet-50',
    description:
      'Ser el aliado tecnológico de referencia en Latinoamérica para 2030, reconocidos por transformar industrias con inteligencia artificial, cloud computing y desarrollo de software de clase mundial.',
  },
];

const VALUES: ValueCard[] = [
  {
    emoji: '⚡',
    title: 'Innovación continua',
    description:
      'Adoptamos tecnologías emergentes y metodologías ágiles para entregar soluciones que anticipan las necesidades del mercado.',
  },
  {
    emoji: '🤝',
    title: 'Compromiso real',
    description:
      'Nos involucramos como si el proyecto fuera nuestro. El éxito de nuestros clientes es nuestra mejor métrica de desempeño.',
  },
  {
    emoji: '🔍',
    title: 'Transparencia',
    description:
      'Comunicación clara en cada etapa: costos, plazos y alcance sin sorpresas. Confianza construida con hechos, no promesas.',
  },
  {
    emoji: '🛡️',
    title: 'Seguridad primero',
    description:
      'Cada línea de código y cada arquitectura es diseñada con seguridad como prioridad, no como un añadido posterior.',
  },
  {
    emoji: '📈',
    title: 'Escalabilidad',
    description:
      'Construimos para hoy pero pensando en el mañana. Las soluciones crecen con tu negocio sin necesidad de reescrituras costosas.',
  },
  {
    emoji: '🏆',
    title: 'Excelencia técnica',
    description:
      'Estándares de código, revisiones rigurosas y buenas prácticas en cada entrega. La calidad no es negociable.',
  },
];

const TRUST_FEATURES = [
  {
    emoji: '🌎',
    title: 'Presencia regional',
    description:
      'Clientes en Colombia, México, Chile y España con equipos de trabajo remotos e híbridos.',
  },
  {
    emoji: '🎓',
    title: 'Equipo certificado',
    description:
      'AWS, Google Cloud, Azure, CISSP, PMP y más de 80 certificaciones activas en el equipo.',
  },
  {
    emoji: '💬',
    title: 'Soporte en español',
    description:
      'Comunicación clara y directa en tu idioma, sin intermediarios ni barreras técnicas.',
  },
];

@Component({
  selector: 'app-nosotros',
  imports: [ButtonComponent, StatComponent, FeatureCardComponent],
  templateUrl: './nosotros.component.html',
})
export class NosotrosComponent {
  readonly stats = STATS;
  readonly missionVision = MISSION_VISION;
  readonly values = VALUES;
  readonly trustFeatures = TRUST_FEATURES;
}
