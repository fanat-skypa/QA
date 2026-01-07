import {expect, Locator, Page} from "@playwright/test";

export default class BaseAtom {
    protected readonly page: Page;
    protected readonly _container: Locator;

    protected constructor(page: Page, container: Locator) {
        this.page = page;
        this._container = container;
    }

    async checkVisible(visible = true): Promise<void> {
        await expect(this._container).toBeVisible({visible});
    }

    async checkEnabled(enabled = true): Promise<void> {
        await expect(this._container).toBeEnabled({enabled});
    }

    async click(): Promise<void> {
        await this._container.click();
    }

    async forceClick(): Promise<void> {
    await this._container.click({ force: true });
}

    async scroll() {
        await this._container.scrollIntoViewIfNeeded();
    }

    async isVisible(visible = true): Promise<void> {
        if (visible) {
            await expect(this._container).toBeInViewport();
        } else {
            await expect(this._container).not.toBeInViewport();
        }
    } 
}