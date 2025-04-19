export enum StatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorMessage {
    WRONG_GET_VIEWS_QUERY_PARAMS = "Wrong query parameter type for 'period' or 'name'",
    MISSING_GET_VIEWS_QUERY_PARAMS = "Missing query parameter: 'period' or 'name'",
    SERVER_ERROR = "Something went wrong. Please try again later.",
    FAILED_TO_GET_VIEWS = "Failed to retrieve page views",
    RESOURCE_NOT_FOUND = "Resource not found",
}