const constants = require('./constants');

const gotoWithoutCache = async (page, URL) => {
  await page.goto(URL);
  await page.evaluate(() => {
    localStorage.clear();
  });
  await page.goto(URL);
};

const clearInput = async input => {
  await input.click({ clickCount: 3 });
  await input.press('Backspace');
};

const i18nextScrenshots = async page => {
  const supportedLanguages = constants.supportedLanguages;
  const screenshots = [];
  for (let i = 0; i < supportedLanguages.length; i++) {
    const langButton = await page.$(
      `div.i18nHeader-icon-container[data-lang="${supportedLanguages[i].code}"]`,
    );
    await langButton.click();
    await page.waitForFunction(
      lang => {
        console.log(localStorage.getItem('i18n'));
        return localStorage.getItem('i18n') === lang;
      },
      {},
      supportedLanguages[i].code,
    );
    const image = await page.screenshot();
    screenshots.push(image);
  }
  return screenshots;
};

const fillEducationBlock = async function(blockData, block) {
  const inputs = await block.$$('input');
  await inputs[0].type(blockData.schoolName);
  await inputs[1].type(blockData.startYear);
  await inputs[2].type(blockData.endYear);
  if (blockData.now) {
    await inputs[3].click();
  }
};

const fillEducationCase = async function(testData, page) {
  const addButton = await page.$('button.add-button');
  let dropButton;
  while ((dropButton = await page.$('button.drop-button'))) {
    await dropButton.click();
  }

  for (let i = 0; i < testData.blocks.length; i++) {
    await addButton.click();
  }

  const blocks = await page.$$('[data-testid="education-form-block"]');
  for (let i = 0; i < testData.blocks.length; i++) {
    await fillEducationBlock(testData.blocks[i], blocks[i]);
  }
};

const fillExperienceBlock = async function(blockData, block) {
  const inputs = await block.$$('input');
  await inputs[0].type(blockData.companyName);
  await inputs[1].type(blockData.profile);
  await inputs[2].type(blockData.startYear);
  await inputs[3].type(blockData.endYear);
  if (blockData.now) {
    await inputs[4].click();
  }
};

const fillExperienceCase = async function(testData, page) {
  const addButton = await page.$('button.add-button');
  let dropButton;
  while ((dropButton = await page.$('button.drop-button'))) {
    await dropButton.click();
  }

  for (let i = 0; i < testData.blocks.length; i++) {
    await addButton.click();
  }

  const blocks = await page.$$('[data-testid="experience-form-block"]');
  for (let i = 0; i < testData.blocks.length; i++) {
    await fillExperienceBlock(testData.blocks[i], blocks[i]);
  }
};

const login = async page => {
  await page.waitForSelector('input[name="login"]');
  const login = await page.$('input[name="login"]');
  const password = await page.$('input[name="password"]');
  const rememberMe = await page.$('input[name="rememberMe"]');
  const loginBut = await page.$('button.button');
  await rememberMe.tap();
  await login.type(constants.testUser.login);
  await password.type(constants.testUser.password);
  await loginBut.click();
};

const skipContacts = async page => {
  await page.waitForSelector('input[name="firstName"]');
  const firstName = await page.$('input[name="firstName"]');
  const lastName = await page.$('input[name="lastName"]');
  const dateOfBirthday = await page.$('input[name="dateOfBirthday"]');
  const nextButton = await page.$('button.button-next');

  await clearInput(firstName);
  await clearInput(lastName);
  await clearInput(dateOfBirthday);

  await firstName.type('testName');
  await lastName.type('testLastName');
  await dateOfBirthday.type('10191999');

  await nextButton.click();
};

const skipEducation = async page => {
  await page.waitForSelector('form[data-testid="educationForm"]');
  await page.waitForSelector('button.add-button');
  const nextButton = await page.$('button.button-next');

  await fillEducationCase(constants.education.skip, page);
  await nextButton.click();
};

const skipExperience = async page => {
  await page.waitForSelector('form[data-testid="experienceForm"]');
  await page.waitForSelector('button.add-button');
  const nextButton = await page.$('button.button-next');

  await fillExperienceCase(constants.education.skip, page);
  await nextButton.click();
};

const skipLanguages = async page => {
  await page.waitForSelector('form[data-testid="languagesForm"]');
  const nextButton = await page.$('button.button-next');
  const inputs = await page.$$('input');

  for (let i = 0; i < inputs.length; i++) {
    await clearInput(inputs[i]);
  }
  for (let i = 0; i < inputs.length; i++) {
    await inputs[i].type(String(Math.round(Math.random() * 4 + 1)));
  }

  await nextButton.click();
};

module.exports = {
  clearInput,
  i18nextScrenshots,
  fillEducationCase,
  fillExperienceCase,
  login,
  skipContacts,
  skipEducation,
  skipExperience,
  skipLanguages,
  gotoWithoutCache,
};
