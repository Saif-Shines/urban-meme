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

  describe('isAuthorizedAsync', function () {
    it('Should return false if not authorized', function (done) {
      this.timeout(2500);
      authController.isAuthorizedAsync(['admin'], 'user', function (isAuth) {
        assert.strictEqual(false, isAuth);
        done();
      });
    });

    it('Should return true if authorized', function (done) {
      this.timeout(2500);
      authController.isAuthorizedAsync(['admin', 'user'], 'user', function (isAuth) {
        assert.strictEqual(true, isAuth);
        done();
      });
    });
  });
});
