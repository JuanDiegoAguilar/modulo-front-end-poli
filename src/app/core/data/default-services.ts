import { Service } from '../models/service.model';

export const CATEGORIES = [
  'Desarrollo',
  'Seguridad',
  'Cloud',
  'Soporte',
  'Consultoría',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_COLORS: Record<string, string> = {
  Desarrollo: 'bg-blue-50',
  Seguridad: 'bg-amber-50',
  Cloud: 'bg-emerald-50',
  Soporte: 'bg-emerald-50',
  Consultoría: 'bg-violet-50',
};

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 'desarrollo-web',
    emoji: '💻',
    title: 'Desarrollo Web Full Stack',
    description:
      'Aplicaciones web modernas con React, Angular y Node.js. Escalables y de alto rendimiento.',
    category: 'Desarrollo',
    color: 'bg-blue-50',
    estimatedTime: '4-8 semanas',
    modality: 'Remoto / Híbrido',
    technologies: 'React, Node.js, PostgreSQL, Docker',
    includes: [
      'Diseño de arquitectura',
      'Desarrollo frontend y backend',
      'Integración de base de datos',
      'Pruebas y QA',
      'Despliegue en producción',
    ],
  },
  {
    id: 'ciberseguridad',
    emoji: '🛡️',
    title: 'Ciberseguridad Empresarial',
    description:
      'Protege tu infraestructura con auditorías, monitoreo 24/7 y protocolos de respuesta.',
    category: 'Seguridad',
    color: 'bg-amber-50',
    estimatedTime: '2-4 semanas',
    modality: 'Remoto / Híbrido',
    technologies: 'SIEM, Firewalls, IDS/IPS, Pentest Tools',
    includes: [
      'Auditoría de vulnerabilidades',
      'Monitoreo continuo 24/7',
      'Plan de respuesta a incidentes',
      'Informe ejecutivo de riesgos',
    ],
  },
  {
    id: 'soluciones-cloud',
    emoji: '☁️',
    title: 'Soluciones en la Nube',
    description:
      'Migración, gestión y optimización de infraestructura cloud en AWS, Azure y GCP.',
    category: 'Cloud',
    color: 'bg-emerald-50',
    estimatedTime: '3-6 semanas',
    modality: 'Remoto',
    technologies: 'AWS, Azure, GCP, Terraform, Kubernetes',
    includes: [
      'Diagnóstico de infraestructura actual',
      'Plan de migración',
      'Configuración y despliegue cloud',
      'Optimización de costos',
      'Documentación técnica',
    ],
  },
  {
    id: 'apps-moviles',
    emoji: '📱',
    title: 'Desarrollo de Apps Móviles',
    description:
      'Apps nativas e híbridas para iOS y Android con experiencias de usuario excepcionales.',
    category: 'Desarrollo',
    color: 'bg-blue-50',
    estimatedTime: '6-12 semanas',
    modality: 'Remoto / Híbrido',
    technologies: 'React Native, Flutter, Swift, Kotlin',
    includes: [
      'Diseño UI/UX',
      'Desarrollo para iOS y Android',
      'Integración con APIs',
      'Pruebas en dispositivos reales',
      'Publicación en App Store y Google Play',
    ],
  },
  {
    id: 'inteligencia-artificial',
    emoji: '🤖',
    title: 'Inteligencia Artificial',
    description:
      'Implementa modelos de IA y machine learning para automatizar procesos de negocio.',
    category: 'Consultoría',
    color: 'bg-violet-50',
    estimatedTime: '8-16 semanas',
    modality: 'Remoto',
    technologies: 'Python, TensorFlow, PyTorch, OpenAI API',
    includes: [
      'Análisis de casos de uso',
      'Entrenamiento y validación de modelos',
      'Integración con sistemas existentes',
      'Monitoreo de rendimiento',
    ],
  },
  {
    id: 'soporte-tecnico',
    emoji: '🔧',
    title: 'Soporte Técnico 24/7',
    description:
      'Mesa de ayuda dedicada con tiempos de respuesta garantizados y monitoreo proactivo.',
    category: 'Soporte',
    color: 'bg-emerald-50',
    estimatedTime: 'Contrato mensual',
    modality: 'Remoto / Híbrido',
    technologies: 'Jira, Zendesk, PagerDuty',
    includes: [
      'Atención 24/7 por tickets y chat',
      'SLA garantizado',
      'Monitoreo proactivo de sistemas',
      'Reportes mensuales de incidentes',
    ],
  },
  {
    id: 'analitica-datos',
    emoji: '📊',
    title: 'Analítica de Datos',
    description:
      'Dashboards, reportes y visualización de datos para tomar decisiones informadas.',
    category: 'Consultoría',
    color: 'bg-violet-50',
    estimatedTime: '3-5 semanas',
    modality: 'Remoto',
    technologies: 'Power BI, Tableau, Python, SQL',
    includes: [
      'Auditoría de fuentes de datos',
      'Diseño de dashboards interactivos',
      'Automatización de reportes',
      'Capacitación al equipo',
    ],
  },
  {
    id: 'e-commerce',
    emoji: '🌐',
    title: 'E-Commerce',
    description:
      'Tiendas online con pasarelas de pago, inventario y experiencia de compra optimizada.',
    category: 'Desarrollo',
    color: 'bg-blue-50',
    estimatedTime: '5-10 semanas',
    modality: 'Remoto / Híbrido',
    technologies: 'Shopify, WooCommerce, Stripe, React',
    includes: [
      'Diseño de tienda personalizado',
      'Integración de pasarela de pago',
      'Gestión de inventario',
      'Optimización SEO',
      'Panel de administración',
    ],
  },
];
