const puppeteer = require('puppeteer');
const puppeteerOptions = {
    ignoreHTTPSErrors: true,
    headless: true,
};


(async () => {


    const format = 'jpeg'
    const fs = require("fs");
    let html = fs.readFileSync("richText.html");
    try {

        // launch browser
        let browser = await puppeteer.launch(puppeteerOptions);
        const browserWSEndpoint = await browser.wsEndpoint();
        browser = await puppeteer.connect({ browserWSEndpoint: browserWSEndpoint });

        // create a new page
        let page = await browser.newPage();

        // set page content
        await page.setContent(
            html.toString(),
        ).catch(
            err => console.log(trace + ' [load error] ' + err)
        );

        await page.addStyleTag({
            content: "*{margin:0;padding:0;border:0;}"
        })

        await page.waitForSelector(".generateImagesContainer");
        // locate the element
        const element = await page.$('.generateImagesContainer');

        // screenshot the element and save to local file
        await element.screenshot({
            path: "puppeteerImage." + format,
        });

        await page.close();
        // close puppeteer
        await browser.close();

    } catch (e) {
        // logger.error(' [chrome init err] ' + e.stack);
        console.log(' [chrome init err] ' + e.stack);
        process.exitCode = 1;
    }

})();

