import { Locator, Page } from "@playwright/test"

export class MiniCartPage {

    private miniCartButton: Locator
    private cartButton: Locator
    private deleteButton: Locator

    constructor(private page: Page) {
            this.miniCartButton = this.page.locator('//button[@data-testid="cart-toggle"]')
            this.cartButton = this.page.locator('//button[@data-fs-button-pay="true"]')
            this.deleteButton = this.page.locator('//div[@data-fs-modal-minicart="true"]//ul/li[1]//button[1]')
    }

    async goToMiniCartPage(){
        await this.miniCartButton.click()
    }

    async goToCartPage(){
        await this.cartButton.click()
    }

    async deleteFirstProduct(){
        await this.deleteButton.click()
    }

}