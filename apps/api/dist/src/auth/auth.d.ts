import 'dotenv/config';
export declare const auth: import("better-auth").Auth<{
    appName: string;
    baseURL: string;
    secret: string | undefined;
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    experimental: {
        joins: true;
    };
    trustedOrigins: string[];
    databaseHooks: {
        user: {
            create: {
                after(user: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                } & Record<string, unknown>): Promise<void>;
            };
        };
        session: {
            create: {
                after(session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                } & Record<string, unknown>): Promise<void>;
            };
        };
    };
    user: {
        additionalFields: {
            phone: {
                type: "string";
                required: false;
            };
            role: {
                type: ("SUPER_ADMIN" | "ADMIN" | "USER")[];
                required: false;
                defaultValue: string;
                input: false;
            };
            status: {
                type: ("active" | "inactive" | "suspended")[];
                required: false;
                defaultValue: string;
                input: false;
            };
        };
    };
    emailAndPassword: {
        enabled: true;
        requireEmailVerification: true;
        minPasswordLength: number;
        maxPasswordLength: number;
        revokeSessionsOnPasswordReset: true;
        sendResetPassword: ({ user, url }: {
            user: import("better-auth").User;
            url: string;
            token: string;
        }) => Promise<void>;
    };
    emailVerification: {
        sendVerificationEmail: ({ user, url }: {
            user: import("better-auth").User;
            url: string;
            token: string;
        }) => Promise<void>;
        sendOnSignUp: true;
        autoSignInAfterVerification: true;
        expiresIn: number;
    };
    session: {
        expiresIn: number;
        updateAge: number;
        cookieCache: {
            enabled: true;
            maxAge: number;
            strategy: "jwe";
        };
    };
    account: {
        encryptOAuthTokens: true;
    };
    rateLimit: {
        enabled: true;
        window: number;
        max: number;
        storage: "memory";
        customRules: {
            '/sign-in/email': {
                window: number;
                max: number;
            };
            '/sign-up/email': {
                window: number;
                max: number;
            };
            '/forget-password': {
                window: number;
                max: number;
            };
        };
    };
    advanced: {
        useSecureCookies: boolean;
        cookiePrefix: string;
    };
}>;
