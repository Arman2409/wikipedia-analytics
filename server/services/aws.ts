import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import { AwsMessages } from '../constants/services';
import logger from './logger';
import { validateAwsEnvironmentVariables } from './utils/validation';

interface AwsService {
    uploadJsonToS3(data: string): Promise<void>;
    getIsValidated(): boolean;
}

class AwsService {
    static instance: AwsService | undefined;
    private s3Client: S3Client = {} as S3Client;
    private bucketName: string = "";
    private validated: boolean = false;

    private constructor() {

        // Validate environment variables 
        const validationResult = validateAwsEnvironmentVariables();

        if (validationResult) {
            const { bucketName, region, accessKeyId, secretAccessKey } = { ...validationResult }

            this.bucketName = bucketName;
            this.validated = true;

            this.s3Client = new S3Client({
                region,
                credentials: {
                    accessKeyId,
                    secretAccessKey,
                },
            });

            logger.info("AWS S3 client initialized");
        } else {
            logger.warn("AWS S3 client initialization failed");
        }
    }

    static getInstance(): AwsService {
        if (!this.instance) {
            this.instance = new AwsService();
        }

        return this.instance;
    }

    getIsValidated(): boolean {
        return this.validated;
    }

    async uploadJsonToS3(data: string) {
        try {
            const bucketName = this.bucketName;

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

            const command = new PutObjectCommand({
                Bucket: bucketName,
                Key: `archive-${timestamp}.json`,
                ContentType: 'application/json',
                Body: data,
            });

            // Upload JSON file to AWS S3 
            const result = await this.s3Client.send(command);

            logger.info(`Uploaded to S3: Bucket="${bucketName}", Key="${command.input.Key}", ETag=${result.ETag}`);
        } catch (err) {
            logger.error(AwsMessages.FAILED_UPLOAD_TO_S3, err);
        }

    }
}

export default AwsService.getInstance();
