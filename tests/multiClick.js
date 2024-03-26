const fs = require('fs');
const { it } = require('mocha');
const { Builder, By, Key, until } = require('selenium-webdriver');

describe("NA Values Test", function () {
    // Define a test case
    it("should list out all NA values on the page", async function () {
  
      // Create a WebDriver instance with Chrome
      let driver = await new Builder().forBrowser("chrome").build();
  
      try {
        // Navigate to the web page
        await driver.get(
          "https://dev.portal.tradebrains.in/stock/INDUSINDBK/consolidated"
        );
  
        //Find all elements on the page
        let elements = await driver.findElement(By.xpath('//*[@id="my-scroll-layout"]'));
        let divContent = await elements.getText();
  
        let lines = divContent.split('\n')
  
        // Create an array to store the log data
        let logData = [];
  
        for (let i = 0; i < lines.length; i++) {
          let currentLine = lines[i]
  
          if(currentLine.includes("NA")){
              let previousLine = i > 0 ? lines[i-1] : ""
              logData.push("NA value found for ==> "+previousLine)
              logData.push(currentLine)
          }
        }
  
        // Write the log data to a text file
        fs.writeFileSync("log2.txt", logData.join("\n"));
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
  