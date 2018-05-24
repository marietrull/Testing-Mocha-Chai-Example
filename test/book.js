process.env.NODE_ENV = "test";


const mongoose = require('mongoose');
const Book     = require('../models/book');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

// allow us to make http requests to our server
chai.use(chaiHttp)
