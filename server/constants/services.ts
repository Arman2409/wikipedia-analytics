export enum awsEnvMessages {
    MISSING_AWS_ENV_FOR_ARCHIVE_CRON = "Some of AWS environment variables not defined, archive cron job will not run",
    MISSING_ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID environment variable is not defined",
    MISSING_SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY environment variable is not defined",
    MISSING_BUCKET_NAME = "AWS_S3_BUCKET_NAME environment variable is not defined",
}

export enum awsErrorsMessages {
    FAILED_UPLOAD_TO_S3 = 'Failed to upload to S3:',
}

export enum RequestMessages {
    FAILED_TO_RETRIEVE_DATA = "Error while fetching data",
}