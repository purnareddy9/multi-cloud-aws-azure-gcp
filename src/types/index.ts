export type CloudProvider = 'aws' | 'azure' | 'gcp' | 'multicloud' | 'general';

export interface LessonEquivalents {
  aws: string;
  azure: string;
  gcp: string;
  notes: string;
}

export interface CommonMistake {
  mistake: string;
  consequence: string;
  fix: string;
}

export interface HandsOnPractice {
  type: 'simulation' | 'real_lab';
  title: string;
  scenario: string;
  terraformCode?: string;
  cliCommand?: string;
  pythonSim?: string;
  expectedOutcome: string;
  steps: string[];
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface ScenarioChallenge {
  title: string;
  problem: string;
  constraints: string[];
  options: QuizOption[];
}

export interface InterviewQnA {
  question: string;
  whyAsked: string;
  answer: string;
  architecturalDefense: string;
  keyPoints: string[];
}

export interface LessonModule {
  id: string;
  slug: string;
  level: number;
  track: CloudProvider;
  category: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  iconName: string;
  
  // 16-point educational schema
  whatIsIt: string;
  whyExists: string;
  simpleExplanation: string;
  visualDiagramType?: string;
  diagramData?: {
    nodes: Array<{ id: string; label: string; type: string; details?: string }>;
    flow: Array<{ from: string; to: string; label: string }>;
  };
  realWorldExample: string;
  architectureExample: {
    title: string;
    description: string;
    flow: string[];
  };
  whenToUse: string[];
  whenNotToUse: string[];
  advantages: string[];
  disadvantages: string[];
  cloudEquivalents: LessonEquivalents;
  commonMistakes: CommonMistake[];
  handsOn: HandsOnPractice;
  scenarioChallenge: ScenarioChallenge;
  interviewQuestions: InterviewQnA[];
  keyTakeaways: string[];
}

export interface ServiceComparison {
  id: string;
  category: string;
  description: string;
  aws: {
    name: string;
    badge: string;
    bestFor: string;
    pricingModel: string;
    keyFeatures: string[];
  };
  azure: {
    name: string;
    badge: string;
    bestFor: string;
    pricingModel: string;
    keyFeatures: string[];
  };
  gcp: {
    name: string;
    badge: string;
    bestFor: string;
    pricingModel: string;
    keyFeatures: string[];
  };
  decisionMatrix: Array<{
    scenario: string;
    winner: 'aws' | 'azure' | 'gcp' | 'tie';
    reason: string;
  }>;
  architecturalTradeoffs: string;
}

export interface DecisionEngineQuestion {
  id: string;
  question: string;
  description: string;
  options: {
    id: string;
    label: string;
    description: string;
    scores: {
      aws: number;
      azure: number;
      gcp: number;
    };
    rationale: string;
  }[];
}

export interface ArchitectureNodeData {
  label: string;
  provider: CloudProvider;
  serviceType: string;
  category: 'compute' | 'storage' | 'database' | 'network' | 'security' | 'gateway' | 'dns' | 'cache';
  tier?: 'frontend' | 'app' | 'data' | 'edge';
  isMultiAz?: boolean;
  isEncrypted?: boolean;
  isPrivate?: boolean;
  hasBackup?: boolean;
  hasReplication?: boolean;
  iconName?: string;
  notes?: string;
  [key: string]: unknown;
}

export interface ArchitectureScorecard {
  overallScore: number;
  availability: { score: number; feedback: string };
  security: { score: number; feedback: string };
  scalability: { score: number; feedback: string };
  networking: { score: number; feedback: string };
  disasterRecovery: { score: number; feedback: string };
  costOptimization: { score: number; feedback: string };
  criticalIssues: string[];
  warnings: string[];
  strengths: string[];
  recommendations: string[];
}

export interface UserProgress {
  completedLessons: string[];
  quizScores: Record<string, number>;
  savedArchitectures: Array<{
    id: string;
    name: string;
    createdAt: string;
    nodes: unknown[];
    edges: unknown[];
    score?: number;
  }>;
  interviewAttempts: Array<{
    scenarioId: string;
    score: number;
    completedAt: string;
  }>;
  lastActive: string;
}
