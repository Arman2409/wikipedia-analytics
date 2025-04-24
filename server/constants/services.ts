export enum AwsMessages {
    MISSING_AWS_ENV_FOR_ARCHIVE_CRON = "Some of AWS environment variables not defined, archive cron job will not run",
    MISSING_ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID environment variable is not defined",
    MISSING_SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY environment variable is not defined",
    MISSING_BUCKET_NAME = "AWS_S3_BUCKET_NAME environment variable is not defined",
    FAILED_UPLOAD_TO_S3 = 'Failed to upload to S3:',
}

export enum RequestMessages {
    FAILED_TO_RETRIEVE_DATA = "Error while fetching data",
}

export enum RedisMessages {
    CONNECTED = "Connected to Redis",
    CONNECTION_FAILED = "Failed to connect to Redis",
    FAILED_TO_CREATE_REDIS_CLIENT = "Failed to create Redis client",
    NOT_CONNECTED = "Redis not connected!",
    SET_FAILED = "Failed to set value in Redis",
    GET_ALL_FAILED = "Failed to get all values from Redis",
    CLEAR_FAILED = "Failed to clear Redis",
    CACHE_CLEARED = "Cache cleared",
    DISCONNECT_FAILED = "Failed to disconnect",
    GET_FAILED = "Failed to get value from Redis",
    DELETE_FAILED = "Failed to delete value from Redis",
}