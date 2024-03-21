const { Builder, By, assert, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const { elementIsDisabled, elementLocated } = require("selenium-webdriver/lib/until");

// Create a test suite using Mocha
describe("NA Values Test", function () {
  // Define a test case
  it("should list out all NA values on the page", async function () {
    // Set up Chrome options
    let options = new chrome.Options();
    // Configure Chrome to run in headless mode
    options.addArguments("--headless");

    // Create a WebDriver instance with Chrome
    let driver = await new Builder()
      .forBrowser("chrome")
      .build();
      //.setChromeOptions(options)

    try {
      // Navigate to the web page
      await driver.get("https://portal.tradebrains.in/stock/INDUSINDBK/consolidated");

      let plusBtns = await driver.wait(until.elementsLocated(By.css('button.ant-table-row-expand-icon.ant-table-row-expand-icon-collapsed[aria-label="Expand row"][aria-expanded="false"]')), 5000)

      for (const btn of plusBtns) {
        await btn.click();
      }

    //   let childBtns = await driver.wait(until.elements(By.css('button.ant-table-row-expand-icon.ant-table-row-expand-icon-collapsed[aria-label="Expand row"][aria-expanded="false"]')), 5000)

    //   for (const btn of childBtns) {
    //     await btn.click()
    //   }

      // Find all elements on the page
      // let elements = await driver.findElement(By.xpath('//*[@id="my-scroll-layout"]'));
      // let divContent = await elements.getText();

      // Create an array to store the log data
      let logData = [];

      // Get the text of the element
      // Check if the text contains "NA"
      // if (divContent.includes("NA")) {
      // Log the element containing "NA"
      //   console.log("NA value found:", divContent);
      // Store the log data in the array
      //   logData.push("NA value found: " + divContent);
      // }

      // Write the log data to a text file
      fs.writeFileSync("log.txt", logData.join("\n"));
    } catch (error) {
      // Handle StaleElementReferenceError
      if (error.name === "StaleElementReferenceError") {
        console.warn("Stale element encountered, skipping...");
        // Skip to the next iteration
      } else {
        throw error; // Rethrow any other error
      }
    } finally {
      // Close the WebDriver session
      //await driver.quit();
    }
  });
});
