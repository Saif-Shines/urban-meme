var assert = require('assert');
var authController = require('../../controllers/auth.controller');

describe('AuthController', function () {
  beforeEach(function settingUpRoles() {
    console.log('running before each');
    authController.setRoles(['user']);
  });

  describe.only('isAuthorized', function () {
    it('should return false if not authorized', function () {
      assert.strictEqual(false, authController.isAuthorized('admin'));
    });

    it('should return true if authorized', function () {
      authController.setRoles(['user', 'admin']);
      assert.strictEqual(true, authController.isAuthorized('admin'));
    });

    it('should not allow a get if not authorized');
    it('should allow get if authorized');
  });

  describe('isAuthorizedAsync', function () {
    it('Should return false if not authorized', function (done) {
      this.timeout(2500);
      authController.isAuthorizedAsync('admin', function (isAuth) {
        assert.strictEqual(false, isAuth);
        done();
      });
    });

    it('Should return true if authorized', function (done) {
      this.timeout(2500);
      authController.setRoles(['admin', 'user']);
      authController.isAuthorizedAsync('user', function (isAuth) {
        assert.strictEqual(true, isAuth);
        done();
      });
    });
  });
});
