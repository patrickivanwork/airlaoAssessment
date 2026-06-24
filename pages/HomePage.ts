import {Page, expect} from '@playwright/test';

export class HomePage {
    readonly page: Page;


    readonly airaloLogo = () => this.page.getByLabel('Airalo logo');
    readonly acceptCookiesButton = () => this.page.getByRole('button', { name: 'Accept basic cookies' });
    readonly searchField = () => this.page.getByTestId('search-input_text-field');
    readonly searchResultList = (country: string) => this.page.getByRole('link', { name: country });
    readonly unlimitedTab = () => this.page.getByTestId('segmented-control_tab-unlimited');
    readonly packageDescriptionBox = () => this.page.getByTestId('card-package-description_container');
    readonly selectPackageDays = (days: string) => this.page.getByRole('button', { name: `Select Unlimited - ${days} days` });

    readonly selectedPackagePrice = () => this.page.getByRole('button')
                                                    .filter({has: this.packageDescriptionBox()})
                                                    .getByTestId('price_amount');

    readonly cart = () => this.page.getByTestId('cart-navigation_container');                                                 
    readonly cartPrice = () => this.cart().getByTestId('price_amount');



    constructor (page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto("/");
        await expect(this.airaloLogo()).toBeVisible();

        await this.acceptCookiesButton().click();
        await expect(this.acceptCookiesButton()).toBeHidden();
    }

    async searchForAndSelectCountry(country: string){
        await this.searchField().click();
        await this.searchField().fill(country);
        await this.searchResultList(country).click();
    }

    async selectPackageByNumberOfDays(days:string){
        await this.unlimitedTab().scrollIntoViewIfNeeded();
        await this.unlimitedTab().click();
        
        await this.selectPackageDays(days).scrollIntoViewIfNeeded();
        await this.selectPackageDays(days).click();
    }

     async getSelectedPackageCost() {
        return this.selectedPackagePrice().textContent();
    }

    async totalBasketCost() {
        return this.cartPrice().textContent();
    }
};