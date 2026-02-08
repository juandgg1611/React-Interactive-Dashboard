// src/types/auth.types.ts
export type RecoveryStep = 1 | 2 | 3 | 4;

export interface RecoveryState {
  email: string;
  verificationCode: string;
  newPassword: string;
  confirmPassword: string;
  method: "email" | "sms" | "questions";
}

export interface PasswordValidation {
  isValid: boolean;
  criteria: {
    minLength: boolean;
    hasUppercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
    matchesConfirm: boolean;
  };
  strength: "weak" | "medium" | "strong" | "very-strong";
  score: number;
}

export interface VerificationCodeResponse {
  success: boolean;
  message: string;
  expiresAt: string;
  attemptsLeft: number;
}

export interface VerificationCodeRequest {
  email: string;
  code: string;
  deviceInfo?: DeviceInfo;
}

export interface DeviceInfo {
  userAgent: string;
  platform: string;
  ipAddress?: string;
}
