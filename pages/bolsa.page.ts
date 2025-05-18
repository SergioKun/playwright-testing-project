import { Locator, Page } from "@playwright/test";

export class BolsaPage {

    private confirmButton: Locator

    constructor(private page: Page) {
        this.confirmButton = this.page.locator('//div[@data-molecule-modal-content=\'true\']//div[@class=\'exito-checkout-io-0-x-bagModalConfirm\']/button[@data-atom-button=\'true\' and normalize-space(.)=\'Confirmar\']')
    }

    async clickConfirmButton() {

        await this.confirmButton.waitFor({ state: 'visible', timeout: 10000 })
        
        await this.confirmButton.click()

        await this.page.waitForSelector('//div[@data-molecule-modal-content=\'true\']', 
            { state: 'hidden', timeout: 5000 })
    }
}