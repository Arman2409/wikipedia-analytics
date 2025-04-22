import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import cron from 'node-cron';

import cache from '../services/cache';
import logger from '../services/logger';
import { isNonEmptyString } from '../utils/typeGuards';
import { validateEnvironmentVariables } from './utils/validation';

const validationResult = validateEnvironmentVariables();

if (validationResult) {

  const { accessKeyId, secretAccessKey, bucketName, region } = { ...validationResult };


  // Configure AWS SDK with environment variables
  const s3 = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  async function uploadToS3(data: string) {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: `archive-${Date.now()}.json`,
      Body: data,
      ContentType: 'application/json',
    });

    try {
      const result = await s3.send(command);
      logger.info(`Uploaded to S3: Bucket="${bucketName}", Key="${command.input.Key}", ETag=${result.ETag}`);
    } catch (err) {
      logger.error('Failed to upload to S3:', err);
    }

  }

  cron.schedule('* * * * *', async () => {
    logger.info('Running archive cron job');
    const cachedData = await cache.getAll(false);

    if (isNonEmptyString(cachedData)) {
      await uploadToS3(cachedData);
    }
  });
}

