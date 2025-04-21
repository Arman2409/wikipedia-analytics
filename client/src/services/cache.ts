import { CACHE_DEFAULT_TTL } from "../constants/configs";
import { safeParse } from "../utils/helpers";

interface LocalStorageCacheHandler {
    set(key: string, value: unknown, identificator?: string, ttlMinutes?: number): void;
    get<T = unknown>(key: string, identificator?: string): T | null;
    remove(key: string, identificator?: string): void;
    clear(): void;
}

class LocalStorageCacheHandler {
    constructor(private prefix = 'app_') { }

    private getStorageKey(
        key: string,
        identificator?: string
    ) {
        return this.prefix + key + (identificator ? `_${identificator}` : '');
    }

    set(
        key: string,
        value: unknown,
        identificator?: string,
        ttlMinutes: number = CACHE_DEFAULT_TTL,
    ) {
        const expires = Date.now() + ttlMinutes * 60 * 1000;
        const wrapped = { value, expires };

        const itemKey = this.getStorageKey(key, identificator);

        localStorage.setItem(itemKey, JSON.stringify(wrapped));
    }

    get<T = unknown>(
        key: string,
        identificator?: string
    ): T | null {
        const itemKey = this.getStorageKey(key, identificator);

        const raw = localStorage.getItem(itemKey);
        if (!raw) return null;

        try {
            const { value, expires } = JSON.parse(raw);

            if (Date.now() > expires) {
                this.remove(key);
                return null;
            }
            
            return safeParse(value);
        } catch {
            this.remove(key);
            return null;
        }
    }

    remove(
        key: string,
        identificator?: string
    ) {
        const itemKey = this.getStorageKey(key, identificator);

        localStorage.removeItem(itemKey);
    }

    clear() {
        Object.keys(localStorage).forEach((k) => {
            if (k.startsWith(this.prefix)) {
                localStorage.removeItem(k);
            }
        });
    }
}

export default LocalStorageCacheHandler;