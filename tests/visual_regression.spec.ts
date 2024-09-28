import { test } from './pomFixture';


test.beforeEach(async ({ twentyFourMxPage }) => {
    await twentyFourMxPage.goto()
    await twentyFourMxPage.waitForMainPageLoadState()
  });

const percySnapshot = require('@percy/playwright');
test('Check if main page looks good', async ({ page, twentyFourMxPage }) => {
    await percySnapshot(page, 'https://www.24mx.pl');
    await twentyFourMxPage.compareImage('/screenshots/HomePage.png')
});

test('Product searching', async ({ page, twentyFourMxPage }) => {
    await twentyFourMxPage.performSearch('kask motocross')
    await percySnapshot(page, 'SearchResults.png');
    await twentyFourMxPage.compareImage('/screenshots/HomePage.png', {x:0, y:0, height:282, width:1280})
});

test('Add producto to the basket', async ({ page, twentyFourMxPage }) => {
    await twentyFourMxPage.openCategoryHelmetsCross()
    await twentyFourMxPage.chooseHelmetbyTitle("Kask Cross Raven Airborne Evo Czarny")
    await twentyFourMxPage.chooseHelmetSize('M')
    await twentyFourMxPage.addToCartAndCheckout()
    await percySnapshot(page, 'koszyk.png');
    await twentyFourMxPage.compareImage('/screenshots/koszyk.png', {x:0, y:0, height:224, width:514})
});