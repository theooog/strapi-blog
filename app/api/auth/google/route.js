import { OAuth2Client } from "google-auth-library";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const scopes = [
    "https://www.googleapis.com/auth/youtube.force-ssl",
    "https://www.googleapis.com/auth/youtubepartner",
  ];
  const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID, // replace with your client id
    process.env.GOOGLE_CLIENT_SECRET, // replace with your client secret
    "http://localhost:3000/api/auth/google/callback/" // replace with your redirect URI
  );

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  return NextResponse.json(url, {
    status: 200,
  });
}
