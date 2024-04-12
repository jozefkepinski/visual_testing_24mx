import { Page } from '@playwright/test';

export class TwentyFourMxPage {
    constructor(private page: Page) {}

    // Lokatory dla elementów na stronie
    readonly searchInput = this.page.locator('[data-testid="search-input"]');
    readonly searchButton = this.page.locator('[data-testid="search-button"]');
    readonly productTitle = this.page.locator('[data-testid="product-title"]');
    // Dodaj inne lokatory, które są potrzebne

    async goto() {
        await this.page.goto('https://www.24mx.pl/', {waitUntil: 'domcontentloaded'});
    }

    // Dodaj metody do interakcji z elementami strony
    async performSearch(query: string) {
        await this.searchInput.fill(query);
        await this.searchButton.click();
    }

    async getProductTitle() {
        return await this.productTitle.textContent();
    }
}