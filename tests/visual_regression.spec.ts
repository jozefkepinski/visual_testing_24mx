// visual_regression.spec.ts
import { test, expect } from '@playwright/test';
import { TwentyFourMxPage } from './24mx_pom.page';

const percySnapshot = require('@percy/playwright');
// test('Check if main page looks good', async ({ page }) => {
//     const twentyFourMxPage = new TwentyFourMxPage(page);
//     await twentyFourMxPage.goto();
//     await twentyFourMxPage.waitForMainPageLoadState()
//     await percySnapshot(page, 'https://www.24mx.pl');
//     await twentyFourMxPage.compareImage('/screenshots/HomePage.png')
// });

// test('Product searching', async ({ page }) => {
//     const twentyFourMxPage = new TwentyFourMxPage(page);
//     await twentyFourMxPage.goto();
//     await twentyFourMxPage.waitForMainPageLoadState()
//     await twentyFourMxPage.performSearch('kask motocross')
//     await percySnapshot(page, 'SearchResults.png');
//     await twentyFourMxPage.compareImage('/screenshots/HomePage.png', {x:0, y:0, height:282, width:1280})
// });

test('Add producto to the basket', async ({ page }) => {
    // await Promise.all([
    //     await page.goto('https://www.24mx.pl/', {waitUntil: "domcontentloaded"}),
    //     await page.waitForSelector('//*[@id="wrapper"]/div/p-home/div[1]/div[1]/p-cms-dynamic-renderer[9]/p-cms-container/div/div/div/p-cms-dynamic-renderer/p-cms-article-blurb/a/div[1]', {state:'visible'})
    // ])
    // await page.click("//a[@class='m-navigation-link'][normalize-space()='Kaski']");
    // await page.waitForLoadState();
    // await page.click("(//img[@alt='Kask Cross'])[1]");
    const twentyFourMxPage = new TwentyFourMxPage(page);
    await twentyFourMxPage.goto();
    await twentyFourMxPage.waitForMainPageLoadState()
    await twentyFourMxPage.openCategoryHelmetsCross()
    // await page.click("div[class='m-product-card-img'] img[title='Kask Cross Raven Airborne Evo Czarny']");
    await twentyFourMxPage.chooseHelmetbyTitle("Kask Cross Raven Airborne Evo Czarny")
    // await page.click("//div[@class='m-select__display']");
    // await page.click("(//div[@class='a-product-variation'])[3]");
                        //div[@class=\'a-product-variation\'])[3]
    await twentyFourMxPage.chooseHelmetSize('M')
    await page.click(".m-button.m-button--purchase.qa-pdp-add-to-cart-btn.m-button--md");
    await page.click("//a[contains(text(),'Przejdź do kasy')]");
    await page.waitForLoadState();
    await page.waitForSelector("//div[@class='m-checkout-box m-checkout-box--delivery']//div[@class='m-checkout-box__heading']", {state:'visible'});
    await page.waitForLoadState()
    await percySnapshot(page, 'koszyk.png');
    await Promise.all([
        expect(page).toHaveScreenshot('/screenshots/koszyk.png', {clip: {x:0, y:0, height:224, width:514}})
    ])
});