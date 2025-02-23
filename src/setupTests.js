import '@testing-library/jest-dom';

global.Response = class Response {
  constructor(body, init) {
    this.body = body;
    this.status = init.status;
    this.statusText = init.statusText || '';
    this.headers = init.headers || {};
  }

  async json() {
    return JSON.parse(this.body);
  }
};