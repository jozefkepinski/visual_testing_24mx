import {test as baseTest} from "@playwright/test";
import TwentyFourMxPage from "./24mx_pom.page"


type pages = {
    twentyFourMxPage: TwentyFourMxPage
}

const testPages = baseTest.extend<pages>({
    twentyFourMxPage: async({page}, use) =>{
        await use(new TwentyFourMxPage(page)
    )
    }
})

export const test = testPages;