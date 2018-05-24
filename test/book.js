process.env.NODE_ENV = "test";


const mongoose = require('mongoose');
const Book     = require('../models/book');

// setup testing environment
const chai = require('chai');
// require so that we can actually make the requests to the server
const chaiHttp = require('chai-http');
const server = require('../app');

// This is the type of assertion we are using
// Could also use assert or expect, up to us (or our bosses)
const should = chai.should();

// allow us to make http requests to our server
chai.use(chaiHttp)

describe('Books API', () => {
  
  // we are emptying the database before each test
  beforeEach((done) => {
    Book.remove({}, (err) => {
      done();
    });
  });

  describe('/Get Book', () => {
    
    //first assertion
    it('it should GET all the books', (done) => {
      chai.request(server)
      // get request
      .get('/book')
      // response from the server
      .end((err, res) => {
        // the response should have a 200 status => it was a good request
        res.should.have.status(200);
        // res.body SHOULD be an an array of objects
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);

        // when you're done actually testing
        done();
      })
    })

  }) // end of get

}) // end of Books API
