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

  }) // end of get test

  describe('/Post Book', () => {
    // our database shouldn't update without compeleted parameters
    it('it should not POST a book without all required Parameters', (done) => {
      // This is the object we are sending to the server for testing 
      // This should NOT work because we don't have all of the required params
      const book = {
        title: 'Cats Cradle',
        author: 'Kurty',
        year: 1950
      }

      chai.request(server)
      .post('/book')
      .send(book)
      .end((err, res) => {
        // this tells us that the test itself ran successfully 
        // not the actual result of the test. 
        res.should.have.status(200);
        res.body.should.be.a('object');
        // check the errors property
        res.body.should.have.property('errors');
        // go into the error object
        // check pages property of the error
        res.body.errors.should.have.property('pages')
        // check the pages property for error kind
        res.body.errors.pages.should.have.property('kind').eql('required');

        done();
        
      })
      
    })
    
  }) // end of post test

}) // end of Books API
