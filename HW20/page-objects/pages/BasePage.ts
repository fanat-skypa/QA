import {Page} from "@playwright/test";
import {SERVICE_URL_HW20} from "../../env/env-data";

export default class BasePage {
    readonly page: Page;
    readonly _url: string;

    protected constructor(page: Page, path: string) {
        this.page = page;
        this._url = `${SERVICE_URL_HW20}${path}`;
    }

    async goto(): Promise<void> {
        await this.page.goto(this._url);
    }
}