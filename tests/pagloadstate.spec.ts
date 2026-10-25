import { test, chromium, Browser, Page, BrowserContext } from "@playwright/test";


test('page load state test cases ', async ({ }) => {
    //Hi Iam here 
    let browser: Browser = await chromium.launch({ channel: "chrome", headless: false, slowMo: 100 })
    let ctx: BrowserContext = await browser.newContext();
    let page: Page = await ctx.newPage();
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register", { waitUntil: 'load' });
    //page loading:- states Interview
    //load-> all resources(images,elements,css,scripts) loaded -- default option
    //domcontentloaded:- HTML DOM is parsed,DOM is ready
    //networkidle:- no netwrok activity for 500 ms--good. ?->No
    //commit: first response byte from server
    console.log(await page.title());



    await page.reload();






})