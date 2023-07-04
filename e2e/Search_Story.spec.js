/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Search Story');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('search story', async ({ I }) => {
  I.wait(3);

  const storyTitles = [];
  const maxStories = await I.grabNumberOfVisibleElements('.card');

  for (let i = 1; i <= maxStories; i++) {
    I.waitForElement('.card a');
    storyTitles.push((await I.grabTextFrom(locate('.card a').at(i))).toLowerCase().replace(/\s/g, ''));
  }

  I.seeElement('#search-input');

  const searchQuery = storyTitles[1].substring(6, 9);
  const foundStories = storyTitles.filter((title) => title.indexOf(searchQuery.toLowerCase().replace(/\s/g, '')) !== -1);

  I.fillField('#search-input', searchQuery);
  I.wait(3);
  I.pressKey('Enter');

  I.wait(10);
  const visibleFoundStories = await I.grabNumberOfVisibleElements('.card');

  assert.strictEqual(foundStories.length, visibleFoundStories);

  foundStories.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.card a').at(index + 1));
    assert.strictEqual(title, visibleTitle);
  });
});
