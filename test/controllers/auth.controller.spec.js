var assert = require('assert');
var authController = require('../../controllers/auth.controller');
var expect = require('chai').expect;
let should = require('chai').should();

describe('AuthController', function () {
  beforeEach(function settingUpRoles() {
    console.log('running before each');
    authController.setRoles(['user']);
  });

  // describe.only(..) will run just one test suite
  describe('isAuthorized', function () {
    it('should return false if not authorized', function () {
      var isAuth = authController.isAuthorized('admin');

      expect(isAuth).to.be.false;
    });

    it('should return true if authorized', function () {
      authController.setRoles(['user', 'admin']);
      let isAuth = authController.isAuthorized('admin');
      isAuth.should.be.true;
    });

    it('should not allow a get if not authorized');
    it('should allow get if authorized');
  });

  // describe.skip(..) will skip a test suite when certain test cases break
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
