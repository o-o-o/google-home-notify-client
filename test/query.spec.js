const { Query } = require('../google-home-notify-client');

describe('Query', () => {
  it('static name(String)', () => {
    const query = Query.name('NAME');
    expect(query._deviceNames).toEqual(['NAME']);
  });

  it('static name(Array)', () => {
    const query = Query.name(['NAME1', 'NAME2', 'NAME3']);
    expect(query._deviceNames).toEqual(['NAME1', 'NAME2', 'NAME3']);
  });

  it('static name(String, String, String...)', () => {
    const query = Query.name('NAME1', 'NAME2', 'NAME3');
    expect(query._deviceNames).toEqual(['NAME1', 'NAME2', 'NAME3']);
  });

  it('name(String)', () => {
    const query = new Query();
    query.name('NAME');
    expect(query._deviceNames).toEqual(['NAME']);
  });

  it('name(Array)', () => {
    const query = new Query();
    query.name(['NAME1', 'NAME2', 'NAME3']);
    expect(query._deviceNames).toEqual(['NAME1', 'NAME2', 'NAME3']);
  });

  it('name(String, String, String...)', () => {
    const query = new Query();
    query.name('NAME1', 'NAME2', 'NAME3');
    expect(query._deviceNames).toEqual(['NAME1', 'NAME2', 'NAME3']);
  });

  it('static ip(String)', () => {
    const query = Query.ip('192.168.11.1');
    expect(query._deviceIpAddresses).toEqual(['192.168.11.1']);
  });

  it('static ip(Array)', () => {
    const query = Query.ip(['192.168.11.1', '192.168.11.2', '192.168.11.3']);
    expect(query._deviceIpAddresses).toEqual(['192.168.11.1', '192.168.11.2', '192.168.11.3']);
  });

  it('static ip(String, String, String...)', () => {
    const query = Query.ip('192.168.11.1', '192.168.11.2', '192.168.11.3');
    expect(query._deviceIpAddresses).toEqual(['192.168.11.1', '192.168.11.2', '192.168.11.3']);
  });

  it('ip(String)', () => {
    const query = new Query();
    query.ip('192.168.11.1');
    expect(query._deviceIpAddresses).toEqual(['192.168.11.1']);
  });

  it('ip(Array)', () => {
    const query = new Query();
    query.ip(['192.168.11.1', '192.168.11.2', '192.168.11.3']);
    expect(query._deviceIpAddresses).toEqual(['192.168.11.1', '192.168.11.2', '192.168.11.3']);
  });

  it('ip(String, String, String...)', () => {
    const query = new Query();
    query.ip('192.168.11.1', '192.168.11.2', '192.168.11.3');
    expect(query._deviceIpAddresses).toEqual(['192.168.11.1', '192.168.11.2', '192.168.11.3']);
  });

  it('timeout()', () => {
    const query = new Query();
    query.timeout(12345);
    expect(query._timeout).toBe(12345);
  });

  it('static timeout()', () => {
    const query = Query.timeout(12345);
    expect(query._timeout).toBe(12345);
  });
});