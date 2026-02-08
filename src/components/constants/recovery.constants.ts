// src/constants/recovery.constants.ts
export const RECOVERY_CONFIG = {
  CODE_LENGTH: 6,
  CODE_EXPIRY_MINUTES: 5,
  RESEND_COOLDOWN_SECONDS: 45,
  PASSWORD_MIN_LENGTH: 8,
} as const;

export const PASSWORD_CRITERIA = {
  MIN_LENGTH: 8,
  REQUIRES_UPPERCASE: true,
  REQUIRES_NUMBER: true,
  REQUIRES_SPECIAL_CHAR: true,
} as const;
