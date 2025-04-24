import { DEFAULT_AWS_REGION } from "../../constants/configs";
import { AwsMessages } from "../../constants/services";
import logger from "../logger";
import type { ArchiveCronValidationResult } from "../../types/crons";


export const validateAwsEnvironmentVariables = (): ArchiveCronValidationResult|void => {

    // Get environment variables
    const region = process.env.AWS_REGION || DEFAULT_AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";
    const bucketName = process.env.AWS_S3_BUCKET_NAME || "";

    if (!accessKeyId || !secretAccessKey || !bucketName) {
        if (!accessKeyId) {
            logger.warn(AwsMessages.MISSING_ACCESS_KEY_ID);
        }
        if (!secretAccessKey) {
            logger.warn(AwsMessages.MISSING_SECRET_ACCESS_KEY);
        }
        if (!bucketName) {
            logger.warn(AwsMessages.MISSING_BUCKET_NAME);
        }
        
        // Warn that cron job won't run
        logger.warn(AwsMessages.MISSING_AWS_ENV_FOR_ARCHIVE_CRON);

        return;
    }

    return {
        region,
        accessKeyId,
        secretAccessKey,
        bucketName
    }
};