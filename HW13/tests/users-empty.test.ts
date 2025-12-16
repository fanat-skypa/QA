import { test, expect } from '@playwright/test';
import { StatusCodes } from 'http-status-codes';

const baseURLWithEndpoint: string = 'http://localhost:3000/users';

test('should return empty array when no users', async ({ request }) => {
    const response = await request.get(`${baseURLWithEndpoint}`);
    expect(response.status()).toBe(StatusCodes.OK);

    const responseBody = await response.json();   
    expect(Array.isArray(responseBody)).toBe(true); 
    expect(responseBody).toEqual([]);              
});