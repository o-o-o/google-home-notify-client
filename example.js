const {Query, Device} = require('./google-home-notify-client');

async function main() {
  try {
    console.log('find devices... (timeout = 5sec)');
    const devices = await Query.timeout(5 * 1000).find();
    console.log(`devices = ${devices.map(device => device.name)}`);
    devices.forEach(device => {
      console.log(`notify (device = ${device.name})`);
      device.notify('Hello World.');
    });
  } catch (error) {
    console.error(error);
  }
}
main();

function find() {
  new Query().find(console.log);

  // or
  // Query.find(console.log);
}
// find();

function ipFiltering() {
  Query.ip('192.168.11.106').find(console.log);

  // any
  // Query.ip('192.168.11.106').ip('192.168.11.109').find(console.log);
  // or
  // Query.ip(['192.168.11.106', '192.168.11.109']).find(console.log);
}
// ipFiltering();

function deviceNameFiltering() {
  Query.name('Google Home Mini').find(console.log);

  // any
  // Query.name('Google Home').name('AQUOS').find(console.log);
  // or
  // Query.name(['Google Home', 'AQUOS']).find(console.log);
}
// deviceNameFiltering();

async function promiseAndTimeout() {
  const devices = await Query.timeout(10 * 1000).find();
  console.log(devices);
}
// promiseAndTimeout();

function notify() {
  Query.name('Google Home').find(device => {
    device.notify('Hello World.');
    // or
    // device.language('ja').accent('ja').notify('こんにちは、世界。');
  });
}
// notify();

function play() {
  Query.name('Google Home').find(device => {
    // mp3 url
    device.play('https://dls.nhk-sc.or.jp/products/detail/290/sampledownload');
  });
}
// play();

function direct() {
  // static ip.
  const device = new Device('192.168.11.106', 'My Google Home');

  // or
  // const device = new Device('192.168.11.106', 'My Google Home', 'ja', 'ja');

  console.log(device.ip, device.name);
  device.notify('Hello World.');

  // or
  // device.language('ja');
  // device.accent('ja');
  // device.notify('こんにちは、世界。');
}
// direct();