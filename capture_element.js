const playwright = require('playwright');
const fs = require("fs");
(async () => {

    try {

        const format = 'jpeg'

        // load html from local file
        let html = fs.readFileSync("richText.html");

        const browser = await playwright.chromium.launch({
            headless: true
        });

        const context = await browser.newContext();
        const page = await context.newPage();

        await page.setContent(
            html.toString()
        ).catch(
            err => console.log("timeout", err)
        );

        await page.addStyleTag({
            content: "*{margin:0;padding:0;border:0;}"
        })

        // locate the element
        let locator = page.locator(".generateImagesContainer");
        locator.waitFor({
            state: "visible",
            timeout: 10000
        });

        // capture the element and save to local file
        await locator.screenshot({
            path: "longImage." + format,
        });

        await page.close();
        await browser.close();

    } catch (e) {
        console.log("[chrome init err]");
        process.exitCode = 1;
    }
})();