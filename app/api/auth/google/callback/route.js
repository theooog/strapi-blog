import { OAuth2Client } from "google-auth-library";
import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

// define this outside of your function
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/api/auth/google/callback/"
);

export async function GET(req, context) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  // Store the tokens in a cookie
  cookies().set("googleAuth", JSON.stringify(tokens), {
    httpOnly: true,
    sameSite: true,
    secure: true,
  });

  // redirect to another page or do something else
  return new NextResponse(null, {
    status: 302,
    headers: { Location: "/youtube" },
  });
}
