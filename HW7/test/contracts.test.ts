import { DepositContract, LoanContract, InsuranceContract } from "../src/contracts";

describe("DepositContract", () => {
    test("calculateInterest returns correct interest", () => {
        const dep = new DepositContract("1", "Vitali", 1000, 5);
        expect(dep.calculateInterest()).toBe(5000);
    });

    test("fields are stored correctly", () => {
        const dep = new DepositContract("2", "Vitali", 2000, 3);
        expect(dep.contractId).toBe("2");
        expect(dep.clientName).toBe("Vitali");
        expect(dep.isActive).toBeTruthy();
    });
});

describe("LoanContract", () => {
    test("calculateTotalPayment returns correct total", () => {
        const loan = new LoanContract("1", "Vitali", 12000, 500, 24);
        expect(loan.calculateTotalPayment()).toBe(12000);
    });

    test("fields are stored correctly", () => {
        const loan = new LoanContract("2", "Vitali", 6000, 300, 20);
        expect(loan.contractId).toBe("2");
        expect(loan.clientName).toBe("Vitali");
        expect(loan.isActive).toBeTruthy();
    });
});

describe("InsuranceContract", () => {
    test("calculateTotalPremium returns correct total", () => {
        const ins = new InsuranceContract("1", "Vitali", "dom", 100, 5);
        expect(ins.calculateTotalPremium()).toBe(500);
    });

    test("fields are stored correctly", () => {
        const ins = new InsuranceContract("2", "Vitali", "dom", 200, 3);
        expect(ins.contractId).toBe("2");
        expect(ins.clientName).toBe("Vitali");
        expect(ins.isActive).toBeTruthy();
    });
});
