import {test as baseTest} from "@playwright/test";
import TwentyFourMxPage from "./24mx_pom.page"


type MyFixtures = {
    twentyFourMxPage: TwentyFourMxPage
}

const testPages = baseTest.extend<MyFixtures>({
    twentyFourMxPage: async({page}, use) =>{
        // Set up the fixture.
        const twentyFourMxPage = new TwentyFourMxPage(page)
        // await twentyFourMxPage.goto()
        // await twentyFourMxPage.waitForMainPageLoadState()

        // Use the fixture value in the test.
        await use(twentyFourMxPage)

    }
})

export const test = testPages;