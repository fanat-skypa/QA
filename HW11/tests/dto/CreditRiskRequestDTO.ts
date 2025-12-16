export class CreditRiskRequestDTO {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  private constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static createRandomExample() : CreditRiskRequestDTO {
    return new CreditRiskRequestDTO(
      Math.floor(Math.random() * 100000), // income
      Math.floor(Math.random() * 50000),  // debt
      Math.floor(Math.random() * 300), // age - Agartha 
      Math.random() < 0.5,                 // employed
      Math.floor(Math.random() * 50000),  // loanValue
      Math.floor(Math.random() * 60)   // loanPeriod
    )
  }
  static createExample(income: number, debt: number, age: number, employed: boolean, loanAmount: number, loanPeriod: number) : CreditRiskRequestDTO {
    return new CreditRiskRequestDTO(income, debt, age, employed, loanAmount, loanPeriod);
  };
};