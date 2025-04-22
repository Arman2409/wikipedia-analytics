export enum environmentErrors {
    MISSING_REQUIRED_ENV_VARIABLE = "Required environment variables not defined, exiting...",
    MISSING_REDIS_ENV_VARIABLE = "REDIS_URL required environment variable is not defined, exiting...",
}

export enum awsEnvMessages {
    MISSING_AWS_ENV_FOR_ARCHIVE_CRON = "Some of AWS environment variables not defined, archive cron job will not run",
    MISSING_ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID environment variable is not defined",
    MISSING_SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY environment variable is not defined",
    MISSING_BUCKET_NAME = "AWS_S3_BUCKET_NAME environment variable is not defined",
}