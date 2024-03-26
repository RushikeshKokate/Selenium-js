const yaml = require('js-yaml');
const { Builder, By, assert, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const {
  elementIsDisabled,
  elementLocated,
} = require("selenium-webdriver/lib/until");
const { setTimeout } = require("timers/promises");
const fs = require("fs");

// Function to append data to YAML file
function appendToYAML(data) {
  let yamlData;
  try {
    // Read existing YAML file
    yamlData = yaml.safeLoad(fs.readFileSync("logfile.yaml", 'utf8'));
  } catch (e) {
    // If the file doesn't exist or is empty, initialize an empty object
    yamlData = {};
  }

  // Append new data to existing YAML data
  Object.assign(yamlData, data);

  // Write the updated YAML data to the file
  fs.writeFileSync("logfile_v2.yaml", yaml.dump(yamlData));
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
      // Navigate to the web page
      await driver.get("https://portal.tradebrains.in/stock/INDUSINDBK/consolidated");

      // Wait until the element is located
      let elements = await driver.wait(until.elementLocated(By.xpath('//*[@id="my-scroll-layout"]')), 10000);

      let divContent = await elements.getText();

      let lines = divContent.split('\n')

      // Create an object to store the log data
      let logData = {};

      for (let i = 0; i < lines.length; i++) {
        let currentLine = lines[i]

        if(currentLine.includes("NA")){
            let previousLine = i > 0 ? lines[i-1] : ""
            logData['stocks'] = logData['stocks'] || {};
            logData['stocks']['key' + (i+1)] = {
              'previousLine': previousLine.trim(),
              'currentLine': currentLine.trim()
            };
        }
      }
      // Append log data to the YAML file
      appendToYAML(logData);
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
