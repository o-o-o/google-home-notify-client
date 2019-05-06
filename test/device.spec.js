const { Device } = require('../google-home-notify-client');

describe('Device', () => {
  it('constructor(String, String)', () => {
    const device = new Device('IP_ADDRESS', 'NAME');
    expect(device._ip).toBe('IP_ADDRESS');
    expect(device._name).toBe('NAME');
    expect(device._language).toBe('en');
    expect(device._accent).toBe('en');
  });

  it('constructor(String, String, String)', () => {
    const device = new Device('IP_ADDRESS', 'NAME', 'LANGUAGE');
    expect(device._ip).toBe('IP_ADDRESS');
    expect(device._name).toBe('NAME');
    expect(device._language).toBe('LANGUAGE');
    expect(device._accent).toBe('en');
  });

  it('constructor(String, String, String, String)', () => {
    const device = new Device('IP_ADDRESS', 'NAME', 'LANGUAGE', 'ACCENT');
    expect(device._ip).toBe('IP_ADDRESS');
    expect(device._name).toBe('NAME');
    expect(device._language).toBe('LANGUAGE');
    expect(device._accent).toBe('ACCENT');
  });

  it('constructor(String, String, String, String, Number, Number)', () => {
    const device = new Device('IP_ADDRESS', 'NAME', 'LANGUAGE', 'ACCENT', 777, 999);
    expect(device._ip).toBe('IP_ADDRESS');
    expect(device._name).toBe('NAME');
    expect(device._language).toBe('LANGUAGE');
    expect(device._accent).toBe('ACCENT');
    expect(device._speechSpeed).toBe(777);
    expect(device._speechTimeout).toBe(999);
  });

  it('language(String)', () => {
    const device = new Device('IP_ADDRESS', 'NAME');
    device.language('LANGUAGE')
    expect(device._language).toBe('LANGUAGE');
  });

  it('accent(String)', () => {
    const device = new Device('IP_ADDRESS', 'NAME');
    device.accent('ACCENT')
    expect(device._accent).toBe('ACCENT');
  });

  it('speechSpeed(Number)', () => {
    const device = new Device('IP_ADDRESS', 'NAME');
    device.speechSpeed(0.24)
    expect(device._speechSpeed).toBe(0.24);
  });

  it('speechTimeout(Number)', () => {
    const device = new Device('IP_ADDRESS', 'NAME');
    device.speechTimeout(10 * 1000)
    expect(device._speechTimeout).toBe(10000);
  });
});