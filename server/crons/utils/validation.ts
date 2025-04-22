import { EnvironmentErrors } from "../../constants/environment";
import logger from "../../services/logger";
import type { ValidateArchiveCronEnvResult } from "../../types/crons";

export const validateEnvironmentVariables = (): ValidateArchiveCronEnvResult|void => {

    // Get environment variables
    const region = process.env.AWS_REGION || 'us-east-1';
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";
    const bucketName = process.env.AWS_S3_BUCKET_NAME || "";

    if (!accessKeyId || !secretAccessKey || !bucketName) {
        if (!accessKeyId) {
            logger.error('AWS_ACCESS_KEY_ID environment variable is not defined');
        }
        if (!secretAccessKey) {
            logger.error('AWS_SECRET_ACCESS_KEY environment variable is not defined');
        }
        if (!bucketName) {
            logger.error('AWS_S3_BUCKET_NAME environment variable is not defined');
        }

        logger.warn(EnvironmentErrors.MISSING_AWS_ENV_VARIABLE);

        return;
    }

    return {
        region,
        accessKeyId,
        secretAccessKey,
        bucketName
    }
};