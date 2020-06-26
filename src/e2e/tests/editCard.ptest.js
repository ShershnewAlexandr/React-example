const { toMatchImageSnapshot } = require('jest-image-snapshot');
const constants = require('../constants');
const utils = require('../utils');

jest.setTimeout(600000);

describe('editCard page', () => {
  let page;
  let cards,
    editButton,
    likeButton,
    title,
    content,
    cancelFormButton,
    editFormButton;

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
    await utils.skipLanguages(page);
    await page.waitForSelector('div[data-testid="edit-card-button"]', {
      timeout: 0,
    });
    cards = await page.$$('.card-container');
    editButton = await cards[0].$('div[data-testid="edit-card-button"]');
    likeButton = await cards[0].$('div[data-testid="like-card-button"]');
  });

  test('should switch className on likeAction', async () => {
    const likeIcon = await likeButton.$('i[data-testid="like-icon"');
    const classesBeforeClick = await likeIcon.getProperty('className');
    likeIcon.click();
    const classesAfterClick = await likeIcon.getProperty('className');
    expect(classesBeforeClick).not.toBe(classesAfterClick);
  });

  test('should show required error with empty fields', async () => {
    await editButton.click();
    await page.waitForSelector('input[name="title"]', { timeout: 0 });
    title = await page.$('input[name="title"]');
    content = await page.$('textarea[name="content"]');
    editFormButton = await page.$('.editCardWrapper-saveButton');
    await utils.clearInput(title);
    await utils.clearInput(content);
    await editFormButton.click();
    await page.waitFor('div.error');
    const errors = await page.$$('div.error');
    await expect(errors.length).toBe(2);
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

  test('should not have errors with valid fields', async () => {
    await title.type('testCard');
    await content.type('test content for card');
    await editFormButton.click();
    const errors = await page.$$('div.error');
    await expect(errors.length).toBe(0);
    await page.waitForSelector('div[data-testid="edit-card-button"]');
    const editButton = await page.$('div[data-testid="edit-card-button"]');
    expect(editButton).toEqual(expect.anything());
  });

  test('should redirect back to cardList', async () => {
    await page.waitForSelector('.card-container', { timeout: 0 });
    cards = await page.$$('.card-container');
    editButton = await cards[0].$('div[data-testid="edit-card-button"]');
    await editButton.click();
    await page.waitForSelector('.editCardWrapper-CancelButton');
    cancelFormButton = await page.$('.editCardWrapper-CancelButton');
    await cancelFormButton.click();
    await page.waitForSelector('div[data-testid="edit-card-button"]');
    await expect(page.url()).toEqual(`${constants.testServerUrl}/cardlist`);
  });

  afterAll(async () => {
    await page.close();
  });
});
