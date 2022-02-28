const { chromium, firefox, webkit } = require("playwright");
const fsExtra = require("fs-extra");
const { allure } = require("allure-mocha/runtime");
require("mocha-allure-reporter");

async function login_to_deel(page, username, password, mode = true) {
  try {
    try {
      await page.goto(`https://app.deel.training/login`, {
        waitUntil: "networkidle",
        timeout: 60000,
      });
    } catch (error) {
      console.log(`Error While Waiitng for Login page ${error}`);
    }
    if (mode) {
      await page.type('[name="email"]', username, {
        delay: 50,
      });
      await page.type('[name="password"]', password, { delay: 20 });
      await Promise.all([
        page.waitForNavigation(),
        page.click(`[theme="primary"]`),
      ]);
    }
  } catch (error) {
    throw new Error(error);
  }
}
describe("Deel Contract", async () => {
  let page,
    browser = null;
  before(async function () {
    try {
      browser = await chromium.launch({
        headless: false,
        slowMo: 10,
        timeout: 60000 * 2,
        defaultViewport: null,
        viewport: null,
        setViewportSize: null,
        args: [
          "--start-maximized",
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--use-gl=egl",
          "--disable-extensions",
          "--disable-dev-shm-usage",
        ],
      });
      browser = await browser.newContext({ viewport: null });
      page = await browser.newPage();
      try {
        fsExtra.removeSync("./../allure-results");
      } catch (error) {
        console.log(`Error While Deleting the directory ${error}`);
      }
    } catch (error) {
      console.log(`Error at Before All Hook ${error}`);
    }
  });
  after(async function () {
    try {
      //await browser.close()
      //process.exit(0);
    } catch (error) {
      console.log("Error WHile Browser Close:->" + error);
    }
  });
  afterEach(async function () {
    console.log(
      "Test Finished: " +
        this.currentTest.title +
        " --> " +
        this.currentTest.state
    );
  });
  /**
   *
   */
  it("Create Fixed Type Contract", async () => {
    try {
      await login_to_deel(
        page,
        `20243557@cs.hacettepe.edu.tr`,
        `Tester.518`,
        true
      );
      await page.click(`//p[text()="Create A Contract"]`);
      await page.waitForLoadState("domcontentloaded");
      await page.click(`//h4[text()="Fixed Rate"]`);
      await page.waitForLoadState("domcontentloaded");
      //Filling the Contract information
      await page.type(
        `//label[text()="Contract name"]/following-sibling::input`,
        `My Contract Name`,
        { delay: 50 }
      );
      //await page.waitForTimeout(1000);
      await page.click(
        `[data-qa="contractor-tax-residence"]>div>div>div[data-qa="contractor-tax-residence"]>div>div[class*="select__value-container"]`
      );
      //await page.waitForTimeout(2000);
      await page.click(
        `//label[contains(text(),"tax residence")]/parent::div/following-sibling::div//div[text()="United States"]`
      );
      await page.click(
        `[data-qa="contractor-tax-residence-province"]>div>div[class*="select__value-container"]`
      );
      await page.click(
        `//label[contains(text(),"state")]/parent::div/following-sibling::div//div[text()="Colorado"]`
      );

      await page.type(
        `[name="jobTitle"]`,
        `Software Development Engineer in Test`,
        { delay: 20 }
      );
      await page.click(
        `[data-qa="selector-seniority-level"]>div>div>div>div>div[class*="select__value-container"]`
      );
      await page.click(
        `//label[contains(text(),"Seniority level")]/parent::div/following-sibling::div//div[text()="Lead (Individual Contributor Level 4)"]`
      );
      await page.type(`[name="scope"]`, `My Test Contract Scope`);

      //Chossing Date
      await page.click(`//div[contains(text(),"Today")]`);
      //Get the current Date
      const currentDay = await page.$$eval(
        '//button[contains(@class,"now")]/preceding-sibling::button',
        (buttons) => buttons.length
      );
      await page.click(
        `(//button[contains(@class,"now")]/preceding-sibling::button)[${currentDay}]`
      );
      await page.click(`[data-qa="next"]`);
      await page.waitForLoadState("domcontentloaded");
      //2nd Page
      await page.click(
        `[data-qa="currency-select"]>div>div[class*="select__value-container"]`
      );
      await page.click(
        `//div[contains(text(),"USD")]/parent::div/parent::div/parent::div/following-sibling::div//div[contains(text(),"GBP")]`
      );

      await page.type(`[name="rate"]`, `1000`);
      await page.click(`[data-qa="change-default-value"]~label>div`);
      await page.click(`[data-qa="next"]`);
      await page.waitForLoadState("domcontentloaded");
      await page.click(`[data-qa="next"]`);
      await page.waitForLoadState("domcontentloaded");
      await page.click(`[data-qa="next"]`);
      await page.waitForLoadState("domcontentloaded");
      await page.click(`[data-qa="create-contract"]`);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForNavigation({ waitUntil: "domcontentloaded" });
      await page.click(`[data-qa="review-sign"]`);
      await page.waitForLoadState("domcontentloaded");
      await page.click(`[data-qa="agree-sign"]`);
      await page.waitForSelector(`//div[text()="TT"]`);
      await page.waitForTimeout(3000);
      await page.click(`[data-qa="invite-contractor"]`);
      await page.waitForLoadState("domcontentloaded");
      await page.type(
        `[class="deel-ui__input-component__input"]`,
        `test@gmail.com`
      );
      await page.waitForLoadState("domcontentloaded");
      await page.click(`[data-qa="send-invite"]`);
      
      
    } catch (error) {
      console.log(error);
      await page.emit("error", new Error(error));
    }
  });
  /**
   *
   */
  it("Create Fixed Type Contract-2-Clone Second Part", async () => {
    //allure.severity(critical);
    try {
      await login_to_deel(
        page,
        `20243557@cs.hacettepe.edu.tr`,
        `Tester.518`,
        false
      );
      await page.click(`//p[text()="Create A Contract"]`);
      await page.waitForLoadState("domcontentloaded");
      await page.click(`//h4[text()="Fixed Rate"]`);
      await page.waitForLoadState("domcontentloaded");
      //Filling the Contract information
      await page.type(
        `//label[text()="Contract name"]/following-sibling::input`,
        `My Contract Name`,
        { delay: 50 }
      );
      //await page.waitForTimeout(1000);
      await page.click(
        `[data-qa="contractor-tax-residence"]>div>div>div[data-qa="contractor-tax-residence"]>div>div[class*="select__value-container"]`
      );
      //await page.waitForTimeout(2000);
      await page.click(
        `//label[contains(text(),"tax residence")]/parent::div/following-sibling::div//div[text()="United States"]`
      );
      await page.click(
        `[data-qa="contractor-tax-residence-province"]>div>div[class*="select__value-container"]`
      );
      await page.click(
        `//label[contains(text(),"state")]/parent::div/following-sibling::div//div[text()="Colorado"]`
      );

      await page.type(
        `[name="jobTitle"]`,
        `Software Development Engineer in Test`,
        { delay: 20 }
      );
      await page.click(
        `[data-qa="selector-seniority-level"]>div>div>div>div>div[class*="select__value-container"]`
      );
      await page.click(
        `//label[contains(text(),"Seniority level")]/parent::div/following-sibling::div//div[text()="Lead (Individual Contributor Level 4)"]`
      );
      await page.type(`[name="scope"]`, `My Test Contract Scope`);

      //Chossing Date
      await page.click(`//div[contains(text(),"Today")]`);
      //Get the current Date
      const currentDay = await page.$$eval(
        '//button[contains(@class,"now")]/preceding-sibling::button',
        (buttons) => buttons.length
      );
      await page.click(
        `(//button[contains(@class,"now")]/preceding-sibling::button)[${currentDay}]`
      );
      await page.click(`[data-qa="next"]`);
      await page.waitForLoadState("domcontentloaded");
      //2nd Page
      await page.click(
        `[data-qa="currency-select"]>div>div[class*="select__value-container"]`
      );
      await page.click(
        `//div[contains(text(),"USD")]/parent::div/parent::div/parent::div/following-sibling::div//div[contains(text(),"GBP")]`
      );

      await page.type(`[name="rate"]`, `1000`);
      await page.click(`[data-qa="change-default-value"]~label>div`);
      await page.click(`[data-qa="next"]`);
      await page.waitForLoadState("domcontentloaded");
      await page.click(`[data-qa="next"]`);
      await page.waitForLoadState("domcontentloaded");
      await page.click(`[data-qa="next"]`);
      await page.waitForLoadState("domcontentloaded");
      await page.click(`[data-qa="create-contract"]`);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForNavigation({ waitUntil: "domcontentloaded" });
      await page.click(`[data-qa="review-sign"]`);
      await page.waitForLoadState("domcontentloaded");
      await page.click(`[data-qa="agree-sign"]`);
      await page.waitForSelector(`//div[text()="TT"]`);
      await page.waitForTimeout(3000);
      await page.click(`[data-qa="invite-contractor"]`);
      await page.waitForLoadState("domcontentloaded");
      await page.type(
        `[class="deel-ui__input-component__input"]`,
        `test@gmail.com`
      );
      await page.waitForLoadState("domcontentloaded");
      await page.click(`[data-qa="send-invite"]`);
    } catch (error) {
      console.log(error);
      await page.emit("error", new Error(error));
    }
  });
});
