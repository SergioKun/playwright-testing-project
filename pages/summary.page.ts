import { ElementHandle, expect, Locator, Page } from '@playwright/test';
import { allowedNodeEnvironmentFlags } from 'process';

export class SummaryPage {

    private itemSummaryTitle: Locator
    private quantitySummaryValue: Locator
    private readonly totalValueLocator = 'xpath=//div[@class="exito-checkout-io-0-x-summaryTotal"]//span[@data-molecule-summary-item-value="true"]';
    private readonly itemContainerLocator = 'xpath=//div[@class="exito-checkout-io-0-x-itemCartContent"]';
    private readonly itemNameLocator = 'xpath=./div[@data-molecule-product-detail="true"]//div[@data-molecule-product-detail-name="true"]/span[@data-molecule-product-detail-name-span="true"]';
    private readonly itemQuantityValueLocator = 'xpath=./div[@data-molecule-product-detail="true"]//span[@data-molecule-quantity-und-value="true"]';
    private readonly itemPriceLocator = '//div[@data-molecule-product-detail="true"]//div[@data-molecule-product-detail-price-best-price="true"]/span';


    constructor(private page: Page) {
        this.itemSummaryTitle = this.page.locator('//div[@data-molecule-product-detail-name]/span')
        this.quantitySummaryValue = this.page.locator('//span[@data-molecule-quantity-und-value]')
        
    }

    async expectPositiveItemSummary(selected_product_name: string, selected_item_quantity_value: string) {

        await this.page.waitForTimeout(2000)

        await expect(this.itemSummaryTitle).toHaveText(selected_product_name)

        await expect(this.quantitySummaryValue).toHaveText(selected_item_quantity_value)
    }

    async expectPositiveTotalValue(total_value: number) {
        
        await this.page.waitForSelector(this.totalValueLocator);

        const totalValueString = await this.page.textContent(this.totalValueLocator);

        expect(totalValueString).not.toBeNull();
        expect(totalValueString).not.toBe('');

        if (totalValueString) {

            const totalValue = this.parsePrice(totalValueString);

            expect(totalValue).toEqual(total_value)

        } else {
            
            expect(true).toBe(false);
        }
    }

    private parsePrice(priceString: string): number {
       
        const cleanedPrice = priceString.replace(/[$\s.]/g, '');
 
        return parseInt(cleanedPrice, 10);
    }

    private parseQuantity(quantityString: string): number {

        const cleanedQuantity = quantityString.replace(/\D/g, '');

        return parseInt(cleanedQuantity, 10);
    }
    

    async calculateTotalItemsPrice(): Promise<number> {
        let totalSum = 0;

        const priceElements = await this.page.locator(this.itemPriceLocator).all();

        if (priceElements.length === 0) {
            console.log('No items found in the cart to calculate total price.');
            return 0;
        }

        for (const priceElement of priceElements) {
            const priceString = await priceElement.textContent();

            if (priceString) {
                const price = this.parsePrice(priceString);
                totalSum += price;
                console.log(`Added price: ${priceString} -> ${price}`);
            } else {
                console.warn('Could not get text content for a price element.');
            }
        }

        return totalSum;
    }

    async expectAllProductQuantities(expectedQuantities: { [productName: string]: number }) {

        const itemContainers = await this.page.locator(this.itemContainerLocator).all();

        expect(itemContainers.length).toEqual(Object.keys(expectedQuantities).length);
        
        const validatedProductNames: string[] = [];

        for (const itemContainer of itemContainers) {
            
            const itemNameElement = itemContainer.locator(this.itemNameLocator);
            const productName = await itemNameElement.textContent();

            const quantityElement = itemContainer.locator(this.itemQuantityValueLocator);
            const quantityString = await quantityElement.textContent();

            expect(productName).not.toBeNull();
            expect(productName).not.toBe('');
            expect(quantityString).not.toBeNull();
            expect(quantityString).not.toBe('');

            if (productName && quantityString) {
                const trimmedProductName = productName.trim();
                const actualQuantity = this.parseQuantity(quantityString);

                if (expectedQuantities.hasOwnProperty(trimmedProductName)) {
                    const expectedQuantity = expectedQuantities[trimmedProductName];

                    expect(actualQuantity).toEqual(expectedQuantity);

                    validatedProductNames.push(trimmedProductName);

                } else {
                
                    expect(true).toBe(false); // Fail the test
                }
            } else {
                 
                 expect(true).toBe(false); // Fail the test
            }
        }

        const expectedProductNames = Object.keys(expectedQuantities);
        const allExpectedFound = expectedProductNames.every(name => validatedProductNames.includes(name));
        expect(allExpectedFound).toBe(true);
        if (!allExpectedFound) {
             const missingProducts = expectedProductNames.filter(name => !validatedProductNames.includes(name));
        }
    }

}