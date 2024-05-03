class ConfigService {

    public get(key: string): string {
        const value = import.meta.env[key];
        if (!value) {
            throw new Error(`Environment variable ${key} not found`);
        }
        return value;
    }
}

export const configService = new ConfigService();
