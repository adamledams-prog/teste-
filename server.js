const express = require('express');
const { Resend } = require('resend');
const path = require('path');

const app = express();
const resend = new Resend('re_A8iPfFnB_EwpYeq7Zu2mi9vQ5b8MC5UGq');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.post('/send', async (req, res) => {
  const { email, messageText } = req.body;

  if (!email || !isValidEmail(email)) {
    return res.json({ success: false, message: '❌ Email invalide.' });
  }

  if (!messageText || messageText.trim() === '') {
    return res.json({ success: false, message: '❌ Message vide.' });
  }

  try {
    await resend.emails.send({
      from: 'adam',
      to: 'adamledams@gmail.com',
      subject: `Message de ${email}`,
      text: `Email: ${email}\n\nMessage:\n${messageText}`,
    });
    res.json({ success: true, message: '✅ Email valide ! Message envoyé.' });
  } catch (err) {
    res.json({ success: false, message: '❌ Erreur lors de l\'envoi : ' + err.message });
  }
});

app.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));
