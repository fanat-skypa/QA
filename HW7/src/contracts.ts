export class BaseContract {
    contractId: string;
    clientName: string;
    isActive: boolean;

    constructor(contractId: string, clientName: string, isActive: boolean = true) {
        this.contractId = contractId;
        this.clientName = clientName;
        this.isActive = isActive;
    }
}

export class DepositContract extends BaseContract {
    amount: number;
    interestRate: number;

    constructor(contractId: string, clientName: string, amount: number, interestRate: number) {
        super(contractId, clientName);
        this.amount = amount;
        this.interestRate = interestRate;
    }

    calculateInterest(): number {
        return this.amount * this.interestRate;
    }
}

export class LoanContract extends BaseContract {
    loanAmount: number;
    monthlyPayment: number;
    loanTermMonths: number;

    constructor(contractId: string, clientName: string, loanAmount: number, monthlyPayment: number, loanTermMonths: number) {
        super(contractId, clientName);
        this.loanAmount = loanAmount;
        this.monthlyPayment = monthlyPayment;
        this.loanTermMonths = loanTermMonths;
    }

    calculateTotalPayment(): number {
        return this.monthlyPayment * this.loanTermMonths;
    }
}

export class InsuranceContract extends BaseContract {
    insuranceType: string;
    premium: number;
    termYears: number;

    constructor(contractId: string, clientName: string, insuranceType: string, premium: number, termYears: number) {
        super(contractId, clientName);
        this.insuranceType = insuranceType;
        this.premium = premium;
        this.termYears = termYears;
    }

    calculateTotalPremium(): number {
        return this.premium * this.termYears;
    }
}
