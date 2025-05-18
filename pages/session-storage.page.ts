import { Page, expect } from '@playwright/test';

export class SessionStoragePage {
    readonly page: Page;
    readonly orderFormKey = 'Checkout_IO-OrderForm';

    constructor(page: Page) {
        this.page = page;
    }

    private async getOrderFormFromSessionStorage(): Promise<any | null> {
        const orderFormString = await this.page.evaluate((key) => {
            return sessionStorage.getItem(key);
        }, this.orderFormKey);

        if (orderFormString) {
            try {
                return JSON.parse(orderFormString);
            } catch (error) {
                console.error(`Error parsing sessionStorage item "${this.orderFormKey}":`, error);
                return null;
            }
        }
        return null;
    }

    async expectOrderFormItemsToBeEmpty() {
        const orderFormString = await this.page.evaluate(() => {
            return sessionStorage.getItem('Checkout_IO-OrderForm');
        });

        expect(orderFormString).not.toBeNull();

        if (orderFormString) {
            const orderForm = JSON.parse(orderFormString);

            expect(orderForm.items).toEqual([]);

            console.log('Validation successful: The items array in sessionStorage is empty.');
        } else {
            
            console.error('Error: "Checkout_IO-OrderForm" not found in sessionStorage.');

            expect(true).toBe(false); 
        }
    }

    async expectOrderFormItemsToBePresent() {
        const orderForm = await this.getOrderFormFromSessionStorage();

        expect(orderForm).not.toBeNull();
        expect(orderForm).toBeInstanceOf(Object);

        expect(orderForm.items).toBeInstanceOf(Array);
        expect(orderForm.items.length).toBeGreaterThan(0);

        console.log('Validation successful: The items array in sessionStorage is NOT empty.');
    }
}
