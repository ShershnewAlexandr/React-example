const { toMatchImageSnapshot } = require('jest-image-snapshot');
const constants = require('../constants');
const utils = require('../utils');

jest.setTimeout(600000);

describe('register page', () => {
  let page;
  let email, password, name, registerButton;
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
    await page.waitForSelector('.no-accaunt');
    const noAccauntButton = await page.$('.no-accaunt');
    await noAccauntButton.click();
    await page.waitForSelector('input[name="email"]');
    email = await page.$('input[name="email"]');
    password = await page.$('input[name="password"]');
    name = await page.$('input[name="name"]');
    registerButton = await page.$('button[data-testid="registerButton"]');
  });

  test('should show required error with empty fields', async () => {
    await registerButton.click();
    errors = await page.$$('div.error');
    await expect(errors.length).toBe(3);
  });

  test('should show wrong email error with wrong data', async () => {
    await email.type('wrong email');
    await password.type('some password');
    await name.type('some name');
    await registerButton.click();
    await page.waitForResponse(
      `${constants.rest.baseURL}${constants.rest.register}`,
    );
    errors = await page.$$('div.error');
    await expect(errors.length).toBe(1);
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

  test('should successfully register with valid fields', async () => {
    await utils.clearInput(email);
    await utils.clearInput(password);
    await utils.clearInput(name);
    await email.type(
      `testUser${Math.floor(Math.random() * 100000)}@noveogroup.com`,
    );
    await password.type('password');
    await name.type('test user');
    registerButton = await page.$('button[data-testid="registerButton"]');
    await registerButton.click();
    await page.waitForSelector('input[name="login"]');
    const login = await page.$('input[name="login"]');
    expect(login).toEqual(expect.anything());
  });

  afterAll(async () => {
    await page.close();
  });
});
