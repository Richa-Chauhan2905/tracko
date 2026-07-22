import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

import { env } from "../../env.js";

import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export async function googleLogin(googleToken: string) {
  const ticket = await googleClient.verifyIdToken({
    idToken: googleToken,
    audience: env.GOOGLE_CLIENT_ID!,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google token");
  }

  const { sub: googleId, email, name, picture } = payload;

  if (!googleId || !email || !name) {
    throw new Error("Incomplete Google profile");
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.googleId, googleId));

  let user = existingUser[0];

  if (!user) {
    const [newUser] = await db
      .insert(users)
      .values({
        googleId,
        email,
        name,
        profilePicture: picture,
      })
      .returning();

    if (!newUser) {
      throw new Error("Failed to create user");
    }

    user = newUser;
  }
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    env.JWT_SECRET!,
    {
      expiresIn: "7d",
    },
  );

  return {
    user,
    token,
  };
}
