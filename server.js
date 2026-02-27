const express = require('express');
const admin = require('firebase-admin');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Initialize Firebase Admin
const serviceAccount = JSON.parse(process.env.FIREBASE_KEY);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Simple team access password (change this to something only your team knows)
const TEAM_PASSWORD = process.env.TEAM_PASSWORD || 'Swarajya@Team2024';

// Auth middleware
app.post('/api/reset-password', async (req, res) => {
  const { email, newPassword, teamPassword } = req.body;

  // Verify team password
  if (teamPassword !== TEAM_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Invalid team password' });
  }

  if (!email || !newPassword) {
    return res.status(400).json({ success: false, message: 'Email and new password are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().updateUser(user.uid, { password: newPassword });
    res.json({ success: true, message: `Password updated successfully for ${email}` });
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      res.status(404).json({ success: false, message: `No account found for ${email}` });
    } else {
      res.status(500).json({ success: false, message: err.message });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Swarajya Password Reset Tool running on port ${PORT}`);
});
