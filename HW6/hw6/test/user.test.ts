import { User } from "../src/user";

describe("Basic user tests", () => {
    test("New user no consent by default", () => {
        const user1 = new User("Test", "Test", 20);
        expect(user1.getConsentGiven()).toBeFalsy();
    });

    test("User overn 18 consent true test", () => {
        const user1 = new User("Test", "Test", 20);
        user1.setConsentGiven(true);
        expect(user1.getConsentGiven()).toBeTruthy();
    });

    test("User under 18 consent flase test", () => {
        const user1 = new User("Test", "Test", 17);
        user1.setConsentGiven(true);
        expect(user1.getConsentGiven()).toBeFalsy();
    });

    test("Revoke consent works", () => {
        const user1 = new User("Test", "Test", 20);
        user1.giveConsent();
        expect(user1.getConsentGiven()).toBeTruthy();
        user1.revokeConsent();
        expect(user1.getConsentGiven()).toBeFalsy();
    });


})

describe("Phone number tests", () => {
    const phoneNumber = new User("Test", "Test", 20).getPhoneNumber();

    test("User phone contains 1", () => {
        expect(phoneNumber.toString()).toContain("1");
    });

    test("User phone length 4", () => {
        expect(phoneNumber.toString().length).toBe(4);
    });

    test("User phone is number", () => {
        expect(typeof phoneNumber).toBe("number");
    });
})