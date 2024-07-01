const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname)));

app.get('/list-groups', (req, res) => {
    const imagesDir = path.join(__dirname, 'images');
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read directory' });
        }
        const directories = files.filter(file => fs.statSync(path.join(imagesDir, file)).isDirectory());
        res.json(directories);
    });
});

app.get('/phrases', (req, res) => {
    fs.readFile(path.join(__dirname, 'phrases.txt'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read phrases file' });
        }
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
