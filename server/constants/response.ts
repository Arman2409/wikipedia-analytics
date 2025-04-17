export enum StatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorMessage {
    FAILED_TO_GET_VIEW = "Failed to get the view",
    SERVER_ERROR = "Something went wrong. Please try again later.",
}