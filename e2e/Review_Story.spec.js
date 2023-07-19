/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const assert = require('assert');
require('dotenv/config');

Feature('Post Review');

Scenario('post a valid review and delete it', async ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('.card a', 5);
  I.seeElement('.card a');

  const storyToReview = locate('.card a').at(5);
  const storyTitle = await I.grabTextFrom(storyToReview);
  I.click(storyToReview);

  I.waitForElement('h2', 10);
  const storyTitleInside = await I.grabTextFrom('h2');
  assert.strictEqual(storyTitle, storyTitleInside);

  I.seeElement('#inputName');
  I.seeElement('#inputReview');
  I.seeElement('.btn');

  const reviewNameDummy = process.env.TESTING_USER_NAME;
  const reviewContentDummy = process.env.TESTING_USER_REVIEW;

  I.fillField('#inputName', reviewNameDummy);
  I.fillField('#inputReview', reviewContentDummy);
  I.wait(3);
  I.click('.btn');

  I.waitForElement('#swal2-title', 10);
  const popUpMessage = await I.grabTextFrom('#swal2-title');
  assert.strictEqual(popUpMessage, 'Berhasil!');
  I.click('.swal2-confirm');

  I.seeElement('.review-name');
  I.seeElement('.review-body');

  const visibleReviewName = await I.grabTextFrom(locate('.review-name').last());
  const visibleReviewContent = await I.grabTextFrom(locate('.review-body p').last());

  assert.strictEqual(visibleReviewName, reviewNameDummy);
  assert.strictEqual(visibleReviewContent, reviewContentDummy);

  I.amOnPage('/#/login-page');
  I.seeElement('#username-admin');
  I.seeElement('#pass-admin');
  const adminUsername = process.env.TESTING_ADMIN_USERNAME;
  const adminPassword = process.env.TESTING_ADMIN_PASSWORD;
  I.fillField('#username-admin', adminUsername);
  I.fillField('#pass-admin', adminPassword);
  I.click('#submit-admin');
  I.wait(5);
  I.seeElement('#review-nav');
  I.click('#review-nav');
  I.wait(5);

  const visibleReviewName2 = await I.grabTextFrom(locate('#review-name').last());
  const visibleReviewContent2 = await I.grabTextFrom(locate('#review-isi').last());

  assert.strictEqual(visibleReviewName2, reviewNameDummy);
  assert.strictEqual(visibleReviewContent2, reviewContentDummy);

  const deleteButton = locate('.btn-delete').last();
  I.click(deleteButton);
  I.wait(4);
  I.click('.swal2-confirm');
  I.wait(7);

  const visibleReviewName3 = await I.grabTextFrom(locate('#review-name').last());
  const visibleReviewContent3 = await I.grabTextFrom(locate('#review-isi').last());

  assert.notStrictEqual(visibleReviewName3, reviewNameDummy);
  assert.notStrictEqual(visibleReviewContent3, reviewContentDummy);
});

// Scenario('Delete Review', async ({ I }) => {
//   I.amOnPage('/#/login-page');
//   I.seeElement('#username-admin');
//   I.seeElement('#pass-admin');
//   const adminUsername = process.env.TESTING_ADMIN_USERNAME;
//   const adminPassword = process.env.TESTING_ADMIN_PASSWORD;
//   I.fillField('#username-admin', adminUsername);
//   I.fillField('#pass-admin', adminPassword);
//   I.click('#submit-admin');
//   I.wait(5);
//   I.seeElement('#review-nav');
//   I.click('#review-nav');
//   I.wait(5);
//   const reviewNameDummy = process.env.TESTING_USER_NAME;
//   const reviewContentDummy = process.env.TESTING_USER_REVIEW;
//   const visibleReviewName = await I.grabTextFrom(locate('#review-name').last());
//   const visibleReviewContent = await I.grabTextFrom(locate('#review-isi').last());

//   assert.strictEqual(visibleReviewName, reviewNameDummy);
//   assert.strictEqual(visibleReviewContent, reviewContentDummy);
// });
