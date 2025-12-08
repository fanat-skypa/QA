export class User {
    private name: string;
    private surname: string;
    private consentGiven: boolean;
    private readonly phoneNumber: number;
    private age: number;

    constructor(name: string, surname: string, age: number) {
        this.name = name;
        this.surname = surname;
        this.consentGiven = false;
        this.phoneNumber = 1234;
        if (age > 0) {
         this.age = age;
        } else {
        this.age = 0;
        }
    }

    giveConsent(): boolean {
        if (this.age >= 18) {
            this.consentGiven = true;
            return true;
        }
        else {
            return false;
        }
    }

    setConsentGiven(state: boolean): void {
        this.consentGiven = state;
    }

    getConsentGiven(): boolean {
        return this.consentGiven;
    }

    getName(): string {
        return this.name;
    }

    getPhoneNumber(): number {
        return this.phoneNumber;
    }

    revokeConsent(): void {
        this.consentGiven = false;
    }
}