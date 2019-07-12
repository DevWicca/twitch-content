const puppeteer = require('puppeteer');

(async () => {
    let speed = 3000
    let headless = false


    const browser = await puppeteer.launch({
        headless
        
    });
    const page = await browser.newPage();
//     await page.setViewport({
//     width: 1800,
//     height: 1000
// });


    await page.goto('https://www.twitch.tv/directory/game/Teamfight%20Tactics/clips?range=trending');

    // set language To english
    await page.$eval("[data-test-selector=language-select-menu__toggle-button]", elm => elm.click())
    await page.$eval("[data-language-code=en]", elm => elm.children[1].click())
    await page.waitFor(2000)
    await page.waitFor(()=> document.querySelector(".tw-pill--brand").innerHTML)

    let a = await page.$$eval("[data-a-target=preview-card-image-link]",elm => {
        let s =[]
        elm.map(elm => s.push(elm.href))
        return s
    })

    console.log (a)

        let i = 0
    do { 
        console.log(`youre going to ${a[i]}`)
        await page.goto(a[i])
        await page.evaluate(() => window.open(document.getElementsByTagName("video")[0].src))
       
        await page.waitFor(30000)
        i++
    } while (i < a.length);

    await browser.close()


})();



