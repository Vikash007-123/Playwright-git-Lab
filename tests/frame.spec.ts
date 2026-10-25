import { test, Frame, Locator } from "@playwright/test";


test("Fill the Proposal Submission", async ({ page }) => {

    await page.goto("https://www.formsite.com/templates/registration-form-templates/vehicle-registration-form/");
    await page.getByTitle('Vehicle-Registration-Forms-and-Examples').click();
    let frameLocator = page.frameLocator("#frame-one748593425")
    await frameLocator.getByRole('textbox', { name: 'Proposal title *' }).fill("Vechile Reg")
    await frameLocator.locator("#RESULT_TextField-3").fill("Mumbai")

    let textValue = await page.locator(".details__form-preview-title").textContent();
    console.log(textValue)

})


test('Frame test', async ({ page }) => {
    await page.goto("https://www.londonfreelance.org/courses/frames/index.html");
    let frameLocator = page.frameLocator("[name='main']");
    let stringHeader = await frameLocator.getByRole("heading", { level: 2 }).innerText();
    console.log("stringHeader:", stringHeader)


    let frameLocator1 = page.frameLocator("[name='bot']");
    let stringHeader1 = await frameLocator1.getByRole("heading", { level: 2 }).innerText();
    console.log("stringHeader1:", stringHeader1)

    await page.pause();




})


test('Count the Total Frame Present On webpage', async ({ page }) => {
    await page.goto("https://www.londonfreelance.org/courses/frames/index.html");
    let allFrames: Frame[] = page.frames();
    let countFrame = allFrames.length;
    console.log("countFrame", countFrame)

    for (let fr of allFrames) {
        let frameName = fr.name();
        let frameUrl = fr.url();
        console.log(frameName, frameUrl)

    }
    console.log("-----------------Using All method, will not handle -----------------------")
    let totalFrame: Locator[] = await page.locator("//frame").all();
    console.log("Count", totalFrame)

    for (let i = 0; i < totalFrame.length; i++) {
        let frameText = await totalFrame[i].textContent();
        console.log("----", frameText)
    }



    await page.pause();

})


test('nested frames test', async ({ page }) => {
    await page.goto('https://www.dezlearn.com/nested-iframes-example/'); //web page


    let parentFrame = page.frameLocator('#parent_iframe');
    let childFrame = parentFrame.frameLocator('#iframe1');

    await childFrame.getByRole('button', { name: 'Click Here' }).click();
    let mesg = await childFrame.locator('#processing').innerText();
    console.log(mesg);

    console.log('----------');

    await parentFrame.getByRole('button', { name: 'Click Here' }).click();
    let outerMesg = await parentFrame.locator('#processing').innerText();
    console.log(outerMesg);


    // await page.frameLocator('#parent_iframe')
    //     .frameLocator('#iframe1')
    //     .getByRole('button', { name: 'Click Here' }).click();



    let totalframe: Frame[] = page.frames();
    console.log(totalframe.length)

    for (let c of totalframe) {
        let name = c.name();
        console.log("Name:", name)
    }



    await page.pause();
});