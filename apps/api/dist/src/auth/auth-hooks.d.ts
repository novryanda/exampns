export declare const provisionTrialSubscriptionForUser: (userId: string) => Promise<void>;
export declare const markPasswordSetAndActivateIfReady: (userId: string) => Promise<void>;
export declare const activateUserAccountIfReady: (userId: string) => Promise<void>;
export declare const syncLastLoginForUser: (userId: string) => Promise<void>;
