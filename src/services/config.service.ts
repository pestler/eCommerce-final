import {config} from "../contstants/metadata.constants.ts";

class ConfigService {
  public get(key: string): string {
    const value = config[key];
    if (!value) {
      throw new Error(`Environment variable ${key} not found`);
    }
    return value;
  }
}

export const configService = new ConfigService();
