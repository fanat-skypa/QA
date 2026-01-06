import {expect, Locator, Page} from "@playwright/test";
import TodoItem from "../organisms/TodoItem";
import {SERVICE_URL} from "../../env/env-data";

export class Home {
    readonly page: Page;
    readonly header: Locator;
    readonly main: Locator;
    readonly footer: Locator;
    readonly toDoList: Locator;
    readonly newTodoInput: Locator;
    readonly clearCompletedButton: Locator;
    readonly filterCompletedButton: Locator;
    readonly filterActiveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.getByTestId("header");
        this.main = page.getByTestId("main");
        this.footer = page.getByTestId("footer");
        this.toDoList = this.main.getByTestId("todo-list");
        this.newTodoInput = this.header.getByTestId("text-input");
        this.clearCompletedButton = this.footer.locator(".clear-completed");
        this.filterCompletedButton = this.footer.getByRole('link', { name: 'Completed' });
        this.filterActiveButton = this.footer.locator('a[href="#/active"]');

    }

    private get todoItems(): Locator {
        return this.toDoList.getByTestId("todo-item");
    }

    async goto(): Promise<void> {
        await this.page.goto(SERVICE_URL)
    }

    async createItem(text: string): Promise<TodoItem> {
        await this.newTodoInput.fill(text);
        await this.newTodoInput.press("Enter");
        const allItemsCount = await this.todoItems.count();
        const lastItem = this.todoItems.nth(allItemsCount !== 0 ? allItemsCount-1 : 0);

        return new TodoItem(lastItem);
    }

    async checkCountOfItems(expectedCount: number): Promise<void> {
        const itemsCount = await this.todoItems.count();
        expect(itemsCount).toBe(expectedCount);
    }

    async clickClearCompletedButton(): Promise<void> {
        await this.clearCompletedButton.click();
    }

    async clickFilterActiveButton(): Promise<void> {
        await this.filterActiveButton.click();
    }

    async clickFilterCompletedButton(): Promise<void> {
        await this.filterCompletedButton.click();
    }

    async createItems(num: number) {
        const items = [];

        for (let i = 1; i <= num; i++) { // <=1 символ не принимает, а я чпокался с этим пол часа, поэтому с 10 отсчет
            items.push(await this.createItem(String(i) + " TEST"));

        }
        return items;
    }
}