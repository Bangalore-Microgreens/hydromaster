export interface MonitoringSystem {
  type: 'sensors' | 'manual/actuator' | 'manual';
  status: 'active' | 'inactive';
  lastChecked: Date;
  frequency: 'realtime' | 'daily' | 'weekly';
}

export interface VerificationProcess {
  annualAudit: {
    lastDate: Date;
    nextDate: Date;
    status: 'completed' | 'pending' | 'overdue';
  };
  calibrationChecklist: {
    equipment: string;
    lastCalibration: Date;
    nextCalibration: Date;
    bounty: boolean;
  }[];
  dataIntegrity: {
    lastCheck: Date;
    status: 'passed' | 'failed';
    issues: string[];
  };
  methodologyCompliance: {
    status: 'compliant' | 'non-compliant';
    carbonCredits: boolean;
    minted: boolean;
  };
}

export interface TokenCredit {
  baselineCredits: number;
  qualityMultiplier: number;
  finalCreditValue: number;
} 