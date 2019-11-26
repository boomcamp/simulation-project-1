#!/usr/bin/env node

const faker = require('faker');
const request = require('request');

const password = faker.internet.password();

const mockUser = {
  email: faker.internet.email(),
  password,
  plainPassword: password,
  username: faker.internet.userName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  active: faker.random.boolean(),
};

request(
  {
    url: 'http://localhost:3000/register',
    method: 'POST',
    json: mockUser,
  },
  function(err, res) {
    if (err) {
      console.error(err);
    }
  }
);
