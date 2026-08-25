const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory and assets directory explicitly
app.use(express.static(__dirname));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/skills.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'skills.json'));
});

app.get('/achievements.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'achievements.json'));
});

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for the achievements page
app.get('/achievements', (req, res) => {
    res.sendFile(path.join(__dirname, 'achievements.html'));
});

// Catch-all route for 404
app.get('*', (req, res) => {
    // If request is for an asset file or extension, return standard 404 text instead of 404.html to avoid MIME type errors
    if (req.path.startsWith('/assets/') || req.path.includes('.')) {
        return res.status(404).send('404 Not Found');
    }
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}
