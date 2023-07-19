/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const assert = require('assert');
require('dotenv/config');

Feature('Send & Delete Message');

Before(({ I }) => {
  I.amOnPage('/#/tentang-kami');
});

Scenario('send a message and delete it', async ({ I }) => {
  I.wait(2);
  I.scrollTo(0, 4500);
  I.seeElement('#smiling-form');
  I.seeElement('#inputNama');
  I.seeElement('#inputEmail');
  I.seeElement('#inputPesan');
  I.seeElement('#buttonMsg');

  const userNameDummy = process.env.TESTING_USER_NAME;
  const userEmailDummy = process.env.TESTING_USER_EMAIL;
  const userMsgDummy = process.env.TESTING_USER_PESAN;

  I.fillField('#inputNama', userNameDummy);
  I.fillField('#inputEmail', userEmailDummy);
  I.fillField('#inputPesan', userMsgDummy);
  I.wait(3);
  I.click('#buttonMsg');
  I.seeElement('.btn-loading');
  I.wait(7);
  I.seeElement('.alert-success');

  I.amOnPage('/#/login-page');
  I.seeElement('#username-admin');
  I.seeElement('#pass-admin');
  const adminUsername = process.env.TESTING_ADMIN_USERNAME;
  const adminPassword = process.env.TESTING_ADMIN_PASSWORD;
  I.fillField('#username-admin', adminUsername);
  I.fillField('#pass-admin', adminPassword);
  I.click('#submit-admin');
  I.wait(5);
  I.waitForElement('#msg-nav', 5);
  I.click('#msg-nav');
  I.wait(5);
  const visibleMsgName = await I.grabTextFrom(locate('#msg-name').last());
  const visibleMsgEmail = await I.grabTextFrom(locate('#msg-email').last());
  const visibleMsgContent = await I.grabTextFrom(locate('#msg-isi').last());

  assert.strictEqual(visibleMsgName, userNameDummy);
  assert.strictEqual(visibleMsgEmail, userEmailDummy);
  assert.strictEqual(visibleMsgContent, userMsgDummy);

  const deleteButton = locate('.btn-delete').last();
  I.click(deleteButton);
  I.wait(4);
  I.click('.swal2-confirm');
  I.wait(7);

  const visibleMsgName2 = await I.grabTextFrom(locate('#msg-name').last());
  const visibleMsgEmail2 = await I.grabTextFrom(locate('#msg-email').last());
  const visibleMsgContent2 = await I.grabTextFrom(locate('#msg-isi').last());

  assert.notStrictEqual(visibleMsgName2, userNameDummy);
  assert.notStrictEqual(visibleMsgEmail2, userEmailDummy);
  assert.notStrictEqual(visibleMsgContent2, userMsgDummy);
});
