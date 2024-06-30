# Ash~Spoti2: Spotify Music App

This project is a full-stack web application that utilises the Spotify API to fetch and display a user's saved tracks. The backend is built with Node.js and Express.

## Features

- User authentication via Spotify
- Fetch and display saved tracks from the user's Spotify library

## Prerequisites

- Node.js and npm installed on your machine
- Spotify Developer account

## Setup

### 1. Spotify Developer Setup

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/login) and log in.
2. Create a new application and note down your `Client ID` and `Client Secret`.
3. Set the Redirect URI to `http://localhost:3000/callback`.

### 2. Project Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/Ash-siv4/Spoti2.git
   cd Spoti2
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Update the `.env` file in the root directory with your Spotify credentials:

   ```plaintext
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
   ```

### 3. Running the App

Start the Node.js server:

```bash
node app.js
```

Open your browser and navigate to `http://localhost:3000/`.

## Project Structure

- `app.js`: Main server file using Express

## Endpoints

- `/login`: Redirects to Spotify's authentication page
- `/callback`: Handles the callback from Spotify after authentication
- `/home`: Fetches and returns the user's saved tracks from Spotify

## How It Works

1. The user navigates to `http://localhost:3000/` and is redirected to Spotify's authentication page.
2. After logging in, the user is redirected back to the application with an authorisation code.
3. The backend exchanges the authorisation code for an access token.
4. The access token is used to fetch the user's saved tracks from the Spotify API.

## Dependencies

- [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js
- [axios](https://www.npmjs.com/package/axios): Promise-based HTTP client for the browser and Node.js
- [cookie-parser](https://www.npmjs.com/package/cookie-parser): Parse Cookie header and populate `req.cookies` with an object keyed by the cookie names
- [querystring](https://www.npmjs.com/package/querystring): Node's querystring module for parsing and formatting URL query strings
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file into `process.env`

## Testing the Backend

The API platform **Postman** can be used to test the endpoints by following these steps:

### Step 1: Setting Up Postman

1. **Download and Install Postman:**

   - Ensure Postman is installed on your device. Postman can be downloaded from the [official website](https://www.postman.com/downloads/).

2. **Start the Backend Server:**

   - Ensure the Node.js backend server is running. Open a terminal, navigate to the project directory, and start the server:

     ```bash
     node app.js
     ```

### Step 2: Testing the Backend Endpoints

#### 1. Get the Login URL

1. **Open Postman.**
2. **Create a new GET request:**
   - URL: `http://localhost:3000/login`
3. **Send the Request:**
   - Click the `Send` button.
4. **Observe the Response:**
   - The response will be a redirection to the Spotify authorisation URL. You can copy this URL and paste it into your browser to authenticate with Spotify. After authentication, Spotify will redirect you to `http://localhost:3000/callback` with an authorisation code.

#### 2. Handle the Callback

1. **Authenticate with Spotify:**
   - Copy the URL provided by the `/login` endpoint and paste it into your browser. Authenticate with Spotify, and you will be redirected to `http://localhost:3000/callback?code=YOUR_AUTH_CODE`.
2. **Extract the Authorisation Code:**
   - From the URL, extract the `code` parameter value.

#### 3. Exchange Authorisation Code for Access Token

1. **Create a new GET request in Postman:**
   - URL: `http://localhost:3000/callback?code=YOUR_AUTH_CODE&state=YOUR_STATE`
2. **Send the Request:**
   - Click the `Send` button.
3. **Observe the Response:**
   - You should see a redirection to `/home` with `access_token` and `refresh_token` in the query parameters.

#### 4. Fetch User's Saved Tracks

1. **Extract the Access Token:**
   - From the URL provided in the `/callback` redirection, extract the `access_token` parameter value.
2. **Create a new GET request in Postman:**
   - URL: `http://localhost:3000/home?access_token=YOUR_ACCESS_TOKEN`
3. **Send the Request:**
   - Click the `Send` button.
4. **Observe the Response:**
   - You should receive a JSON response containing the user's saved tracks.

### Example Requests

Here are examples of the requests you should make:

1. **Login Request:**

   ```http
   GET http://localhost:3000/login
   ```

2. **Callback Request (manually construct this URL with your auth code and state):**

   ```http
   GET http://localhost:3000/callback?code=YOUR_AUTH_CODE&state=YOUR_STATE
   ```

3. **Fetch Saved Tracks:**

   ```http
   GET http://localhost:3000/home?access_token=YOUR_ACCESS_TOKEN
   ```

### Summary

By following these steps, you can test the backend of your Spotify music app using Postman. Make sure to replace placeholders like `YOUR_AUTH_CODE`, `YOUR_STATE`, and `YOUR_ACCESS_TOKEN` with actual values obtained during the testing process. This will help you verify that your backend is working correctly before integrating it with a frontend.

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## Author

[Aswene Sivaraj](https://github.com/Ash-siv4/)
