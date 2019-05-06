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
});