import { Locator, Page } from "@playwright/test";

export class MosalEntregaPage{

    private ciudadList: Locator
    private selectCiudadList: Locator
    private almacenList: Locator
    private selectAlmacenList: Locator
    private confirmarButton: Locator
    private modalContainer: Locator

    constructor(private page: Page){
        this.ciudadList = this.page.locator('//div[contains(@class, \'css-b62m3t-container\')] ')
        this.selectCiudadList = this.page.locator('//div[@role=\'option\' and normalize-space()=\'Bello\']')
        this.almacenList = this.page.locator('//div[contains(@class, \'css-bpafbg-control\')]')
        this.selectAlmacenList = this.page.locator('//div[@role=\'option\' and normalize-space()=\'Exito Bello\']')
        this.confirmarButton = this.page.locator('//div[@data-fs-container-button-delivery-type=\'true\']//button[@data-testid=\'store-button\']')
        this.modalContainer = this.page.locator('//div[@data-fs-modal-content="true"][@data-testid="store-modal"][@aria-modal="true"][@role="dialog"]')
    }

    async selectEntrega(){

        await this.modalContainer.waitFor({ state: 'visible', timeout: 10000 })

        await this.ciudadList.click()
        await this.selectCiudadList.click()
        await this.page.waitForTimeout(3000)
        await this.almacenList.click()
        await this.selectAlmacenList.click()
        await this.confirmarButton.click()

    }
}