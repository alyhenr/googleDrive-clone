import { Prisma } from "@prisma/client";

export function createJWTvalidator(sessionsTable: Prisma.SessionsDelegate) {
  return async function findSession(token: string): Promise<boolean> {
    return !!(await sessionsTable.findFirst({
      where: {
        token,
      },
    }));
  };
}
