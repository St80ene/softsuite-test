class DataRequestCache {
  private static instance: DataRequestCache | null = null;
  private cache: Map<string, any> = new Map();

  private constructor() {}

  public static getInstance(): DataRequestCache {
    if (!DataRequestCache.instance) {
      DataRequestCache.instance = new DataRequestCache();
    }
    return DataRequestCache.instance;
  }

  public get<T>(url: string): T | undefined {
    return this.cache.get(url) as T | undefined;
  }

  public set<T>(url: string, data: T): void {
    this.cache.set(url, data);
  }

  public clear(): void {
    this.cache.clear();
  }
}

export default DataRequestCache;
