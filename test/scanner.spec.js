const { Scanner } = require('../google-home-notify-client');

describe('Scanner', () => {
  it('static name(String)', () => {
    const scanner = Scanner.name('NAME');
    expect(scanner._deviceNames).toEqual(['NAME']);
  });

  it('static name(Array)', () => {
    const scanner = Scanner.name(['NAME1', 'NAME2', 'NAME3']);
    expect(scanner._deviceNames).toEqual(['NAME1', 'NAME2', 'NAME3']);
  });

  it('static name(String, String, String...)', () => {
    const scanner = Scanner.name('NAME1', 'NAME2', 'NAME3');
    expect(scanner._deviceNames).toEqual(['NAME1', 'NAME2', 'NAME3']);
  });

  it('name(String)', () => {
    const scanner = new Scanner();
    scanner.name('NAME');
    expect(scanner._deviceNames).toEqual(['NAME']);
  });

  it('name(Array)', () => {
    const scanner = new Scanner();
    scanner.name(['NAME1', 'NAME2', 'NAME3']);
    expect(scanner._deviceNames).toEqual(['NAME1', 'NAME2', 'NAME3']);
  });

  it('name(String, String, String...)', () => {
    const scanner = new Scanner();
    scanner.name('NAME1', 'NAME2', 'NAME3');
    expect(scanner._deviceNames).toEqual(['NAME1', 'NAME2', 'NAME3']);
  });

  it('static ip(String)', () => {
    const scanner = Scanner.ip('192.168.11.1');
    expect(scanner._deviceIpAddresses).toEqual(['192.168.11.1']);
  });

  it('static ip(Array)', () => {
    const scanner = Scanner.ip(['192.168.11.1', '192.168.11.2', '192.168.11.3']);
    expect(scanner._deviceIpAddresses).toEqual(['192.168.11.1', '192.168.11.2', '192.168.11.3']);
  });

  it('static ip(String, String, String...)', () => {
    const scanner = Scanner.ip('192.168.11.1', '192.168.11.2', '192.168.11.3');
    expect(scanner._deviceIpAddresses).toEqual(['192.168.11.1', '192.168.11.2', '192.168.11.3']);
  });

  it('ip(String)', () => {
    const scanner = new Scanner();
    scanner.ip('192.168.11.1');
    expect(scanner._deviceIpAddresses).toEqual(['192.168.11.1']);
  });

  it('ip(Array)', () => {
    const scanner = new Scanner();
    scanner.ip(['192.168.11.1', '192.168.11.2', '192.168.11.3']);
    expect(scanner._deviceIpAddresses).toEqual(['192.168.11.1', '192.168.11.2', '192.168.11.3']);
  });

  it('ip(String, String, String...)', () => {
    const scanner = new Scanner();
    scanner.ip('192.168.11.1', '192.168.11.2', '192.168.11.3');
    expect(scanner._deviceIpAddresses).toEqual(['192.168.11.1', '192.168.11.2', '192.168.11.3']);
  });

  it('timeout()', () => {
    const scanner = new Scanner();
    scanner.timeout(12345);
    expect(scanner._timeout).toBe(12345);
  });

  it('static timeout()', () => {
    const scanner = Scanner.timeout(12345);
    expect(scanner._timeout).toBe(12345);
  });
});