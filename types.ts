
export enum RiskSeverity {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum EvidenceStatus {
  PENDING = 'Pending',
  UNDER_REVIEW = 'Under Review',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export enum FindingStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  CLOSED = 'Closed'
}

export interface Risk {
  id: string;
  title: string;
  severity: RiskSeverity;
  mappedControls: string[]; // Control IDs
}

export interface Control {
  id: string;
  code: string;
  title: string;
  description: string;
  framework: 'SOC1' | 'SOC2' | 'ISO27001';
  category: string;
}

export interface Evidence {
  id: string;
  controlId: string;
  fileName: string;
  uploadDate: string;
  uploader: string;
  status: EvidenceStatus;
  comment?: string;
}

export interface Finding {
  id: string;
  title: string;
  description: string;
  severity: RiskSeverity;
  status: FindingStatus;
  owner: string;
  targetDate: string;
}

export interface QuestionnaireItem {
  id: string;
  question: string;
  category: string;
  standardResponse: string;
}

export type AppView = 'DASHBOARD' | 'RISKS' | 'EVIDENCE' | 'FINDINGS' | 'QUESTIONNAIRE';
