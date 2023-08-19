import { z } from 'zod';

const loginZodSchema = z.object({
  body: z
    .object({
      id: z.string({
        required_error: 'ID is required',
      }),
      password: z.string({
        required_error: 'Password is Required',
      }),
    })
    .optional(),
});
const refreshTokenZodSchema = z.object({
  cookies: z
    .object({
      refreshToken: z.string({
        required_error: 'Refresh Token is required',
      }),
    })
    .optional(),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
};
