const path = require('path');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
const constants = require('../constants');
const utils = require('../utils');

jest.setTimeout(600000);

describe('contacts page', () => {
  let page;
  let firstName, lastName, dateOfBirthday, nextButton, photoButton;
  let errors;

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
    await page.waitForSelector('input[name="firstName"]');
    firstName = await page.$('input[name="firstName"]');
    lastName = await page.$('input[name="lastName"]');
    dateOfBirthday = await page.$('input[name="dateOfBirthday"]');
    nextButton = await page.$('button.button-next');
    photoButton = await page.$('.photoButtonPlus');
  });

  test('should show required error with empty fields', async () => {
    await utils.clearInput(firstName);
    await utils.clearInput(lastName);
    await utils.clearInput(dateOfBirthday);

    await nextButton.click();
    await page.waitFor('div.error', { timeout: 0 });
    errors = await page.$$('div.error');
    await expect(errors.length).toBe(3);
  });

  test('should open file dialog', async () => {
    const [fileChooser] = await Promise.all([
      page.waitForFileChooser({ timeout: 0 }),
      photoButton.click(),
    ]);
    await fileChooser.accept([path.join(__dirname, constants.testImgSrc)]);
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
    await firstName.type('testName');
    await lastName.type('testLastName');
    await dateOfBirthday.type('10191999');
    await nextButton.click();
    await page.waitForSelector('form[data-testid="educationForm"]');
    const form = await page.$('form[data-testid="educationForm"]');
    expect(form).toEqual(expect.anything());
  });

  afterAll(async () => {
    await page.close();
  });
});
