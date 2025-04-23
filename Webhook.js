const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const TELEGRAM_TOKEN = '7640348433:AAG9pw1v4GjcLOyJrYlNcivf7Hfbuah5Zkk';
const CHAT_ID = '95006552';

app.post('/webhook', async (req, res) => {
  const message = req.body.message || 'هشدار جدید از تریدینگ‌ویو دریافت شد!';
  
  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
    });
    res.status(200).send('پیام با موفقیت ارسال شد.');
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send('ارسال پیام با خطا مواجه شد.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
