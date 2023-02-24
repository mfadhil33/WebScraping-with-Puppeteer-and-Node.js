const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function start() { 

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://learnwebcode.github.io/practice-requests/");
    await page.screenshot({path: "amazing.png", fullPage: true });

    const names = await page.evaluate(() => {
    return  Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent)
    });
    await fs.writeFile("names.txt", names.join("\r\n"));

    await page.click('#clickname');
    const clickedData = await page.$eval("#data", el => );
     const photos = await page.$$eval("img", (imgs) => {
        return imgs.map(x => x.src)
    });

    for (const photo of photos){
      const imagepage = await page.goto(photo);
      await fs.writeFile(photo.split("/").pop(), await imagepage.buffer());

    }
    await browser.close();

}

start();