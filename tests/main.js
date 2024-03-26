const yaml = require('js-yaml');
const fs = require('fs');
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

// Function to append data to YAML file
// Function to append data to YAML file
function appendToYAML(stockName, data) {
    let yamlData;
    try {
      // Read existing YAML file
      yamlData = yaml.safeLoad(fs.readFileSync("main-log.yaml", 'utf8'));
    } catch (e) {
      // If the file doesn't exist or is empty, initialize an empty object
      yamlData = {};
    }
  
    // Check if the stockName already exists in the YAML data
    if (yamlData.hasOwnProperty(stockName)) {
      // If it exists, append the new data to the existing data array
      yamlData[stockName].push(data);
    } else {
      // If it doesn't exist, create a new entry with an array containing the data
      yamlData[stockName] = data;
    }
  
    // Write the updated YAML data to the file
    fs.writeFileSync("main-log.yaml", yaml.dump(yamlData));
  }
  

// Function to wait for a specified duration
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function to iterate over stock names, scrape data, and store in YAML
async function main() {
  // Set up Chrome options
  let options = new chrome.Options();
  // Configure Chrome to run in headless mode
  options.addArguments("--headless");

  // Create a WebDriver instance with Chrome
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    const stockNameArray = ["INDUSINDBK", "CIPLA", "LT"];
    for (let stockName of stockNameArray) {
      // Scrape data for the current stock name
      await driver.get(`https://portal.tradebrains.in/stock/${stockName}/consolidated`);

    //   let elements = await driver.wait(until.elementLocated(By.css('*')));
      let elements = await driver.wait(until.elementLocated(By.xpath('//*[@id="my-scroll-layout"]')))
      let divContent = await elements.getText();

      let lines = divContent.split('\n');
      
      let logDataArray = [];
      // Store the scraped data in the YAML file
      for(let i = 0; i < lines.length; i++) {
        let currentLine = lines[i];
        if (currentLine.match("NA")) {
          previousLine = i > 0 ? lines[i - 1] : "";
          let data = {};
          data[previousLine.trim()] = currentLine.trim();
          logDataArray.push(data);
        }
      }
      appendToYAML(stockName, logDataArray);

      // Wait for a specified duration before processing the next stock
      await sleep(5000); // Adjust the duration (in milliseconds) as needed
    }
  } catch(error) {
    console.log("Error Occurred==>:", error);
  } finally {
    // Close the WebDriver session
    await driver.quit();
  }
}

// Call the main function
main();
