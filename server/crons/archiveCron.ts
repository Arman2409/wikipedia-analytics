import cron from 'node-cron';

import { CRON_JOB_FREQUENCY } from '../constants/configs';
import { ArchiveCronMessages } from '../constants/crons';
import { isNonEmptyString } from '../utils/typeGuards';
import cache from '../services/cache';
import logger from '../services/logger';
import aws from '../services/aws';


// Set up the cron job if only the AWS was initialized properly 
if (aws.getIsValidated()) {

  cron.schedule(CRON_JOB_FREQUENCY, async () => {
    try {
      const cachedData = await cache.getAll(false);
  
      if (isNonEmptyString(cachedData)) {
        await aws.uploadJsonToS3(cachedData);

        await cache.clear();
      }
    } catch (err) {
      logger.error(ArchiveCronMessages.ARCHIVE_CRON_FAILED, err);
    }
   
  })

  logger.info(ArchiveCronMessages.ARCHIVE_CRON_CONFIGURED);
} else {
   logger.warn(ArchiveCronMessages.ARCHIVE_CRON_NOT_RUNNING)
}
