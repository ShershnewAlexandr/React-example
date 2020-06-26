const { toMatchImageSnapshot } = require('jest-image-snapshot');
const constants = require('../constants');
const utils = require('../utils');

jest.setTimeout(600000);

describe('languages page', () => {
  let page;
  let nextButton, inputs;

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
    await utils.skipEducation(page);
    await utils.skipExperience(page);
    await page.waitForSelector('form[data-testid="languagesForm"]');
    await page.waitForSelector('input');
    nextButton = await page.$('button.button-next');
    inputs = await page.$$('input');
  });

  test('should show required error with empty fields', async () => {
    for (let i = 0; i < inputs.length; i++) {
      await utils.clearInput(inputs[i]);
    }
    let errors;
    await nextButton.click();

    await page.waitFor('div.error');
    errors = await page.$$('div.error');
    await expect(errors.length).toBe(inputs.length);
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
    for (let i = 0; i < inputs.length; i++) {
      await inputs[i].type(String(Math.round(Math.random() * 4 + 1)));
    }
    await nextButton.click();
    await page.waitForSelector('div[data-testid="edit-card-button"]');
    const editButton = await page.$('div[data-testid="edit-card-button"]');
    expect(editButton).toEqual(expect.anything());
  });

  afterAll(async () => {
    await page.close();
  });
});
