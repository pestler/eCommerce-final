class LocalStorageService {
  public get<T>(key: string): T | null {
    try {
      const value: string | null = localStorage.getItem(key);
      return !value ? null : JSON.parse(value);
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  
  public set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }
  
  public remove(key: string): void {
    localStorage.removeItem(key);
  }
  
  public clear(): void {
    localStorage.clear();
  }
}
  
export const localStorageService = new LocalStorageService();
  