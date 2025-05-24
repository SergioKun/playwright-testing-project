import { Locator, Page } from "@playwright/test";

export class PLPPage {

    private cookieButton: Locator
    private addButton: Locator

     constructor(private page: Page) {
        this.cookieButton = this.page.locator(' //button[@data-fs-cookies-modal-button="true"]')
        this.addButton = this.page.locator('//ul[@data-fs-product-grid="true"]/li[1]//button[span[text()="Agregar"]]')
    }

    async goToPLP() {
        await this.page.goto('https://www.exito.com/tecnologia/televisores')
    }

    async addFirstProductToCartFromPLP(){

        await this.addButton.click()
    
        await this.page.locator('//button[@data-testid="cart-toggle"]').waitFor({ state: 'visible' })
    }

    async addProductToCartFromPLP(numbreOfProduct: number){

        for(let i = 1; i <= numbreOfProduct; i++) {
            const addButton = await this.getAddButtonFromPLP(i);
            await addButton.click()
            await this.page.waitForTimeout(5000)
        }

        
    }

    async getAddButtonFromPLP(numberOfProduct: number) {
        return this.page.locator(`//ul[@data-fs-product-grid="true"]/li[${numberOfProduct}]//button[span[text()="Agregar"]]`)
    }

}