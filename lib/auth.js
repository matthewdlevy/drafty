/**
 * Authorization Library.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Replaced by AWS Cognito login approach; See login.js
*/

var dodgercms = dodgercms || {};

dodgercms.auth = (function() {
  'use strict';

  function login(params, callback) {
    return;
  }

  /**
   * Removes the saved data from local storage.
  */
  function logout() {
    return;
  }

  /**
   * Redirect the page.
  */
  function redirect(uri) {
    return;
  }

  return {
    login: login,
    logout: logout,
    redirect: redirect
  };
}());
