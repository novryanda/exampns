export interface ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
    revokeOtherSessions?: boolean;
}
