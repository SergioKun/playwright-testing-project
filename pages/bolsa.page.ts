import { Locator, Page } from "@playwright/test";

export class BolsaPage {

    private confirmButton: Locator

    constructor(private page: Page) {
        this.confirmButton = this.page.locator('//div[@data-molecule-modal-content=\'true\']//div[@class=\'exito-checkout-io-0-x-bagModalConfirm\']/button[@data-atom-button=\'true\' and normalize-space(.)=\'Confirmar\']')
    }

    async clickConfirmButton() {
        
        await this.confirmButton.click()

    }
}