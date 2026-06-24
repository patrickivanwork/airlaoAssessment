import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';


test.describe("Client can search products from home page",() => {
    
    test('Product selection price matches basket price', async ({ page }) => {
        let homePage = new HomePage(page);
        
        await homePage.goto();
        await homePage.searchForAndSelectCountry("Japan");
        await homePage.selectPackageByNumberOfDays("7")

        let priceOfSelectedPackage: string | null= await homePage.getSelectedPackageCost();

        expect(await homePage.totalBasketCost()).toBe(priceOfSelectedPackage)
    });

  test('Product selection price matches basket price V2', async ({ page }) => {
        let homePage = new HomePage(page);
        
        await test.step('Navigate to home page and confirm logo is visible', async () => {
            await homePage.page.goto('/');
            await expect(homePage.airaloLogo()).toBeVisible();
        });

        await test.step('Accept cookie policy and check cookie prompt dissappears', async () => {   
            await homePage.acceptCookiesButton().click();
            await expect(homePage.acceptCookiesButton()).toBeHidden();
        });

        await test.step('Search for country and select it if found', async () => {
            await homePage.searchForAndSelectCountry("Japan");
            await expect(homePage.unlimitedTab()).toBeVisible();
        });

        await test.step('Select coverage plan to reveal plan description and add it to cart', async () => {
            await homePage.selectPackageByNumberOfDays("7");
            await expect(homePage.packageDescriptionBox()).toBeVisible();
            await expect(homePage.cart()).toBeVisible();
        });

        await test.step('Cart total price is same as selected package price', async () => {
            expect(await homePage.totalBasketCost()).toBe(await homePage.getSelectedPackageCost())
        });

    });
});