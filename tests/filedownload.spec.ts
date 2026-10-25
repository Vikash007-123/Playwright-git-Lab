import { test, chromium, Browser, Page, BrowserContext, expect } from "@playwright/test";
import fs from 'fs';

test('download the file ', async ({ browser }) => {
    let browseName: Browser = await chromium.launch({ channel: 'chrome', headless: false });
    let context: BrowserContext = await browseName.newContext();
    let pageNew: Page = await context.newPage();
    await pageNew.goto("https://the-internet.herokuapp.com/download")

    let [downloadFile] = await Promise.all([
        pageNew.waitForEvent('download'),
        pageNew.getByRole('link', { name: 'rf_upload_stxd83_v.txt' }).click()
    ])
    let fileName = downloadFile.suggestedFilename();
    console.log("File Name ", fileName);
    let filePath = `/Users/vikashkumar/Documents/Playwright_Sessions_Jan_2026/DownloadFile/${fileName}`;
    await downloadFile.saveAs(filePath)

    console.log("Saved at:", filePath);

    //verify the file exist content

    expect(fs.existsSync(filePath)).toBeTruthy();

    //verify the file size

    let fileSize = fs.statSync(filePath).size;
    console.log("file Size", fileSize)
    expect(fileSize).toBeGreaterThan(0);

})