/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Story');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked story', ({ I }) => {
  I.wait(3);
  I.see('Tidak ada data ditampilkan!', '.not-found-heading');
});

Scenario('liking one story', async ({ I }) => {
  I.wait(3);
  I.see('Tidak ada data ditampilkan!', '.not-found-heading');

  I.amOnPage('/');

  I.waitForElement('.card a');
  I.seeElement('.card a');

  const firstStory = locate('.card a').first();
  const firstStoryTitle = await I.grabTextFrom(firstStory);
  I.click(firstStory);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.waitForElement('#swal2-title');
  const popUpMessage = await I.grabTextFrom('#swal2-title');
  assert.strictEqual(popUpMessage, 'Liked!');
  I.click('.swal2-confirm');

  I.amOnPage('/#/favorite');
  I.waitForElement('.card');
  I.seeElement('.card');
  const favoriteStoryTitle = await I.grabTextFrom('.card a');

  assert.strictEqual(firstStoryTitle, favoriteStoryTitle);
});

Scenario('unlike one story', async ({ I }) => {
  I.wait(3);
  I.see('Tidak ada data ditampilkan!', '.not-found-heading');

  I.amOnPage('/');

  I.waitForElement('.card a');
  I.seeElement('.card a');

  const firstStory = locate('.card a').first();
  I.click(firstStory);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.waitForElement('#swal2-title');
  const popUpLike = await I.grabTextFrom('#swal2-title');
  assert.strictEqual(popUpLike, 'Liked!');
  I.click('.swal2-confirm');

  I.amOnPage('/#/favorite');
  I.waitForElement('.card a');
  I.seeElement('.card a');
  I.click(firstStory);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.waitForElement('#swal2-title');
  const popUpUnlike = await I.grabTextFrom('#swal2-title');
  assert.strictEqual(popUpUnlike, 'Unliked!');
  I.click('.swal2-confirm');

  I.amOnPage('/#/favorite');
  I.wait(3);
  I.dontSee('.card');
  I.see('Tidak ada data ditampilkan!', '.not-found-heading');
});
