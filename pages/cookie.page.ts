import { Locator, Page } from "@playwright/test"

export class CookiePage {

    private cookieButton: Locator
    
    constructor(private page: Page) {
        this.cookieButton = this.page.locator(' //button[@data-fs-cookies-modal-button="true"]')
    }

    async clickOnCookieButton() {
        await this.cookieButton.click()
    }
}