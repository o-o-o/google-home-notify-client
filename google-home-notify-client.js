const multicastDns = require('multicast-dns');
const googletts = require('google-tts-api');
const castv2Cleint = require('castv2-client');

class Query {
  constructor() {
    this._deviceIpAddresses = [];
    this._timeout = 5 * 1000;
    this._deviceNames = [];
  }

  static name(deviceName) {
    return new Query().name(deviceName);
  }

  static timeout(timeout = 5 * 1000) {
    return new Query().timeout(timeout);
  }

  static ip(deviceIpAddress) {
    return new Query().ip(deviceIpAddress);
  }

  static async find(callback = () => {}) {
    return new Query().find(callback);
  }

  timeout(timeout = 5 * 1000) {
    this._timeout = timeout;
    return this;
  }

  name(deviceName) {
    if (typeof deviceName === 'string') {
      this._deviceNames.push(deviceName);
    } else if (deviceName.forEach) {
      deviceName.forEach(name => this._deviceNames.push(name));
    }
    return this;
  }

  ip(deviceIpAddress) {
    console.log(typeof deviceIpAddress)
    if (typeof deviceIpAddress === 'string') {
      console.log('wwww')
      this._deviceIpAddresses.push(deviceIpAddress);
    } else if (deviceIpAddress.forEach) {
      deviceIpAddress.forEach(ip => this._deviceIpAddresses.push(ip));
    }

    return this;
  }

  async find(callback = () => {}) {
    return new Promise((resolve, reject) => {
      const mdns = multicastDns();
      const devices = [];
      mdns.on('response', (res) => {
        let name = '';
        let ip = '';
        for (const additional of res.additionals) {
            if (additional.type == 'TXT') name = additional.name;
            if (additional.type == 'A') ip = additional.data;
        }
        if (!name) {
          return;
        }
        if (this._deviceIpAddresses.length && !this._deviceIpAddresses.find(deviceIpAddress => ip === deviceIpAddress)) {
          return;
        }
        if (this._deviceNames.length && !this._deviceNames.find(deviceName => name.startsWith(deviceName.replace(/ /g, '-')))) {
          return;
        }
        const device = new Device(ip, name);
        devices.push(device);
        callback(device);
      });

      mdns.query({
        questions: [{
            name: '_googlecast._tcp.local',
            type: 'PTR'
        }]
      });

      setTimeout(() => {
        mdns.destroy();
        resolve(devices);
      }, this._timeout);
    });
  }
}

class Device {
  constructor(ip, name = ip, language = 'en', accent = 'en') {
    this._ip = ip;
    this._name = name;
    this._language = language;
    this._accent = accent;
  }

  async notify(message, callback = () => {}) {
    try {
      const url = await googletts(message, this._language, 1, 1000, this._accent);
      return this.play(url, callback);
    } catch (error) {
      reject(error);
    }
  }

  async play(url, callback = () => {}) {
    return new Promise(async (resolve, reject) => {
      const client = new castv2Cleint.Client();
      client.connect(this._ip, () => {
        client.launch(castv2Cleint.DefaultMediaReceiver, (error, player) => {
          if (error) {
            callback(error);
            reject(error);
            return;
          }
          player.load({
            contentId: url,
            contentType: 'audio/mp3',
            streamType: 'BUFFERED' // or LIVE
          }, {
            autoplay: true
          }, (error, status) => {
            client.close();
            if(error) {
              callback(error, status);
              reject(error);
              return;
            }
            callback(null);
            resolve(null);
          });
        });
      });
      client.on('error', error => {
        client.close();
        callback(error);
        reject(error);
      });
    });
  }

  get name() {
    return this._name;
  }

  get ip() {
    return this._ip;
  }

  get language() {
    return this._language;
  }

  get accent() {
    return this.accent;
  }

  language(language) {
    this._language = language;
    return this;
  }

  accent(accent) {
    this._accent = accent;
    return this;
  }
}

module.exports = {
  Query,
  Device
};