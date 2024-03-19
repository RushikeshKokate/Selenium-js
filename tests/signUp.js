const { By, Key, Builder, until } = require('selenium-webdriver');
require('chromedriver');
const test_case = require('./loginTest'); // Import the test_case function

async function signUpTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://portal.tradebrains.in/');

        let login = await driver.findElement(By.css('.br-5'));
        await login.click();
        console.log("Passed");

        await driver.manage().setTimeouts({ implicit: 5000 });
        
        let withEmailBtn = await driver.findElement(By.xpath('/html/body/div/div/div/div/div/div/div[2]/div[1]/div[3]'));
        await withEmailBtn.click();
        console.log("#Test 1 passed");


        // Find the email input field on the Google login page and enter the email
        let emailInput = await driver.wait(until.elementLocated(By.xpath('//*[@id="identifierId"]')), 5000);
        await emailInput.sendKeys('rushikesh.kokate@tradebrains.in');
        console.log("Email entered");

        // Wait for the next button to be clickable
        //await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath('//*[@id="identifierNext"]/div/button/div[3]'))), 5000);

        // Click on the "Next" button
        let nextButton = await driver.findElement(By.css('#identifierNext'));
        await nextButton.click();
        console.log("Next button clicked");

        let passwordIn = await driver.findElement(By.xpath('//*[@id="password"]/div[1]/div/div[1]/input'))
        // await passwordIn.onclick()
        await passwordIn.sendKeys('Usha@123')
        console.log('password Enterd')

        let nextButton2 = await driver.findElement(By.xpath('//*[@id="passwordNext"]'));
        await nextButton2.click();
        console.log("Next button clicked");
       
        // let continueButton = await driver.findElement(By.xpath('//*[@id="yDmH0d"]/c-wiz/div/div[2]/div/div[2]/div/div/div[2]/div/div/button'))
        // await continueButton.click();

        let continueButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="yDmH0d"]/c-wiz/div/div[2]/div/div[2]/div/div/div[2]/div/div/button/span')), 60000);
        await continueButton.click();
        console.log('continue btn pressed')

        let imgElement = await driver.wait(until.elementLocated(By.className('ant-dropdown-trigger')), 20000);
        // Click on the located img element
        await imgElement.click();
        console.log('Image clicked successfully');

        //let logOut = await driver.wait(until.elementsLocated(By.xpath('/html/body/div[3]/div/div/ul/li[3]/span/div')), 5000)
        //await logOut.click()
        let logoutSpan = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Logout")]')), 30000);
        await logoutSpan.click()
        console.log("Logout Done ✅")
    } catch (error) {
        console.error("Error:", error);
    } finally {
       
    }
    test_case()
}

signUpTest();



// async function test_case() {
//     let driver = await new Builder().forBrowser("chrome").build();

//     try {
//         await driver.get("https://portal.tradebrains.in/");

//         // Find the button by its Tailwind CSS class and click it
//         let button = await driver.findElement(By.css('.br-5'));
//         await button.click();

//         console.log("#Test 1 passed")

//         await driver.manage().setTimeouts({implicit:5000});
//         // Find the "Login with Email" button and click it to enter the login page
//         let withEmailBtn = await driver.findElement(By.xpath("//div[contains(@class, 'bg-dark-black')]//p[contains(text(), 'Sign in With Email')]"));
//         await withEmailBtn.click();

//         console.log("#Test 2 passed")
        

//         let emailInput = await driver.findElement(By.id('login_email'))
//         await emailInput.click()
//         await emailInput.sendKeys('rushikesh.kokate@tradebrains.in')

//         console.log("3 passed")

//         let passwordInput = await driver.findElement(By.id('login_password'))
//         await passwordInput.click()
//         await passwordInput.sendKeys('Usha@123')

//         console.log("4 passed")

//         // Log the title after the button is clicked
//         let title = await driver.getTitle();
//         console.log("Page Title:", title);

//         await driver.manage().setTimeouts({implicit:5000});
//         // Perform your desired action based on the title
//         // For example, if(title === "sign in")
//         let submit = await driver.findElement(By.css('.h-42'))
//         await submit.click()
        

//         console.log("5 passed")
//     } catch (error) {
//         console.error("Error:", error);
//     } finally {
//         // Close the WebDriver
//         //await driver.quit();
//     }
// }

