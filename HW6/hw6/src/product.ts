export class Product {
    readonly title: string
    private price: number

    constructor(title: string) {
        this.title = title
        this.price = 0
    }

    setPrice(price: number): void {
        this.price = price
    }

    getPrice(): number {
        return this.price
    }
}
