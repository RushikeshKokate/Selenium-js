const { Builder, By, assert, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const {
  elementIsDisabled,
  elementLocated,
} = require("selenium-webdriver/lib/until");
const { setTimeout } = require("timers/promises");

// Create a test suite using Mocha
describe("NA Values Test", function () {
  // Define a test case
  it("should list out all NA values on the page", async function () {
    // Set up Chrome options
    let options = new chrome.Options();
    // Configure Chrome to run in headless mode
    options.addArguments("--headless");

    // Create a WebDriver instance with Chrome
    let driver = await new Builder().forBrowser("chrome").build();
    //.setChromeOptions(options)

    try {
      // Navigate to the web page
      await driver.get(
        "https://portal.tradebrains.in/stock/INDUSINDBK/consolidated"
      );

      //Find all elements on the page
      // let elements = await driver.findElement(By.xpath('//*[@id="my-scroll-layout"]'));
      let elements = await driver.wait(until.elementLocated(By.css('*')))
      let divContent = await elements.getText();

      let lines = divContent.split('\n')

      // Create an array to store the log data
      let logData = [];

      for (let i = 0; i < lines.length; i++) {
        let currentLine = lines[i]

        if(currentLine.match("NA")){
            let previousLine = i > 0 ? lines[i-1] : ""
            logData.push("NA value found for ==> "+previousLine)
            logData.push(currentLine)
        }
      }
      // Write the log data to a text file
      fs.writeFileSync("testStock.txt", logData.join("\n"));
    } catch (error) {
      // Handle StaleElementReferenceError
      if (error.name === "StaleElementReferenceError") {
        console.warn("Stale element encountered, skipping....");
      } else {
        throw error; // Rethrow any other error
      }
    } finally {
      // Close the WebDriver session
      //await driver.quit();
    }
  });
});
