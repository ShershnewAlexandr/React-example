const { toMatchImageSnapshot } = require('jest-image-snapshot');
const constants = require('../constants');
const utils = require('../utils');

jest.setTimeout(600000);

describe('login page', () => {
  let page;
  let login, password, rememberMe, loginBut;
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
    await page.waitForSelector('input[name="login"]');
    login = await page.$('input[name="login"]');
    password = await page.$('input[name="password"]');
    rememberMe = await page.$('input[name="rememberMe"]');
    loginBut = await page.$('button.button');
  });

  test('should show required error with empty fields', async () => {
    await loginBut.click();
    errors = await page.$$('div.error');
    await expect(errors.length).toBe(2);
  });

  test('should show wrong login or password error with wrong data', async () => {
    await login.type('wrong login');
    await password.type('wrong password');
    await loginBut.click();
    await page.waitForResponse(
      `${constants.rest.baseURL}${constants.rest.login}`,
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

  test('should successfully login with valid fields', async () => {
    await utils.clearInput(login);
    await utils.clearInput(password);
    await rememberMe.tap();
    await login.type(constants.testUser.login);
    await password.type(constants.testUser.password);
    await loginBut.click();
    await page.waitForSelector('input[name="firstName"]');
    const firstName = await page.$('input[name="firstName"]');
    expect(firstName).toEqual(expect.anything());
  });

  afterAll(async () => {
    await page.close();
  });
});
