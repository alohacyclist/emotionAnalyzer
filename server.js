const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const app = express();

ffmpeg.setFfmpegPath(ffmpegPath);
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || '.wav';
        cb(null, `${Date.now()}${ext}`);
    },
});

const upload = multer({ storage });
app.use(cors());

app.post('/analyze', upload.single('audio'), (req, res) => {
    console.log(`backend: analyze`);
    if (!req.file) {
        console.error('Keine Datei hochgeladen');
        return res.status(400).send('Keine Datei hochgeladen');
    }

    const inputPath = req.file.path;
    const outputPath = path.join('uploads', `${Date.now()}.wav`);

    ffmpeg(inputPath)
        .output(outputPath)
        .audioFrequency(16000)
        .audioChannels(1)     
        .on('end', () => {
            console.log(`Datei erfolgreich konvertiert: ${outputPath}`);

            // Python-Skript aufrufen
            exec(`python analyze.py ${outputPath}`, (error, stdout, stderr) => {
                if (error) {
                    console.error('Fehler im Python-Skript:', stderr);
                    return res.status(500).send('Fehler bei der Analyse.');
                } else {
                    console.log('Python-Skript erfolgreich ausgeführt');
                    console.log(`stdout: ${stdout}`);
                }

                try {
                    const result = JSON.parse(stdout);
                    res.json(result);

                } catch (parseError) {
                    console.error('Fehler beim Parsen der Python-Ausgabe:', parseError);
                    res.status(500).send('Fehler bei der Verarbeitung der Analyse.');
                }
            });
        })
        .on('error', (err) => {
            console.error('Fehler bei der Konvertierung:', err.message);
            res.status(500).send('Fehler bei der Konvertierung.');
        })
        .run();
});

app.get('/action/:file', (req, res) => {
    const filePath = path.join(__dirname, 'content', req.params.file);
    res.sendFile(filePath);
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));
