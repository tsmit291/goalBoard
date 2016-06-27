var request = require('supertest');
var db = require('../config/database');
var app = require('../app')
var expect = require('chai').expect

var goalCollection = db.get('goal');

describe('goal', function () {
  beforeEach(function (done) {
    goalCollection.remove({}, function (err) {
      if (err) done(err);
      done();
    });
  });

  after(function (done) {
  goalCollection.remove({}, function (err) {
    if (err) done(err);
    done();
    });
  });
});

describe('GET /goals', function() {
  it('responds with 200', function(done) {
    request(app).get('/goals').expect(200,done)
  })
});

describe('GET /goals',function(){
  it('response with json containing goals', function(done){
    var goal = {
      goalText: 'eat a hotdog'
    };

    goalCollection.insert(goal, function(err, data){
      if(err) done(err);
    request(app).get('/goals').expect(function(response){
      expect(response.body[0].goalText).to.equal(goal.goalText)
    }).end(done)
    });
  });
});

describe('POST /goals', function() {
  it('response with 200', function(done) {
    request(app).post('/goals').expect(200,done)
  });
  it('adds json containing goals to database', function(done){
    var goal = {
      goalText: 'eat a sandwich'
    };
    request(app).post('/goals').send(goal).expect(function (response) {
      expect(response.body.goalText).to.equal(goal.goalText)
    }).end(done);
  });
});
