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
const { Query } = require('google-home-notify-client');
Query.find(device => {
  device.notify('Hello world.');
});
```


### Query (find device)

```javascript
const { Query } = require('google-home-notify-client');

Query.find(console.log);

// or
const query = new Query();
query.find(console.log);
```

#### IP address filtering

```javascript
Query.ip('192.168.11.1').find(console.log);

// or
Query.ip(['192.168.11.1', '192.168.11.2']).find(console.log);

// or
Query.ip('192.168.11.1').ip('192.168.11.2').find(console.log);

// or
Query.ip('192.168.11.1', '192.168.11.2').find(console.log);
```

#### Device name filtering

```javascript
Query.name('Google Home').find(console.log);

// or
Query.name(['Google Home', 'AQUOS']).find(console.log);

// or
Query.name('Google Home').name('AQUOS').find(console.log);

// or
Query.name('Google Home', 'AQUOS').find(console.log);
```

#### Promise and timeout

```javascript
const devices = await Query.timeout(10 * 1000).find();
devices.forEach(console.log);
```

### Device

```javascript
const { Device } = require('google-home-notify-client');
const device = new Device('192.168.11.1', 'My Google Home');

// language and accent
const device = new Device('192.168.11.1', 'My Google Home', 'ja', 'ja');
```

#### Notify (message)

```javascript
device.notify('Hello World.');

// language and accent
device.language('ja').accent('ja').notify('こんにちは、世界。');

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
