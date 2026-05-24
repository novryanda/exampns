export type AuthEmailType = 'verify-email' | 'reset-password';
export interface EmailMessage {
    to: string;
    subject: string;
    text: string;
    html?: string;
    meta?: Record<string, unknown>;
}
export declare const logEmailTransportConfig: () => void;
export declare const sendEmail: (message: EmailMessage) => Promise<void>;
export declare const sendAuthEmail: (type: AuthEmailType, email: string, url: string, extra?: Record<string, unknown>) => Promise<void>;
