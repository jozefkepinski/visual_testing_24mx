// visual_regression.spec.ts
import { test, expect } from '@playwright/test';
import path from 'path';

test('Strona główna wygląda poprawnie', async ({ page }) => {
    await page.goto('https://www.24mx.pl/', {waitUntil: 'domcontentloaded'}),
    await page.waitForSelector('//*[@id="wrapper"]/div/p-home/div[1]/div[1]/p-cms-dynamic-renderer[9]/p-cms-container/div/div/div/p-cms-dynamic-renderer/p-cms-article-blurb/a/div[1]'),
    await page.waitForTimeout(2000),
    await Promise.all([
        expect(page).toHaveScreenshot('/screenshots/HomePage.png')
    ])
});

test('Wyszukiwanie produktu', async ({ page }) => {
    await Promise.all([
        await page.goto('https://www.24mx.pl/', {waitUntil: "domcontentloaded"}),
        await page.waitForSelector('//*[@id="wrapper"]/div/p-home/div[1]/div[1]/p-cms-dynamic-renderer[9]/p-cms-container/div/div/div/p-cms-dynamic-renderer/p-cms-article-blurb/a/div[1]'),
    ])
    // await page.waitForSelector("(//a[@class='autocomplete-item'])[1]"),
    await page.waitForTimeout(1000)
    await page.fill('#search-desktop', 'kask motocross');
    await page.waitForTimeout(1000);
    await page.click("(//a[@class='autocomplete-item'])[1]");
    await page.waitForTimeout(2000)
    await Promise.all([
        expect(page).toHaveScreenshot('/screenshots/SearchResults.png', {clip: {x:0, y:0, height:282, width:1280}})
    ])
});

test('Dodawanie produktu do koszyka', async ({ page }) => {
    await Promise.all([
        await page.goto('https://www.24mx.pl/', {waitUntil: "domcontentloaded"}),
        await page.waitForSelector('//*[@id="wrapper"]/div/p-home/div[1]/div[1]/p-cms-dynamic-renderer[9]/p-cms-container/div/div/div/p-cms-dynamic-renderer/p-cms-article-blurb/a/div[1]')
    ])
    await page.click("//a[@class='m-navigation-link'][normalize-space()='Kaski']");
    await page.waitForTimeout(1500);
    await page.click("(//img[@alt='Kask Cross'])[1]");
    await page.click("div[class='m-product-card-img'] img[title='Kask Cross Raven Airborne Evo Czarny']");
    await page.click("//div[@class='m-select__display']");
    await page.click("(//div[@class='a-product-variation'])[3]");
    await page.click(".m-button.m-button--purchase.qa-pdp-add-to-cart-btn.m-button--md");
    await page.click("//a[contains(text(),'Przejdź do kasy')]");
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector("//div[@class='m-checkout-box m-checkout-box--delivery']//div[@class='m-checkout-box__heading']");
    await page.waitForTimeout(2000);
    await Promise.all([
        expect(page).toHaveScreenshot('/screenshots/koszyk.png', {clip: {x:0, y:0, height:224, width:514}})
    ])
});