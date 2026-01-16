// src/lib/validation.ts - VERSIÓN CORREGIDA SIN DUPLICADOS
import { z } from "zod";

// ==================== ESQUEMA DE LOGIN ====================
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ==================== ESQUEMA DE REGISTRO ====================
export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Nombre completo es requerido"),
    email: z.string().email("Email institucional inválido"),
    institution: z.string().min(2, "Institución es requerida"),
    academicLevel: z.string().min(1, "Nivel académico es requerido"),
    researchField: z.string().min(1, "Área de investigación es requerida"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
      .regex(/[a-z]/, "Debe contener al menos una minúscula")
      .regex(/\d/, "Debe contener al menos un número")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Debe contener al menos un carácter especial"
      ),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar los términos y condiciones",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
