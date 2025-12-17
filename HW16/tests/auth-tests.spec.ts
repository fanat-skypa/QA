import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';
import 'dotenv/config';



// Load application URL from environment variables
const appUrl = process.env.APP_URL;
if (!appUrl) throw new Error("APP_URL is not defined in .env");
const randomUsername = faker.internet.username();
const randomPassword = faker.internet.password();

test.beforeEach(async ({ page }) => {

    await page.goto(appUrl);
    await page.waitForLoadState("load");
    // Generate random credentials

});

test('Login button is disabled if one field is empty', async ({ page }) => {
    const loginField = page.getByTestId("username-input");
    const signInButton = page.getByTestId("signIn-button");

    await expect(signInButton).toBeEnabled();
    await loginField.fill(randomUsername);
    await expect(signInButton).toBeDisabled();
});

test('Auth error modal is visible if credentials are wrong', async ({ page }) => {
    const loginField = page.getByTestId("username-input");
    const passwordField = page.getByTestId("password-input");
    const signInButton = page.getByTestId("signIn-button");
    const authErrorPopup = page.getByTestId("authorizationError-popup");

    await loginField.fill(randomUsername);
    await passwordField.fill(randomPassword);
    await signInButton.click();

    await expect(authErrorPopup).toBeVisible();
});