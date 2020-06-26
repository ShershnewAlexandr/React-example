const { toMatchImageSnapshot } = require('jest-image-snapshot');
const constants = require('../constants');
const utils = require('../utils');

jest.setTimeout(600000);

describe('education page', () => {
  let page;
  let addButton, nextButton;

  beforeAll(async () => {
    expect.extend({ toMatchImageSnapshot });
    page = await global.browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });
    await utils.gotoWithoutCache(page, constants.testServerUrl);
    await utils.login(page);
    await utils.skipContacts(page);
    await page.waitForSelector('form[data-testid="educationForm"]');
    await page.waitForSelector('button.add-button');
    addButton = await page.$('button.add-button');
    nextButton = await page.$('button.button-next');
  });

  test('should show required error with empty fields', async () => {
    await utils.fillEducationCase(constants.education.emptyFields, page);
    await nextButton.click();
    await page.waitForSelector('div.error', { timeout: 0 });
    const errors = await page.$$('div.error');
    await expect(errors.length).toBe(6);
  });

  test('test screenshots i18n', async () => {
    const screenshots = await utils.i18nextScrenshots(page);
    for (let i = 0; i < screenshots.length; i++) {
      expect(screenshots[i]).toMatchImageSnapshot({
        failureThreshold: '0.01',
        failureThresholdType: 'percent',
      });
    }
  });

  test('should redirect on next page with correct fields', async () => {
    await utils.fillEducationCase(constants.education.correctData, page);
    await nextButton.click();
    const errors = await page.$$('div.error');
    await expect(errors.length).toBe(0);
    await page.waitForSelector('form[data-testid="experienceForm"]');
    const expForm = await page.$('form[data-testid="experienceForm"]');
    expect(expForm).toEqual(expect.anything());
  });

  afterAll(async () => {
    await page.close();
  });
});
