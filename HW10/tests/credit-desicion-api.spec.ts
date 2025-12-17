import { test, expect } from '@playwright/test';
import { StatusCodes } from 'http-status-codes';
import { CreditRiskRequestDTO } from './dto/CreditRiskRequestDTO';
import { CreditRiskAnswerDTO } from './dto/CreditRiskAnswerDTO';

// УРЛ по которому идут зпросы к API кредитного скоринга
const BASE_URL = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'; 

// Примеры запросов и ожидаемых ответов в массиве 
const examples: { request: CreditRiskRequestDTO, expected: CreditRiskAnswerDTO }[] = [
  {
    request: { income: 100, debt: 0, age: 17, employed: true, loanAmount: 1000, loanPeriod: 12 },
    expected: { riskScore: 17.2, riskLevel: 'Very High Risk', riskPeriods: [], applicationId: '', riskDecision: 'negative' }
  },
  {
    request: { income: 20000, debt: 0, age: 30, employed: true, loanAmount: 500, loanPeriod: 6 },
    expected: { riskScore: 1.01875, riskLevel: 'Medium Risk', riskPeriods: [6,9,12], applicationId: '', riskDecision: 'positive' }
  },
  {
    request: { income: 20000, debt: 0, age: 30, employed: true, loanAmount: 500, loanPeriod: 12 },
    expected: { riskScore: 2.0375, riskLevel: 'Low Risk', riskPeriods: [12,18,24,30,36], applicationId: '', riskDecision: 'positive' }
  }
];

// Прогоняем каждую строчку массива как отдельный тест. Example - пример, i - индекс теста (для названия)
examples.forEach((example, i) => {
  test(`Loan Calc Test ${i + 1}`, async ({ request }) => {
    const response = await request.post(BASE_URL, { data: example.request });
    const responseData: CreditRiskAnswerDTO = await response.json();

    expect.soft(response.status()).toBe(StatusCodes.OK); // Проверяем что статус ответа 200
    expect.soft(responseData.riskLevel).toBe(example.expected.riskLevel);  // Проверяем что уровень риска совпадает с ожидаемым
    expect.soft(responseData.riskPeriods).toEqual(example.expected.riskPeriods); // Проверяем что массив допустимых периодов совпадает с ожидаемым
    expect.soft(responseData.riskDecision).toBe(example.expected.riskDecision); // Проверяем что решение совпадает с ожидаемым
  });
});