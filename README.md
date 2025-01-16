# Emotion Analyzer

**Emotion Analyzer** ist ein Tool zur Analyse von Audiosprachdateien oder -aufnahmen, das mithilfe eines vortrainierten Modells Emotionen in Kategorien einteilt. Es bietet Benutzern bei negativen Emotionen Aktionen wie lustige Videos oder motivierende Playlists zur Erheiterung oder Entspannung an.

## Funktionen
- **Emotionserkennung**: Basierend auf dem Modell `ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition`.
- **Aktionen bei negativen Emotionen**:
  - Anzeige eines lustigen Videos.
  - Bereitstellung einer motivierenden Musikplaylist.
- **Echtzeit-Sprachanalyse**: Nutzer können direkt im Browser Audio aufnehmen und analysieren.

## Hinweis zum Modell
Das verwendete Modell bildet eine Grundlage und sollte für präzisere Analysen weiter trainiert werden.

## Technologien
- **Frontend**: React.js
- **Backend**: Express.js
- **Machine Learning**: Hugging Face Transformers, PyTorch, torchaudio

---

## Installation

### Voraussetzungen
- **Node.js**: Version >= 16.x
- **Python**: Version >= 3.10
- **ffmpeg**: Installieren, z. B. über Homebrew:
  ```bash
  brew install ffmpeg
  ```
- **Git**: Zum Klonen des Repositories.

### Schritte
1. **Repository klonen:**
   ```bash
   git clone https://github.com/alohacyclist/emotionAnalyzer.git
   cd emotion-analyzer
   ```

2. **Frontend- und Backend-Abhängigkeiten installieren:**
   ```bash
   npm install
   ```

3. **Python-Umgebung einrichten:**
   - Virtuelle Umgebung erstellen:
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```
   - Python-Abhängigkeiten installieren:
     ```bash
     pip install -r requirements.txt
     ```

---

## Nutzung

### Backend starten
Starte den Node.js-Server:
```bash
npm start
```

### Emotionserkennung im Browser
1. Öffne die Anwendung in deinem Browser unter `http://localhost:3000`.
2. Klicke auf **Aufnahme starten**, um eine Sprachaufnahme zu machen.
3. Warte auf die Analyse und schaue dir das Ergebnis an.

---

## Abhängigkeiten

### Node.js Dependencies
- **child_process**: Zum Ausführen von Prozessen.
- **cors**: Aktiviert Cross-Origin-Anfragen.
- **express**: Framework für das Backend.
- **ffmpeg-static**: Statische FFmpeg-Binärdatei.
- **fluent-ffmpeg**: Wrapper für FFmpeg.
- **multer**: Middleware für Datei-Uploads.

Installieren:
```bash
npm install
```

### Python Dependencies
- **torch**: Machine Learning Framework.
- **torchaudio**: Audioverarbeitung mit PyTorch.
- **transformers**: Vortrainierte Modelle von Hugging Face.
- **pydub**: Audioverarbeitung.
- **sox**: Für Audioverarbeitung.

Installieren:
```bash
pip install -r requirements.txt
```

---

## Beispielaktionen
Bei negativen Emotionen wie `sauer`, `traurig` oder `ängstlich` werden folgende Links angezeigt:
- **Lustiges Video**: [Rick Astley - Never Gonna Give You Up](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
- **Motivierende Playlist**: [Entspannungs-Playlist](https://www.youtube.com/watch?v=1ZYbU82GVz4)

---

### **Besonderheiten**
- **Abhängigkeiten**: Alle notwendigen Node.js- und Python-Bibliotheken sind dokumentiert.
- **Installationsanleitung**: Detaillierte Schritte für die Einrichtung der Umgebung.
- **Modellhinweis**: Klarer Verweis auf die Notwendigkeit, das Modell weiter zu trainieren.
- **Nutzungsszenario**: Beispielaktionen bei negativen Emotionen.