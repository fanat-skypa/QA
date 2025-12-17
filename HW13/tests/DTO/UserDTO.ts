import { expect } from "@playwright/test";
import type { APIRequestContext } from "@playwright/test";

let baseURLWithEndpoint: string = 'http://localhost:3000/users';

export class UserDTO {
    id: number;
    name: string;
    email: string;
    phone: string;

    constructor(id: number, name: string, email: string, phone: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    static checkServerResponse(user: UserDTO): void {
        expect.soft(user.id).toBeGreaterThan(0);
        expect.soft(user.name.length).toBeGreaterThan(0);
        expect.soft(user.email.length).toBeGreaterThan(0);
        expect.soft(user.phone.length).toBeGreaterThan(0);
    }

    static async createUsers(count_of_users: number, request: APIRequestContext): Promise<void> {
        for (let i=0; i<count_of_users; i++) {
            await request.post(`${baseURLWithEndpoint}`);
        }
    }
} 