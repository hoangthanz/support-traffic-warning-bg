export class ResponseApi<T> {
  code: string;
  result: number;
  message: string;
  data: T;
  pagingResponse?: any;
  constructor(result: number = -1, message: string = '', data: any = null, code = '') {
    this.result = result;
    this.message = message;
    this.data = data;
    this.code = code;
  }
}
