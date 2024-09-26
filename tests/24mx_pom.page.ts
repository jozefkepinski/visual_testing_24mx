import { Page, expect } from '@playwright/test';

export default class TwentyFourMxPage {
    constructor(private page: Page) {}

    // Locators
    readonly searchInput = this.page.locator('#search-desktop');
    readonly searchButton = this.page.locator("(//a[@class='autocomplete-item'])[1]");
    readonly categoryHelmets = this.page.locator("//a[@class='m-navigation-link'][normalize-space()='Kaski']")
    readonly crossHelmets = this.page.locator("(//img[@alt='Kask Cross'])[1]")
    readonly openTheHelmetsSizes = this.page.locator("//div[@class='m-select__display']")
    readonly addToCart = this.page.locator(".m-button.m-button--purchase.qa-pdp-add-to-cart-btn.m-button--md")
    readonly checkout = this.page.locator("//a[contains(text(),'Przejdź do kasy')]")

    async goto() {
        await this.page.goto('https://www.24mx.pl/', {waitUntil: 'domcontentloaded'});
    }

    // Methods
    async performSearch(query: string) {
        await this.searchInput.fill(query);
        await this.page.waitForLoadState()
        await this.searchButton.click();
        await this.page.waitForLoadState()
    }

    async waitForMainPageLoadState() {
        await this.page.waitForSelector('//*[@id="wrapper"]/div/p-home/div[1]/div[1]/p-cms-dynamic-renderer[1]/p-cms-freestyle/div/div/div/div[1]', {state:'visible'});
        await this.page.waitForLoadState()
    }

    async compareImage(image: string, _clip?:{x: number; y: number; width: number; height: number}|undefined) {
        if(_clip)
            {
                await Promise.all([
                    expect(this.page).toHaveScreenshot(image, {clip: {x:_clip.x, y:_clip.y, height:_clip.height, width:_clip.width}})
                ])
            }
        else
        {
            await Promise.all([expect(this.page).toHaveScreenshot(image)])
        }
        
    }

    async openCategoryHelmetsCross() {
        await this.categoryHelmets.click()
        await this.page.waitForLoadState()
        await this.crossHelmets.click()

    }

    async chooseHelmetbyTitle(name:string){
        await this.page.click(`div[class='m-product-card-img'] img[title='${name}']`);
    }

    async chooseHelmetSize(size:string){
        /**
         * Select Helmet size.
         * @param size - Select size number XS=1, S:2, M:3, L:4, XL:5
         */
        const sizes: { [key: string]: string } = {
            XS: "1",
            S: "2",
            M: "3",
            L: "4",
            XL: "5"
          };
        await this.openTheHelmetsSizes.click()
        await this.page.click(`(//div[@class='a-product-variation'])[${sizes[size]}]`)
    }

    async addToCartAndCheckout(){
        await this.addToCart.click()
        await this.checkout.click()
        await this.page.waitForLoadState()
        await this.page.waitForSelector("//div[@class='m-checkout-box m-checkout-box--delivery']//div[@class='m-checkout-box__heading']", {state:'visible'});
        await this.page.waitForLoadState()
    }
}