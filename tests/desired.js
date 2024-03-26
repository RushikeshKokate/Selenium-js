const { Builder, By, assert, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const {
  elementIsDisabled,
  elementLocated,
} = require("selenium-webdriver/lib/until");
const { setTimeout } = require("timers/promises");
const yaml = require('js-yaml');
const fs = require('fs');

// Function to append data to YAML file
function appendToYAML(data) {
  let yamlData;
  try {
    // Read existing YAML file
    yamlData = yaml.safeLoad(fs.readFileSync("logfile_v2.yaml", 'utf8'));
  } catch (e) {
    // If the file doesn't exist or is empty, initialize an empty array
    yamlData = [];
  }

  // Append new data to existing YAML data
  yamlData.push(data);

  // Write the updated YAML data to the file
  fs.writeFileSync("logfile.yaml", yaml.dump(yamlData));
}

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

    try {
      const stockNameArray = ["INDUSINDBK", "CIPLA", "LT"]
      const stockName = stockNameArray[0]
      // Navigate to the web page
      await driver.get(`https://dev.portal.tradebrains.in/stock/${stockName}/consolidated`);

      // Wait until the element is located
      //let elements = await driver.wait(until.elementLocated(By.xpath('//*[@id="my-scroll-layout"]')), 10000);
      let elements = await driver.wait(until.elementLocated(By.css('*')))

      let divContent = await elements.getText();

      let lines = divContent.split('\n')

      // Create an array to store the log data
      let logDataArray = [];

      for (let i = 0; i < lines.length; i++) {
        let currentLine = lines[i]

        if(currentLine.includes("NA")){
            let previousLine = i > 0 ? lines[i-1] : ""
            let data = {};
            data[previousLine.trim()] = currentLine.trim();
            logDataArray.push(data);
        }
      }
      // Append log data to the YAML file
      appendToYAML({ 'StockName': logDataArray });
    } catch (error) {
      // Handle StaleElementReferenceError
      if (error.name === "StaleElementReferenceError") {
        console.warn("Stale element encountered, skipping....");
      } else {
        throw error; // Rethrow any other error
      }
    } finally {
      // Close the WebDriver session
      // await driver.quit();
    }
  });
});
