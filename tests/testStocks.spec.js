const { Builder, By, assert } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs')

// Create a test suite using Mocha
// Create a test suite using Mocha
describe('NA Values Test', function() {
  // Define a test case
  it('should list out all NA values on the page', async function() {
      // Set up Chrome options
      let options = new chrome.Options();
      // Configure Chrome to run in headless mode
      options.addArguments('--headless');

      // Create a WebDriver instance with Chrome
      let driver = await new Builder()
          .forBrowser('chrome')
          .setChromeOptions(options)
          .build();

      try {
          // Navigate to the web page
          await driver.get('https://portal.tradebrains.in/stock/INDUSINDBK/consolidated');

          // Find all elements on the page
          let elements = await driver.findElement(By.xpath('//*[@id="my-scroll-layout"]'));
          
          let divContent = await elements.getText();

          // Create an array to store the log data
          let logData = [];

          try {
            // Get the text of the element
            // Check if the text contains "NA"
            if (divContent.includes('NA')) {
                // Log the element containing "NA"
                console.log('NA value found:', divContent);
                // Store the log data in the array
                logData.push('NA value found: ' + divContent);
            }
        } catch (error) {
            // Handle StaleElementReferenceError
            if (error.name === 'StaleElementReferenceError') {
                console.warn('Stale element encountered, skipping...');
           // Skip to the next iteration
            } else {
                throw error; // Rethrow any other error
            }
        }
          // Iterate through each element
          // for (let element of elements) {
          //     try {
          //         // Get the text of the element
          //         let text = await element.getText();
          //         // Check if the text contains "NA"
          //         if (text.includes('NA')) {
          //             // Log the element containing "NA"
          //             console.log('NA value found:', text);
          //             // Store the log data in the array
          //             logData.push('NA value found: ' + text);
          //         }
          //     } catch (error) {
          //         // Handle StaleElementReferenceError
          //         if (error.name === 'StaleElementReferenceError') {
          //             console.warn('Stale element encountered, skipping...');
          //             continue; // Skip to the next iteration
          //         } else {
          //             throw error; // Rethrow any other error
          //         }
          //     }
          // }

          // Write the log data to a text file
          fs.writeFileSync('log.txt', logData.join('\n'));

      } finally {
          // Close the WebDriver session
          await driver.quit();
      }
  });
});
