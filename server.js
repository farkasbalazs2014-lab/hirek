const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/news', (req, res) => {
  fs.readFile('data.json', (err, data) => {
    if (err) return res.status(500).send('Hiba olvasáskor');
    const news = JSON.parse(data || '[]');
    res.json(news);
  });
});

app.post('/api/news', (req, res) => {
  const newItem = req.body;
  fs.readFile('data.json', (err, data) => {
    const news = err ? [] : JSON.parse(data || '[]');
    news.unshift(newItem);
    fs.writeFile('data.json', JSON.stringify(news, null, 2), err => {
      if (err) return res.status(500).send('Hiba mentéskor');
      res.status(201).send('Hír mentve');
    });
  });
});

app.listen(PORT, () => console.log(`Szerver fut: http://localhost:${PORT}`));
``