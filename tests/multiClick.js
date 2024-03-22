const { it,describe } = require('mocha');
const {By, Builder, assert, until} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');

describe('Multiple Click On the Button', () => { 
    it('Click on the nested button present on table',async()=>{
        const driver = await new Builder().forBrowser('chrome').build()

        try {
            await driver.get("https://portal.tradebrains.in/stock/INDUSINDBK/consolidated")

            let plusBtns = await driver.wait(until.elementsLocated(By.css('button.ant-table-row-expand-icon.ant-table-row-expand-icon-collapsed[aria-label="Expand row"][aria-expanded="false"]')), 5000)

            for (const btn of plusBtns) {
                await btn.click()
            }
        } catch (error) {
            console.log("Error Occurred ==> :", error)
        }
    })
 })