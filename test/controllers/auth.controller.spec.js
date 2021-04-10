var assert = require('assert');
var authController = require('../../controllers/auth.controller');
var chai = require('chai');
var expect = require('chai').expect;
var should = require('chai').should();
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');
chai.use(chaiAsPromised);
chai.should();

describe('AuthController', function () {
  beforeEach(function settingUpRoles() {
    console.log('running before each');
    authController.setRoles(['user']);
  });

  // describe.only(..) will run just one test suite
  describe('isAuthorized', function () {
    var user = {};

    beforeEach(function () {
      user = {
        roles: ['user'],
        isAuthorized: function (neededRole) {
          return this.roles.indexOf(neededRole) >= 0;
        }
      };
      sinon.spy(user, 'isAuthorized');
      authController.setUser(user);
    });

    it('should return false if not authorized', function () {
      var isAuth = authController.isAuthorized('admin');
      console.log(user.isAuthorized);
      user.isAuthorized.calledOnce.should.be.true;
      expect(isAuth).to.be.false;
    });

    it('should return true if authorized', function () {
      authController.setRoles(['user', 'admin']);
      let isAuth = authController.isAuthorized('user');
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

  describe('isAuthorizedPromise', function () {
    it('Should return false if not authorized', function () {
      /**
       * the .eventually in chain automatically
       * handles the promise and waits without us doing some sort
       * of `this.timeout(234)` or passing done and calling it done();
       */
      this.timeout(2500);
      return authController.isAuthorizedPromise('admin').should.eventually.be.false;
    });
  });

  describe('getIndex', function () {
    var user = {};
    beforeEach(function () {
      user = {
        roles: ['user'],
        isAuthorized: function (neededRole) {
          return this.roles.indexOf(neededRole) >= 0;
        }
      };
    });

    it.only('should render index', function () {
      var isAuth = sinon.stub(user, 'isAuthorized').throws();
      var req = { user };
      var res = {
        render: sinon.spy()
      };

      authController.getIndex(req, res);
      isAuth.calledOnce.should.be.true;
      res.render.calledOnce.should.be.true;
      res.render.firstCall.args[0].should.equal('error');
    });
  });
});
