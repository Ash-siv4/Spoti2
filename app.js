const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const app = express();
const port = 3000;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/build")));

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

// Redirect to Spotify in order to login to free/premium account that is linked to MY-app
app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = "user-library-read";
  const authUrl =
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state,
    });

  res.redirect(authUrl);
});

// Redirect URls - directs to Ash~Spoti2 app created in: 'Spotify for Developers' portal
app.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    const refreshToken = tokenResponse.data.refresh_token;

    res.redirect(
      "/home?" +
        querystring.stringify({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
    );
  }
});

// Default home page
app.get("/home", async (req, res) => {
  const accessToken = req.query.access_token;

  if (!accessToken) {
    res.redirect("/");
    return;
  }

  try {
    const tracksResponse = await axios.get(
      "https://api.spotify.com/v1/me/tracks",
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    const tracks = tracksResponse.data.items.map((item) => ({
      name: item.track.name,
      artist: item.track.artists[0].name,
      album: item.track.album.name,
      preview_url: item.track.preview_url,
    }));

    res.json(tracks);
  } catch (error) {
    console.error("Error fetching tracks:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
