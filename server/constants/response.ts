export enum StatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorMessage {
    SERVER_ERROR = "Something went wrong. Please try again later.",
    ROUTE_NOT_FOUND = "Route not found",
    RESOURCE_NOT_FOUND = "Resource not found",
}

export enum GetViewsErrorMessages {
    WRONG_GET_VIEWS_QUERY_PARAMS = "Wrong query parameter type for 'period' or 'name'",
    MISSING_GET_VIEWS_QUERY_PARAMS = "Missing query parameter: 'period' or 'name'",
    FAILED_TO_GET_VIEWS = "Failed to retrieve page views",
}


export enum GetSuggestionsErrorMessages {
    WRONG_GET_SUGGESTIONS_QUERY_PARAMS = "Wrong query parameter type for 'page'",
    MISSING_GET_SUGGESTION_QUERY_PARAMS = "Missing 'page' query parameter",
    FAILED_TO_GET_SUGGESTIONS = "Failed to retrieve page views",
}