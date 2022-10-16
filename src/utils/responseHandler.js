class ResponseHandler {
  constructor(response) {
    this.data = response.data;
    this.success = response.success;
    this.error = response.error;
    this.status = response.status;
    this.message = response.message;
  }

  isSuccess() {
    return this.data && this.success && this.status == 200;
  }

  isError() {
    return this.status != 200;
  }

  getData() {
    return this.data;
  }

  getError() {
    return this.error;
  }

  getStatus() {
    return this.status;
  }

  getMessage() {
    return this.message;
  }
}

export default ResponseHandler;
