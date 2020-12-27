'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const { assert } = chai;

chai.use(chaiHTTP);
chai.config.truncateThreshold = 0;

describe('Given some data parameter, the test should pass', () => {
    it('Test for simple data', (done) => {
        chai.request(server)
        .post('/')
        .send({
            firstName: 'Gabon',
            lastName: 'Latoz',
        })
        .end((err, res) => {
            if (err) {
                throw err
            } else {
                assert.equal(res.status, 200)
                assert.equal(res.body.success, true)
                done()
            }
        })
    });
});