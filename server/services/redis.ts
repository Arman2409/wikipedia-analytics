import redis, { type RedisClientType } from "redis";

import { DEFAULT_TTL_IN_MINUTES } from "../configs/configs";

export class RedisClient {
    private instance: RedisClientType | undefined;

    private constructor() {
        if (!this.instance) {
            this.instance = redis.createClient({
                url: process.env.REDIS_URL,
            });;
        }
    }

    async getInstance(): Promise<RedisClientType> {
        if (!this.instance) {
            this.instance = redis.createClient({
                url: process.env.REDIS_URL,
            });
        }

        return this.instance;
    }

    private getStorageKey(
        key: string,
        identificator?: string
    ):string {
        return key + (identificator ? `_${identificator}` : '');
    }

    async set(
        key: string,
        value: unknown,
        identificator?: string,
        ttlInMinutes: number = DEFAULT_TTL_IN_MINUTES
    ): Promise<void> {
        if (!this.instance) {
            console.warn("Redis not connected!");
            return;
        }

        const storageKey = this.getStorageKey(key, identificator);

        try {
            await this.instance.set(
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

    async remove(
        key: string,
        identificator?: string,
    ): Promise<void> {
        if (!this.instance) {
            console.warn("Redis not connected!");
            return;
        }

        const storageKey = this.getStorageKey(key, identificator);

        try {
            await this.instance.del(storageKey);
        } catch (err) {
            console.error("Failed to set value in Redis", err);
        }
    }

    async disconnect(): Promise<void>  {
        if (this.instance) {
            try {
                await this.instance.disconnect();
            } catch (err) {
                console.warn("Failed to disconnect");
            }
        } else {
            console.warn("Redis not connected!");
        }
    }
}