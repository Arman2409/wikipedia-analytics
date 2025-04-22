export enum EnvironmentErrors {
    MISSING_REQUIRED_ENV_VARIABLE = "Required environment variables not provided",
    MISSING_AWS_ENV_VARIABLE = "Some of AWS environment variables not provided, archive cron job will not run",
    MISSING_REDIS_REQUIRED_ENV_VARIABLE = "REDIS_URL required environment variable is not provided, exiting...",
}