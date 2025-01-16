import sys
import os
import json
import torch
import numpy as np
from transformers import Wav2Vec2ForSequenceClassification
from torchaudio.transforms import Resample
from pydub import AudioSegment

# Modell laden
model_name = "ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition"
model = Wav2Vec2ForSequenceClassification.from_pretrained(model_name)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Liste der Emotionen
emotions = ['sauer', 'ruhig', 'ekel', 'ängstlich', 'fröhlich', 'neutral', 'traurig', 'überrascht']

def load_audio_with_pydub(file_path):
    audio = AudioSegment.from_file(file_path)
    audio = audio.set_channels(1)
    audio = audio.set_frame_rate(16000)
    samples = np.array(audio.get_array_of_samples(), dtype=np.float32)
    samples = samples / np.iinfo(np.int16).max
    return samples, audio.frame_rate

def process_audio(audio_data, sample_rate=16000):
    waveform = torch.tensor(audio_data, dtype=torch.float32)
    waveform = waveform / 32768.0

    if sample_rate != 16000:
        waveform = Resample(sample_rate, 16000)(waveform)

    waveform = waveform.unsqueeze(0)
    return waveform

def predict_emotion(audio_data):
    waveform = process_audio(audio_data)
    waveform = waveform.to(device)

    with torch.no_grad():
        logits = model(waveform).logits

    predicted_class = torch.argmax(logits, dim=-1).item()
    confidence = torch.softmax(logits, dim=-1)[0][predicted_class].item()
    predicted_emotion = emotions[predicted_class]

    return predicted_emotion, confidence

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Bitte geben Sie den Pfad zur Audiodatei an"}))
        sys.exit(1)

    file_path = sys.argv[1]

    if not os.path.exists(file_path):
        print(json.dumps({"error": f"Datei nicht gefunden: {file_path}"}))
        sys.exit(1)

    try:
        waveform, sample_rate = load_audio_with_pydub(file_path)
        emotion, confidence = predict_emotion(audio_data=waveform)

        result = {
            "emotion": emotion,
            "confidence": confidence
        }
        print(json.dumps(result))

    except Exception as e:
        result = {
            "error": str(e)
        }
        print(json.dumps(result))
        sys.exit(1)
