import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@grouphub/database";

export const auth = betterAuth({ logger: { level: "debug" },
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            prompt: "select_account",
        }
    },
    user: {
        additionalFields: {
            isOnboarded: {
                type: "boolean",
                required: false,
                defaultValue: false
            },
            isApproved: {
                type: "boolean",
                required: false,
                defaultValue: false
            },
            isBanned: {
                type: "boolean",
                required: false,
                defaultValue: false
            },
            dob: {
                type: "date",
                required: false
            },
            phone: {
                type: "string",
                required: false
            },
            twoFactorEnabled: {
                type: "boolean",
                required: false,
                defaultValue: false
            },
            role: {
                type: "string",
                required: false,
                defaultValue: "USER"
            },
        }
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    if (user.email === "tunganht26@gmail.com") {
                        return {
                            data: {
                                ...user,
                                role: "ADMIN"
                            }
                        };
                    }
                    return { data: user };
                }
            }
        }
    }
});
