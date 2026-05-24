export interface HealthPayload {
    service: string;
    version: string;
    authBasePath: string;
    apiBasePath: string;
    timestamp: string;
}
export declare class AppService {
    getHealth(): HealthPayload;
}
