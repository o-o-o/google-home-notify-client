# Google Home Notify Client

[![GitHub version](https://badge.fury.io/gh/o-o-o%2Fgoogle-home-notify-client.svg)](https://badge.fury.io/gh/o-o-o%2Fgoogle-home-notify-client) [![Build Status](https://travis-ci.org/o-o-o/google-home-notify-client.svg?branch=master)](https://travis-ci.org/o-o-o/google-home-notify-client) [![npm version](https://badge.fury.io/js/google-home-notify-client.svg)](https://badge.fury.io/js/google-home-notify-client) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

Send notifications to Google Home

source: https://github.com/o-o-o/google-home-notify-client  
npm: https://www.npmjs.com/package/google-home-notify-client


## Installation

```sh
npm install google-home-notify-client
```

## Usage

```javascript
const { Scanner } = require('google-home-notify-client');
Scanner.name('Google Home').scan(device => {
  device.notify('Hello world.');
});
```

### Scanner (Scan local network)

```javascript
const { Scanner } = require('google-home-notify-client');

Scanner.scan(console.log);

// or
const scanner = new Scanner();
scanner.scan(console.log);
```

#### IP address filtering

```javascript
Scanner.ip('192.168.11.1').scan(console.log);

// or
Scanner.ip(['192.168.11.1', '192.168.11.2']).scan(console.log);

// or
Scanner.ip('192.168.11.1').ip('192.168.11.2').scan(console.log);

// or
Scanner.ip('192.168.11.1', '192.168.11.2').scan(console.log);
```

#### Device name filtering

```javascript
Scanner.name('Google Home').scan(console.log);

// or
Scanner.name(['Google Home', 'AQUOS']).scan(console.log);

// or
Scanner.name('Google Home').name('AQUOS').scan(console.log);

// or
Scanner.name('Google Home', 'AQUOS').scan(console.log);
```

#### Promise and timeout

```javascript
const devices = await Scanner.timeout(10 * 1000).scan();
devices.forEach(console.log);
```

### Device

```javascript
const { Device } = require('google-home-notify-client');
const device = new Device('192.168.11.1', 'My Google Home');

// language and accent
const device = new Device('192.168.11.1', 'My Google Home', 'ja', 'ja');
// language and accent and speechSpeec and speechTimeout
const device = new Device('192.168.11.1', 'My Google Home', 'ja', 'ja', 1, 10 * 1000);
```

#### Notify (message)

```javascript
device.notify('Hello World.');

// language and accent
device.language('ja').accent('ja').notify('こんにちは、世界。');
// speech speed (0.24 = slow), speech timeout
device.speechSpeed(0.24).speechTimeout(10 * 1000).notify('Slow Slow Slow.');

// use callback
device.notify('Hello World.', (error) => {
  if (error) {
    console.error(error)
  }
});

// use promise
try {
  await device.notify('Hello World.');
} catch (error) {
  console.error(error);
}
```

#### Play (mp3)

```javascript
device.play('https://example.org/example.mp3');

// use callback
device.play('https://example.org/example.mp3', (error) => {
  if (error) {
    console.error(error)
  }
});

// use promise
try {
  await device.play('https://example.org/example.mp3');
} catch (error) {
  console.error(error);
}
```
