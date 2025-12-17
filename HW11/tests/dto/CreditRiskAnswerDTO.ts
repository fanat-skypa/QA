export class CreditRiskAnswerDTO {

  riskScore: number
  riskLevel: string
  riskPeriods: number[]
  applicationId: string
  riskDecision: string
 
  constructor(data: any) {
    this.riskScore = data.riskScore
    this.riskLevel = data.riskLevel
    this.riskPeriods = data.riskPeriods
    this.applicationId = data.applicationId
    this.riskDecision = data.riskDecision
  }
}

