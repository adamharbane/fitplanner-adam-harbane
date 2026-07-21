export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export class ApiResponseBuilder {
  static success<T>(data: T): ApiSuccessResponse<T> {
    return { success: true, data };
  }

  static error(message: string): ApiErrorResponse {
    return { success: false, message };
  }
}
