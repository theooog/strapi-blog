import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { params } = context;
  const youtube = google.youtube({
    version: "v3",
    auth: process.env.GOOGLE_API, // Using environment variable
  });

  switch (params.function) {
    case "checkCookie":
      try {
        const googleAuth = cookies().get("googleAuth");
        console.log(googleAuth);
        if (googleAuth) {
          return NextResponse.json(true, {
            status: 200,
          });
        } else {
          return NextResponse.json("Cookie not found", {
            status: 401,
          });
        }
      } catch (error) {
        return NextResponse.json("Cookie not found", {
          status: 401,
        });
      }
    case "getVideos":
      try {
        const { searchParams } = new URL(req.url);
        const channelId = searchParams.get("channelId");

        // Fetch the latest videos from the channel
        const {
          data: { items: videos },
        } = await youtube.search.list({
          part: "snippet",
          channelId: channelId,
          order: "date",
          type: "video",
        });

        return NextResponse.json(
          { videos },
          {
            status: 200,
          }
        );
      } catch (error) {
        console.log(error?.message);
        return NextResponse.json(
          "Error fetching videos. Please try again later. ",
          {
            status: 401,
          }
        );
      }
    case "getCaptions":
      try {
        const { searchParams } = new URL(req.url);
        const videoId = searchParams.get("videoId");
        const googleAuth = cookies().get("googleAuth").value;
        const oauth2Client = new OAuth2Client(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET,
          "http://localhost:3000/api/auth/google/callback/"
        );

        oauth2Client.setCredentials({
          access_token: JSON.parse(googleAuth).access_token,
        });
        const youtubeOauth = google.youtube({
          version: "v3",
          auth: oauth2Client, // Using environment variable
        });

        // Fetch the captions from the video
        const {
          data: { items: captions },
        } = await youtubeOauth.captions.list({
          part: "snippet",
          videoId: videoId,
        });

        // Get the first caption
        const caption = captions[0];
        console.log(caption);
        // Fetch the caption content
        const { data } = await youtubeOauth.captions.download({
          id: caption.id,
          tfmt: "vtt",
        });

        // Extract the captcha

        return NextResponse.json("asd", {
          status: 200,
        });
      } catch (error) {
        return NextResponse.json(
          "Error fetching captions. Please try again later. " + error?.message,
          {
            status: 401,
          }
        );
      }
    default: {
      return NextResponse.json("Function not found", {
        status: 401,
      });
    }
  }
}
