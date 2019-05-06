const multicastDns = require('multicast-dns');
const googletts = require('google-tts-api');
const castv2Cleint = require('castv2-client');

class Query {
  constructor() {
    this._deviceIpAddresses = [];
    this._timeout = 5 * 1000;
    this._deviceNames = [];
  }

  static name(...deviceNames) {
    return new Query().name(deviceNames.reduce((acc, val) => acc.concat(val), []));
  }

  static ip(...deviceIpAddresses) {
    return new Query().ip(deviceIpAddresses.reduce((acc, val) => acc.concat(val), []));
  }

  static timeout(timeout = 5 * 1000) {
    return new Query().timeout(timeout);
  }

  static async find(callback = () => {}) {
    return new Query().find(callback);
  }

  timeout(timeout = 5 * 1000) {
    this._timeout = timeout;
    return this;
  }

  name(...deviceNames) {
    deviceNames.reduce((acc, val) => acc.concat(val), []).forEach(name => this._deviceNames.push(name));
    return this;
  }

  ip(...deviceIpAddresses) {
    deviceIpAddresses.reduce((acc, val) => acc.concat(val), []).forEach(ip => this._deviceIpAddresses.push(ip));
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
  constructor(ip, name = ip, language = 'en', accent = 'en', speechSpeed = 1, speechTimeout = 10 * 1000) {
    this._ip = ip;
    this._name = name;
    this._language = language;
    this._accent = accent;
    this._speechSpeed = speechSpeed; // 0.24 = slow
    this._speechTimeout = speechTimeout;
  }

  async notify(message, callback = () => {}) {
    try {
      const url = await googletts(message, this._language, this._speechSpeed, this._speechTimeout, this._accent);
      return this.play(url, callback);
    } catch (error) {
      throw error;
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
            streamType: 'BUFFERED'
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

  language(language) {
    this._language = language;
    return this;
  }

  accent(accent) {
    this._accent = accent;
    return this;
  }

  speechSpeed(speechSpeed) {
    this._speechSpeed = speechSpeed;
    return this;
  }

  speechTimeout(speechTimeout) {
    this._speechTimeout = speechTimeout;
    return this;
  }
}

module.exports = {
  Query,
  Device
};