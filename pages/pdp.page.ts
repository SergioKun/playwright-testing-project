import { expect, Locator, Page } from '@playwright/test';
import { MosalEntregaPage } from './modal-entrega.page';

export class PDPPage {

    private addToCartButton: Locator
    private sinGarantiaButton: Locator
    private irAlCarritoButton: Locator
    private seguirComprandoButton: Locator
    private modalEntregaPage: MosalEntregaPage

    constructor(private page: Page) {
        this.addToCartButton = this.page.locator('//div[@data-fs-container-buybutton]//span[contains(text(),"Agregar")]//parent::button')
        this.sinGarantiaButton = this.page.locator('//button/label[@for="modalUI_empty"]')
        this.irAlCarritoButton = this.page.locator('//button/span[contains(text(),"Ir al carrito")]')
        this.seguirComprandoButton = this.page.locator('//button[@data-fs-warranty-btn-secondary="true"]')
        this.modalEntregaPage = new MosalEntregaPage(page)
    }


    async goToPDP(url: string) {
        await this.page.goto(url)
    }

    async addToCart() {
        await this.addToCartButton.click()
    }

    async selectSinGarantia() {
        // Espera explicita
        await this.sinGarantiaButton.waitFor({ state: 'visible' })
        await this.sinGarantiaButton.click()
        await this.irAlCarritoButton.click()
    }

    async selectSeguirComprando() {
        await this.seguirComprandoButton.click()
    }

    async addToCartProducts(products: any[]){   

        for (const product of products) {
            await this.goToPDP(product.url)
            await this.addToCart()

            if(product.noAlimentos){
                await this.selectSeguirComprando()
            }else{
                await this.modalEntregaPage.selectEntrega()
                 await this.waitForAddToCartButton()
                await this.addToCart()
            } 
            
            await this.page.waitForTimeout(5000)
        }
    }

    async waitForAddToCartButton() {
        await this.addToCartButton.waitFor({ 
            state: 'visible', 
            timeout: 10000 
        })
    }

}