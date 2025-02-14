// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
import { Permission } from "@prisma/client";
type PermissionWithoutId = Omit<Permission, "userId">;

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      permissions: PermissionWithoutId;
    };
  }
}
