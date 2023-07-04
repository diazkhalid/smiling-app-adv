/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Post Review');

Scenario('post a valid review', async ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('.card a');
  I.seeElement('.card a');

  const storyToReview = locate('.card a').at(5);
  const storyTitle = await I.grabTextFrom(storyToReview);
  I.click(storyToReview);

  I.waitForElement('h2');
  const storyTitleInside = await I.grabTextFrom('h2');
  assert.strictEqual(storyTitle, storyTitleInside);

  I.seeElement('#inputName');
  I.seeElement('#inputReview');
  I.seeElement('.btn');

  const reviewNameDummy = 'Ester';
  const reviewContentDummy = 'Cerita berkualitas!';

  I.fillField('#inputName', reviewNameDummy);
  I.fillField('#inputReview', reviewContentDummy);
  I.wait(3);
  I.click('.btn');

  I.waitForElement('#swal2-title');
  const popUpMessage = await I.grabTextFrom('#swal2-title');
  assert.strictEqual(popUpMessage, 'Berhasil!');
  I.click('.swal2-confirm');

  I.seeElement('.review-name');
  I.seeElement('.review-body');

  const visibleReviewName = await I.grabTextFrom(locate('.review-name').last());
  const visibleReviewContent = await I.grabTextFrom(locate('.review-body p').last());

  assert.strictEqual(visibleReviewName, reviewNameDummy);
  assert.strictEqual(visibleReviewContent, reviewContentDummy);
});
