const request = require('request-promise-native');

//requests user id
//no input
//returns a promise for the up and its returned as a JSON string
const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(
    `https://api.ipbase.com/v2/info?apikey=6JmItEeSr41qvovE0xrAl9zozeEih5CGOSRDIqMw&ip=${ip}`
  );
};

const fetchISSFlyOverTimes = (body) => {
  const {latitude, longitude} = JSON.parse(body).data.location;
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const {response} = JSON.parse(data);
      return response;
    });
};

module.exports = {nextISSTimesForMyLocation};
