import { z } from "zod";

export const userSchema = z.object({
    first_name: z.string().nullable(),
    last_name: z.string().nullable(),
    email_addresses: z.array(z.object({
        email_address: z.string(),
        id: z.string()
    })),
    id: z.string(),
    primary_email_address_id: z.string(),
});

export const userDeleteSchema = z.object({
    deleted: z.boolean(),
    id: z.string(),
})

export type UserDeleteDto = z.infer<typeof userDeleteSchema>;
export type UserDto = z.infer<typeof userSchema>;