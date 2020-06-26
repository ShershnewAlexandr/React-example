const { toMatchImageSnapshot } = require('jest-image-snapshot');
const constants = require('../constants');
const utils = require('../utils');

jest.setTimeout(600000);

describe('newCard page', () => {
  let page;
  let title, content, addButton, cancelButton;

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
    await page.waitForSelector('a.link[href="/newcard"]');
    const addCardButton = await page.$('a.link[href="/newcard"]');
    await addCardButton.click();
    await page.waitForSelector('input[name="title"]');
    title = await page.$('input[name="title"]');
    content = await page.$('textarea[name="content"]');
    addButton = await page.$('.newCardWrapper-addButton');
    cancelButton = await page.$('.editCardWrapper-CancelButton');
  });

  test('should find addCardForm elements', async () => {
    await expect(title).toEqual(expect.anything());
    await expect(content).toEqual(expect.anything());
    await expect(addButton).toEqual(expect.anything());
    await expect(cancelButton).toEqual(expect.anything());
  });

  test('should show required error with empty fields', async () => {
    await utils.clearInput(title);
    await utils.clearInput(content);
    await addButton.click();
    await page.waitFor('div.error');
    const errors = await page.$$('div.error');
    await expect(errors.length).toBe(2);
  });

  test('should successfully add card with valid fields and redirect to cardList', async () => {
    await title.type('testCard');
    await content.type('test content for card');
    await addButton.click();
    const errors = await page.$$('div.error');
    await expect(errors.length).toBe(0);
    await page.waitForSelector('a.link[href="/newcard"]');
    const newCardButton = await page.$('a.link[href="/newcard"]');
    expect(newCardButton).toEqual(expect.anything());
  });

  afterAll(async () => {
    await page.close();
  });
});
