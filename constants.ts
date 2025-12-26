
import { Risk, Control, Evidence, Finding, QuestionnaireItem, RiskSeverity, EvidenceStatus, FindingStatus } from './types';

export const MOCK_CONTROLS: Control[] = [
  { id: 'c1', code: 'CC1.1', title: 'Code of Conduct', description: 'The entity demonstrates a commitment to integrity and ethical values.', framework: 'SOC2', category: 'Common Criteria' },
  { id: 'c2', code: 'CC6.1', title: 'Access Request', description: 'Access to information assets is restricted to authorized personnel.', framework: 'SOC2', category: 'Logical Access' },
  { id: 'c3', code: 'CC7.1', title: 'Vulnerability Management', description: 'The entity identifies and manages vulnerabilities in assets.', framework: 'SOC2', category: 'System Operations' },
  { id: 'c4', code: 'A1.1', title: 'System Availability Monitoring', description: 'Controls ensure the system is available for operation.', framework: 'SOC1', category: 'Availability' },
];

export const MOCK_RISKS: Risk[] = [
  { id: 'r1', title: 'Unauthorized access to production databases', severity: RiskSeverity.HIGH, mappedControls: ['c2'] },
  { id: 'r2', title: 'Lack of ethical framework', severity: RiskSeverity.MEDIUM, mappedControls: ['c1'] },
  { id: 'r3', title: 'Unpatched critical vulnerabilities', severity: RiskSeverity.HIGH, mappedControls: ['c3'] },
];

export const MOCK_EVIDENCE: Evidence[] = [
  { id: 'e1', controlId: 'c2', fileName: 'access_logs_oct.csv', uploadDate: '2023-10-15', uploader: 'John Doe', status: EvidenceStatus.APPROVED },
  { id: 'e2', controlId: 'c3', fileName: 'vulnerability_report_q3.pdf', uploadDate: '2023-11-01', uploader: 'Jane Smith', status: EvidenceStatus.UNDER_REVIEW },
  { id: 'e3', controlId: 'c1', fileName: 'employee_handbook_v2.pdf', uploadDate: '2023-09-20', uploader: 'Admin', status: EvidenceStatus.PENDING },
];

export const MOCK_FINDINGS: Finding[] = [
  { id: 'f1', title: 'Termination access not revoked within 24h', description: 'Test samples showed 2/25 users had access for 48h after termination.', severity: RiskSeverity.HIGH, status: FindingStatus.IN_PROGRESS, owner: 'IT Ops Team', targetDate: '2024-03-01' },
  { id: 'f2', title: 'Missing quarterly access review', description: 'Q3 access review evidence was not found for the Cloud Platform.', severity: RiskSeverity.MEDIUM, status: FindingStatus.OPEN, owner: 'Security Lead', targetDate: '2024-02-15' },
];

export const MOCK_QUESTIONNAIRE: QuestionnaireItem[] = [
  { id: 'q1', category: 'Data Privacy', question: 'How is customer data encrypted at rest?', standardResponse: 'Customer data is encrypted at rest using AES-256 with keys managed in AWS KMS.' },
  { id: 'q2', category: 'Access Control', question: 'Do you enforce Multi-Factor Authentication (MFA)?', standardResponse: 'Yes, MFA is mandatory for all internal systems and VPN access via Okta.' },
  { id: 'q3', category: 'Compliance', question: 'What security certifications do you currently hold?', standardResponse: 'We are SOC 2 Type II compliant and ISO 27001:2013 certified.' },
];
