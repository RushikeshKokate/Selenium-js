const { By, Key, Builder } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome')
require("chromedriver");

const Options = new chrome.Options()
Options.addArguments('--headless')

async function test_case() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.get("https://portal.tradebrains.in/");

        // Find the button by its Tailwind CSS class and click it
        let button = await driver.findElement(By.css('.br-5'));
        await button.click();

        console.log("#Test 1 passed")

        await driver.manage().setTimeouts({implicit:5000});
        // Find the "Login with Email" button and click it to enter the login page
        let withEmailBtn = await driver.findElement(By.xpath("//div[contains(@class, 'bg-dark-black')]//p[contains(text(), 'Sign in With Email')]"));
        await withEmailBtn.click();

        console.log("#Test 2 passed")
        

        let emailInput = await driver.findElement(By.id('login_email'))
        await emailInput.click()
        await emailInput.sendKeys('rushikesh.kokate@tradebrains.in')

        console.log("3 passed")

        let passwordInput = await driver.findElement(By.id('login_password'))

        console.log("4 passed")

        // Log the title after the button is clicked
        let title = await driver.getTitle();
        console.log("Page Title:", title);

        await driver.manage().setTimeouts({implicit:5000});
        // Perform your desired action based on the title
        // For example, if(title === "sign in")
        let submit = await driver.findElement(By.css('.h-42'))
        await submit.click()
        

        console.log("5 passed")
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Close the WebDriver
        //await driver.quit();
    }
}

module.exports = test_case