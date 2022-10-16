class ApiHandler {
  constructor() {
    this.data = null;
    this.onStart = () => {};
    this.onRequest = () => {};
    this.onResponse = () => {};
    this.onError = () => {};
    this.onFinally = () => {};
  }

  setData(data) {
    this.data = data;
    return this;
  }

  setOnStart(onStart) {
    this.onStart = onStart;
    return this;
  }

  setOnRequest(onRequest) {
    this.onRequest = onRequest;
    return this;
  }

  setOnResponse(onResponse) {
    this.onResponse = onResponse;
    return this;
  }

  setOnError(onError) {
    this.onError = onError;
    return this;
  }

  setOnFinally(onFinally) {
    this.onFinally = onFinally;
    return this;
  }

  async execute() {
    try {
      this.onStart();
      const data = await this.onRequest();
      this.onResponse(data);
    } catch {
      console.log(this.onError());
      this.onError();
    } finally {
      this.onFinally();
    }
  }
}

export default ApiHandler;
