import redis, { type RedisClientType } from "redis";

import { DEFAULT_TTL_IN_MINUTES } from "../configs/configs";
import { safeParse } from "../utils/helpers";

interface RedisClient {
    set(key: string, value: unknown, identificator?: string, ttlInMinutes?: number): Promise<void>;
    remove(key: string, identificator?: string): Promise<void>;
    disconnect(): Promise<void>;
}

class RedisClient {
    static instance: RedisClient | undefined;
    private redisClient: RedisClientType | undefined;

    private constructor() {
        if (!this.redisClient) {
            this.redisClient = redis.createClient({
                url: process.env.REDIS_URL,
            });;
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
        identificator?: string
    ): string {
        return key + (identificator ? `_${identificator}` : '');
    }

    async set(
        key: string,
        value: unknown,
        identificator?: string|number,
        ttlInMinutes: number = DEFAULT_TTL_IN_MINUTES
    ): Promise<void> {
        if (!this.redisClient) {
            console.warn("Redis not connected!");
            return;
        }

        const storageKey = this.getStorageKey(key, identificator);

        try {
            await this.redisClient.set(
                storageKey,
                JSON.stringify(value),
                {
                    EX: ttlInMinutes * 60 * 1000,
                }
            );
        } catch (err) {
            console.error("Failed to set value in Redis", err);
        }
    }

    async get<T = unknown>(
        key: string,
        identificator?: string|number,
    ): Promise<T | void> {
        if (!this.redisClient) {
            console.warn("Redis not connected!");
            return;
        }

        try {
            const storageKey = this.getStorageKey(key, identificator);

            const result = await this.redisClient.get(storageKey);
            if (!result) return;

            return safeParse(result);
        } catch (err) {
            console.error("Failed to set value in Redis", err);
        }
    }


    async remove(
        key: string,
        identificator?: string,
    ): Promise<void> {
        if (!this.redisClient) {
            console.warn("Redis not connected!");
            return;
        }

        const storageKey = this.getStorageKey(key, identificator);

        try {
            await this.redisClient.del(storageKey);
        } catch (err) {
            console.error("Failed to set value in Redis", err);
        }
    }

    async disconnect(): Promise<void> {
        if (this.redisClient) {
            try {
                await this.redisClient.disconnect();
            } catch (err) {
                console.warn("Failed to disconnect");
            }
        } else {
            console.warn("Redis not connected!");
        }
    }
}

export default RedisClient.getInstance();