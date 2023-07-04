/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Search Favorite Story');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('search favorite story', async ({ I }) => {
  I.wait(3);
  I.see('Tidak ada data ditampilkan!', '.not-found-heading');

  I.amOnPage('/');

  I.waitForElement('.card');
  I.seeElement('.card');

  const storyTitles = [];

  for (let i = 1; i <= 3; i++) {
    I.waitForElement('.card a');
    I.click(locate('.card a').at(i));

    I.waitForElement('#likeButton');
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.waitForElement('#swal2-title');
    const popUpLike = await I.grabTextFrom('#swal2-title');
    assert.strictEqual(popUpLike, 'Liked!');
    I.click('.swal2-confirm');

    I.waitForElement('h2');
    storyTitles.push((await I.grabTextFrom(locate('h2'))).toLowerCase().replace(/\s/g, ''));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.waitForElement('#search-input');
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
