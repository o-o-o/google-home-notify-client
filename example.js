const {Scanner, Device} = require('./google-home-notify-client');

async function main() {
  try {
    console.log('scan devices... (timeout = 5sec)');
    const devices = await Scanner.timeout(5 * 1000).scan();
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

function scan() {
  new Scanner().scan(console.log);

  // or
  // Scanner.scan(console.log);
}
// scan();

function ipFiltering() {
  Scanner.ip('192.168.11.106').scan(console.log);

  // any
  // Scanner.ip('192.168.11.106').ip('192.168.11.109').scan(console.log);
  // or
  // Scanner.ip(['192.168.11.106', '192.168.11.109']).scan(console.log);
}
// ipFiltering();

function deviceNameFiltering() {
  Scanner.name('Google Home Mini').scan(console.log);

  // any
  // Scanner.name('Google Home').name('AQUOS').scan(console.log);
  // or
  // Scanner.name(['Google Home', 'AQUOS']).scan(console.log);
}
// deviceNameFiltering();

async function promiseAndTimeout() {
  const devices = await Scanner.timeout(10 * 1000).scan();
  console.log(devices);
}
// promiseAndTimeout();

function notify() {
  Scanner.name('Google Home').scan(device => {
    device.notify('Hello World.');
    // or
    // device.language('ja').accent('ja').notify('こんにちは、世界。');
  });
}
// notify();

function play() {
  Scanner.name('Google Home').scan(device => {
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