// visual_regression.spec.ts
import { test, expect } from '@playwright/test';
import path from 'path';

test('Strona główna wygląda poprawnie', async ({ page }) => {
    await page.goto('https://www.24mx.pl/');
    await page.waitForLoadState('networkidle');
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot('/screenshots/HomePage.png');
});

test('Wyszukiwanie produktu', async ({ page }) => {
    await page.goto('https://www.24mx.pl/');
    await page.fill('#search-desktop', 'kask motocross');
    await page.waitForTimeout(1000);
    await page.click("(//a[@class='autocomplete-item'])[1]");
    await page.waitForLoadState('networkidle');
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot('/screenshots/SearchResults.png');
});

test('Dodawanie produktu do koszyka', async ({ page }) => {
    await page.goto('https://www.24mx.pl/');
    await page.click("//a[@class='m-navigation-link'][normalize-space()='Kaski']");
    await page.waitForLoadState('networkidle');
    await page.click("//img[@alt='Kask Cross']");
    await page.waitForLoadState('networkidle');
    await page.click("div[class='m-product-card-img'] img[title='Kask Cross Raven Airborne Evo Czarny']");
    await page.waitForLoadState('networkidle');
    await page.click("//div[@class='m-select__display']");
    await page.waitForLoadState('networkidle');
    await page.click("(//div[@class='a-product-variation'])[3]");
    await page.waitForLoadState('networkidle');
    await page.click(".m-button.m-button--purchase.qa-pdp-add-to-cart-btn.m-button--md");
    await page.waitForLoadState('networkidle');
    await page.click("//a[contains(text(),'Przejdź do kasy')]");
    await page.waitForLoadState('networkidle');
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot('/screenshots/koszyk.png');
});