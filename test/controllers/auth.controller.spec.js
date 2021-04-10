var assert = require('assert');
var authController = require('../../controllers/auth.controller');

describe('AuthController', function () {
  describe('isAuthorized', function () {
    it('should return false if not authorized', function () {
      assert.strictEqual(false, authController.isAuthorized(['user'], 'admin'));
    });

    it('should return true if authorized', function () {
      assert.strictEqual(true, authController.isAuthorized(['user', 'admin'], 'admin'));
    });
  });
});
