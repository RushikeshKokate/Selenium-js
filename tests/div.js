const { Builder, By, until, assert } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

describe("Click on div dropdown menu", () => {
  it("Click on Div", async () => {
    let options = new chrome.Options();
    options.addArguments("headless");

    let driver = new Builder().forBrowser("chrome").build();

    try {
      await driver.get(
        "https://portal.tradebrains.in/stock/INDUSINDBK/consolidated"
      );

      // Find all elements with the class name 'ant-collapse-expand-icon'
      let divEle = await driver.wait(
        until.elementsLocated(By.css(".ant-collapse-expand-icon")),
        5000
      );

      // Iterate over each element and add onclick listener
      for (const element of divEle) {
        await element.click(); // Perform click action to simulate onclick event
        // Your additional logic for handling click event goes here
        console.log("Element clicked:", divEle);
      }

      // You can continue with your code after clicking all elements
      console.log("All elements clicked successfully.");

      // This step is optional: Click the elements using Selenium after adding event listeners
      let elements = await driver.findElements(
        By.className("ant-collapse-expand-icon")
      );
      for (const element of elements) {
        await element.click();
      }

      // You can continue with your code after clicking the elements
      console.log("All elements clicked successfully.");
    } catch (error) {
      console.log("Error Occurred ==> : ", error);
    } finally {
      //
      //console.log("Finally Block Called")
    }
  });
});
