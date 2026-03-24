
export enum ViewState {
  LANDING = 'LANDING',
  LIVING_PLANE = 'LIVING_PLANE',
  GOVERNANCE_CONSOLE = 'GOVERNANCE_CONSOLE',
  AUDIT_LOGS = 'AUDIT_LOGS',
  POLICY_CENTER = 'POLICY_CENTER',
  INTEGRATIONS = 'INTEGRATIONS',
  ABOUT_RESEARCH = 'ABOUT_RESEARCH'
}

export type Decision = 'ALLOW' | 'BLOCK' | 'ESCALATE';
export type IntentMatch = 'High' | 'Medium' | 'Low';

export interface GovernanceSignal {
  id: string;
  intent: string;
  decision: Decision;
  risk_score: number;
  analysis: {
    intent_match: IntentMatch;
    detected_anomaly: string;
    reasoning: string;
  };
  ui_vfx_trigger: string;
  recommended_action: string;
  timestamp: number;
}

// Added missing optional fields 'time', 'frequency', and 'historical_baseline' used in Ingestor.tsx
export interface ActionInput {
  action_type: string;
  action_description: string;
  context: {
    source_system: string;
    user_role: string;
    data_sensitivity: 'low' | 'medium' | 'high';
    data_owner: string;
    target_system_impact: 'low' | 'medium' | 'high';
    compliance_flags: string;
    business_unit: string;
    geographic_region: string;
    environment: 'production' | 'staging' | 'development';
    time?: string;
    frequency?: string;
  };
  historical_baseline?: {
    is_normal_behavior: boolean;
    previous_similar_actions: string;
  };
}

// Added TraceStep and GovernanceReport for audit and dashboard views
export interface TraceStep {
  label: string;
  description: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface GovernanceReport {
  id: string;
  decision: Decision;
  confidence_band: 'Stable' | 'Caution' | 'Critical';
  confidence_score: number;
  trace: TraceStep[];
  reason: string;
  reason_technical: string;
  recommended_next_step: string;
  operator_notes?: string;
  input_summary: string;
  timestamp: number;
}

// Added ScanInput for verification terminal
export interface ScanInput {
  text?: string;
  media?: {
    data: string;
    mimeType: string;
    type: 'image' | 'audio' | 'video';
  };
}

// Added AnalysisResult for detailed risk visualization
export interface AnalysisResult {
  riskScore: number;
  explanation: string;
  threatType: string;
  recommendation: string;
  safetySteps?: string[];
}
