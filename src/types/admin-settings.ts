export interface PlatformSettings {
  siteName: string;
  siteDescription: string;
  adminEmail: string;
  supportEmail: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailVerificationRequired: boolean;
  moderationRequired: boolean;
  maxFileUploadSize: number;
  sessionTimeout: number;
}

export interface SecuritySettings {
  twoFactorRequired: boolean;
  passwordMinLength: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
  ipWhitelist: string[];
  apiRateLimit: number;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  newUserRegistration: boolean;
  newSellerApplication: boolean;
  systemAlerts: boolean;
  backupNotifications: boolean;
  errorReports: boolean;
}

export interface SystemInfo {
  version: string;
  startDate: string;
  usersCount: number;
  sellersCount: number;
}

export type AdminSettingsTab =
  | "general"
  | "security"
  | "notifications"
  | "system";
