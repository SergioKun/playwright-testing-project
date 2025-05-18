import { test, expect } from '@playwright/test';
import { PDPPage } from '../pages/pdp.page';
import { SummaryPage } from '../pages/summary.page';
import { PLPPage } from '../pages/plp.page';
import { SessionStoragePage } from '../pages/session-storage.page';
import { MiniCartPage } from '../pages/mini-cart.page';
import { CookiePage } from '../pages/cookie.page';
import { BolsaPage } from '../pages/bolsa.page';


test.describe('H1 Agregar productos al carrito y validar OrderForm en Summary del checkout', () => {
    test('CP1 ', async ({ page }) => {

        const pdpPage = new PDPPage(page)
        const summaryPage = new SummaryPage(page)

        // ir a la página
        await pdpPage.goToPDP('https://www.exito.com/televisor-samsung-60-pulgadas-led-uhd-4k-smart-tv-un60du7000kxzl-3179356/p')
        await pdpPage.addToCart()
        await pdpPage.selectSinGarantia()

        await summaryPage.expectPositiveItemSummary('Televisor SAMSUNG 60 pulgadas LED Uhd4K Smart TV UN60DU7000KXZL', '1')

        await page.waitForTimeout(5000)

        // Código para solucionar la revisión del sessionStorage
    })

    test('CP2 ', async ({ page }) => {
        const plpPage = new PLPPage(page);
        const sessionStoragePage = new SessionStoragePage(page);
        const minicartPage = new MiniCartPage(page);
        const cookiePage = new CookiePage(page)

        await plpPage.goToPLP();
        await cookiePage.clickOnCookieButton(); 
        await minicartPage.goToMiniCartPage();
        await minicartPage.goToCartPage();
        await page.waitForTimeout(5000);
        
        await sessionStoragePage.expectOrderFormItemsToBeEmpty();

    })

    test('CP3 ', async ({ page }) => {
        const plpPage = new PLPPage(page);
        const sessionStoragePage = new SessionStoragePage(page);
        const minicartPage = new MiniCartPage(page);
        const cookiePage = new CookiePage(page)

        await plpPage.goToPLP();
        await cookiePage.clickOnCookieButton();
        await plpPage.addFirstProductToCartFromPLP(); 

        
        await minicartPage.goToMiniCartPage();
        await minicartPage.goToCartPage();
        await minicartPage.deleteFirstProduct();
        await page.waitForTimeout(5000);

     
        await sessionStoragePage.expectOrderFormItemsToBeEmpty();
    })

    test('CP4 ', async ({ page }) =>{
        const plpPage = new PLPPage(page);
        const minicartPage = new MiniCartPage(page);
        const summaryPage = new SummaryPage(page)
        const cookiePage = new CookiePage(page)

        await plpPage.goToPLP();
        await cookiePage.clickOnCookieButton();
        await plpPage.addProductToCartFromPLP(3);
        await minicartPage.goToMiniCartPage();
        await minicartPage.goToCartPage();
        await page.waitForTimeout(5000);

        const expectedTotal = await summaryPage.calculateTotalItemsPrice();
        await summaryPage.expectPositiveTotalValue(expectedTotal)
    })

    test('CP5 ', async ({ page }) =>{
        const pdpPage = new PDPPage(page);
        const minicartPage = new MiniCartPage(page);
        const cookiePage = new CookiePage(page);
        const sessionStoragePage = new SessionStoragePage(page);

        await pdpPage.goToPDP('https://www.exito.com/televisor-samsung-60-pulgadas-led-uhd-4k-smart-tv-un60du7000kxzl-3179356/p');
        await pdpPage.addToCart();
        await page.waitForTimeout(2000);
        await pdpPage.selectSeguirComprando();
        await page.reload();
        await cookiePage.clickOnCookieButton();
        await minicartPage.goToMiniCartPage();
        await minicartPage.goToCartPage();

        await page.waitForTimeout(5000);

        await sessionStoragePage.expectOrderFormItemsToBePresent();

    })

    test('CP6 ', async ({ page }) =>{
        const pdpPage = new PDPPage(page);
        const minicartPage = new MiniCartPage(page);
        const cookiePage = new CookiePage(page);
        const summaryPage = new SummaryPage(page)
        const bolsaPage = new BolsaPage(page)

        var products: any[] = [
            {url:'https://www.exito.com/televisor-samsung-60-pulgadas-led-uhd-4k-smart-tv-un60du7000kxzl-3179356/p', noAlimentos:true},
            {url:'https://www.exito.com/salchicha-ranchera-x-480-g-749935/p',noAlimentos:false}
            
        ]

        await pdpPage.addToCartProducts(products)
        await cookiePage.clickOnCookieButton()
        await minicartPage.goToMiniCartPage();
        await minicartPage.goToCartPage();
 
        await bolsaPage.clickConfirmButton()

        const expectedProductQuantities = {
            'Televisor SAMSUNG 60 pulgadas LED Uhd4K Smart TV UN60DU7000KXZL': 1,
            'Salchicha Ranchera RANCHERA  (480  gr)': 1
        };

        await summaryPage.expectAllProductQuantities(expectedProductQuantities);
        
    })

})