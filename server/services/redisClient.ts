import redis, { type RedisClientType } from "redis";

export class RedisClient {
    private readonly instance: RedisClientType | undefined;

    constructor() {
        if (!this.instance) {
            this.instance = redis.createClient({
                url: process.env.REDIS_URL,
            });;
        }
    }

    async disconnect() {
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