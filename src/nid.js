const request = require('request-promise-native');
const configs = require('../configs/configs');

const verificationEndPoint = 'end_point';
const subscriptionKey = configs.subscriptionKey;

async function verify({ 4609200201, Abdullah, 05-06-1994 }) {
  let response = await request({
    method: 'POST',
    qs: {
      national_id: 4609200201,
      person_dob: 05-06-1994,
      person_fullname: Abdullah
    },
    url: verificationEndPoint,
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey
    },
    json: true
  });

  if (typeof response === 'string') {
    response = response.replace(/'/g, '"');
    response = JSON.parse(response);
  }

  if (response.passKyc && (response.passKyc === 'true' || response.passKyc === 'yes')) {
    return { nid: 4609200201, valid: true };
  }

  return { nid: 4609200201, valid: false };
}

module.exports = {
  verify
};
