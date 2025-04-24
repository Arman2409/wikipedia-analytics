import { createClient, type RedisClientType } from "redis";

import { DEFAULT_TTL_IN_MINUTES } from "../constants/configs";
import { RedisMessages } from "../constants/services";
import { EnvironmentErrors } from "../constants/environment";
import { safeParse } from "../utils/helpers";
import { isNonEmptyString } from "../utils/typeGuards";
import logger from "./logger";

interface RedisClient {
    get<T = unknown>(key: string, prefix?: string, identificator?: string | number): Promise<T | void>
    set(key: string, value: unknown, prefix?: string, identificator?: string, ttlInMinutes?: number): Promise<void>;
    getAll(asJson: boolean): Promise<Record<string, unknown> | string>;
    clear(): Promise<void>;
    remove(key: string, prefix?: string, identificator?: string): Promise<void>;
    disconnect(): Promise<void>;
}

class RedisClient {
    static instance: RedisClient | undefined;
    private redisClient: RedisClientType | undefined;

    private constructor() {
        if (!this.redisClient) {
            try {
                const redisUrl = process.env.REDIS_URL;

                if (!isNonEmptyString(redisUrl)) {
                    logger.error(EnvironmentErrors.MISSING_REDIS_ENV_VARIABLE);
                    process.exit(1);
                }

                const redisClient = createClient({
                    url: redisUrl,
                })

                // Connect to Redis 
                redisClient.connect()
                    .then(() => {
                        logger.info(RedisMessages.CONNECTED);
                    })
                    .catch(err => {
                        logger.error(RedisMessages.CONNECTION_FAILED, err);
                        process.exit(1);
                    })

                this.redisClient = redisClient as RedisClientType;
            } catch (err) {
                logger.error(RedisMessages.FAILED_TO_CREATE_REDIS_CLIENT, err);
            }
        }
    }

    static getInstance(): RedisClient {
        if (!this.instance) {
            this.instance = new RedisClient();
        }

        return this.instance;
    }

    private getStorageKey(
        key: string,
        prefix?: string,
        identificator?: string | number
    ): string {
        return `${prefix ? `${prefix}_` : ''}${key}${identificator ? `_${identificator}` : ''}`;
    }

    async set(
        key: string,
        value: unknown,
        prefix?: string,
        identificator?: string | number,
        ttlInMinutes: number = DEFAULT_TTL_IN_MINUTES
    ): Promise<void> {
        if (!this.redisClient) {
            logger.warn(RedisMessages.NOT_CONNECTED);
            return;
        }

        const storageKey = this.getStorageKey(key, prefix, identificator);

        try {
            await this.redisClient.set(
                storageKey,
                JSON.stringify(value),
                {
                    EX: ttlInMinutes * 60,
                }
            );
        } catch (err) {
            logger.error(RedisMessages.SET_FAILED, err);
        }
    }

    async get<T = unknown>(
        key: string,
        prefix?: string,
        identificator?: string | number,
    ): Promise<T | void> {
        if (!this.redisClient) {
            logger.warn(RedisMessages.NOT_CONNECTED);
            return;
        }

        try {
            const storageKey = this.getStorageKey(key, prefix, identificator);

            const result = await this.redisClient.get(storageKey);
            if (!result) return;

            return safeParse(result);
        } catch (err) {
            logger.error(RedisMessages.GET_FAILED, err);
        }
    }

    async getAll(
        asJson: boolean = true
    ): Promise<Record<string, unknown> | string> {
        if (!this.redisClient) {
            logger.warn(RedisMessages.NOT_CONNECTED);
            return asJson ? {} : "";
        }

        try {

            // Get all the keys
            const keys = await this.redisClient.keys('*');

            if (!keys.length) {
                return asJson ? {} : "";
            }

            // Get all the data by keys 
            const values = await this.redisClient.mGet(keys);


            if (asJson) {
                const result: Record<string, unknown> = {};

                keys.forEach((key, index) => {
                    if (!isNonEmptyString(key)) return;
                    const raw = values[index];

                    if (raw !== null) {
                        result[key] = safeParse(String(raw));
                    }
                });

                return result;
            } else {
                // Construct a string JSON 
                let stringJson: string = "{";

                keys.forEach((key, index) => {
                    if (!isNonEmptyString(key)) return;

                    const value = values[index];

                    if (value !== null) {
                        stringJson += `\"${key}\":${value},`;
                    }
                });

                stringJson = stringJson.slice(0, -1) + "}";

                return stringJson;
            }
        } catch (err) {
            logger.error(RedisMessages.GET_ALL_FAILED, err);
            return {};
        }
    }

    async remove(
        key: string,
        prefix?: string,
        identificator?: string,
    ): Promise<void> {
        if (!this.redisClient) {
            logger.warn(RedisMessages.NOT_CONNECTED);
            return;
        }

        const storageKey = this.getStorageKey(key, prefix, identificator);

        try {
            await this.redisClient.del(storageKey);
        } catch (err) {
            logger.error(RedisMessages.DELETE_FAILED, err);
        }
    }


    async clear(): Promise<void> {
        if (!this.redisClient) {
            logger.warn(RedisMessages.NOT_CONNECTED);
            return;
        }

        try {
            await this.redisClient.flushAll();
            logger.info(RedisMessages.CACHE_CLEARED);
        } catch (err) {
            logger.error(RedisMessages.CLEAR_FAILED, err);
        }
    }

    async disconnect(): Promise<void> {
        if (this.redisClient) {
            try {
                await this.redisClient.disconnect();
            } catch (err) {
                logger.warn(RedisMessages.DISCONNECT_FAILED);
            }
        } else {
            logger.warn(RedisMessages.NOT_CONNECTED);
        }
    }
}

export default RedisClient.getInstance();