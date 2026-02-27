# Swarajya Password Reset Tool

A simple internal web app to reset subscriber passwords in Firebase.

## Setup

1. Copy your Firebase service account key file into this folder and rename it to:
   `serviceAccountKey.json`

2. Install dependencies:
   ```
   npm install
   ```

3. Start locally:
   ```
   npm start
   ```
   Then open http://localhost:3000 in your browser.

## Deploy to Render (free hosting)

1. Push this folder to a GitHub repository (keep serviceAccountKey.json out — it's in .gitignore)
2. Go to render.com and create a free account
3. New > Web Service > connect your GitHub repo
4. Set environment variables in Render dashboard:
   - `TEAM_PASSWORD` = your chosen team password
   - `FIREBASE_KEY` = paste the entire contents of your serviceAccountKey.json
5. Deploy!

## Team Password
Default team password is: `Swarajya@Team2024`
Change this by setting the TEAM_PASSWORD environment variable.
