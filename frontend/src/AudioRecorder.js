import React, { useState } from 'react';
import axios from 'axios';

const AudioRecorder = () => {
    const [recording, setRecording] = useState(false);
    const [loading, setLoading] = useState(false); // Ladezustand
    const [audioURL, setAudioURL] = useState(null);
    const [result, setResult] = useState(null);

    const negativeEmotions = ['sauer', 'ängstlich', 'traurig', 'ekel'];

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const formData = new FormData();
                formData.append('audio', audioBlob);

                setLoading(true); // Ladebildschirm aktivieren

                try {
                    const response = await axios.post('http://localhost:5001/analyze', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                    setResult(response.data);
                    setAudioURL(URL.createObjectURL(audioBlob));
                } catch (error) {
                    console.error('Fehler bei der Analyse:', error);
                } finally {
                    setLoading(false);
                }
            };

            console.log('Aufnahme startet.');
            mediaRecorder.start();
            setRecording(true);

            setTimeout(() => {
                mediaRecorder.stop();
                console.log('Aufnahme beendet.');
                setRecording(false);
            }, 5000);
        });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Emotion Analyzer</h1>
            <button
                onClick={startRecording}
                disabled={recording || loading}
                style={{
                    ...styles.button,
                    ...(recording ? styles.buttonDisabled : {}),
                }}
            >
                {recording ? 'Aufnahme läuft...' : 'Aufnahme starten'}
            </button>

            {loading && <p style={styles.loadingText}>Das Ergebnis wird verarbeitet...</p>}

            {audioURL && !loading && (
                <div>
                    <h3 style={styles.subtitle}>Aufnahme</h3>
                    <audio controls src={audioURL} style={styles.audio}></audio>
                </div>
            )}

            {result && !loading && (
                <div style={styles.result}>
                    <p style={styles.resultText}>Emotion: <strong>{result.emotion}</strong></p>
                    <p style={styles.resultText}>Konfidenz: <strong>{result.confidence.toFixed(2)}</strong></p>
                    
                    {/* {negativeEmotions.includes(result.emotion) && ( */}
                        <div style={styles.actions}>
                            <h4 style={styles.actionTitle}>Schau dir das an:</h4>
                            <button
                                style={styles.actionButton}
                                onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
                            >
                                Lustiges Video
                            </button>
                            <button
                                style={styles.actionButton}
                                onClick={() => window.open('https://www.youtube.com/watch?v=1ZYbU82GVz4', '_blank')}
                            >
                                Motivierende Playlist
                            </button>
                        </div>
                    {/* )} */}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '50px auto',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#007BFF',
        color: '#fff',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    },
    loadingText: {
        marginTop: '20px',
        fontSize: '18px',
        color: '#555',
    },
    subtitle: {
        fontSize: '20px',
        marginTop: '20px',
    },
    audio: {
        marginTop: '10px',
    },
    result: {
        marginTop: '20px',
        textAlign: 'left',
        padding: '10px',
        backgroundColor: '#f1f1f1',
        borderRadius: '5px',
    },
    resultText: {
        fontSize: '16px',
        margin: '5px 0',
    },
    actions: {
        marginTop: '15px',
    },
    actionTitle: {
        fontSize: '18px',
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    actionButton: {
        margin: '5px',
        padding: '10px 15px',
        fontSize: '14px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#28a745',
        color: '#fff',
    },
};

export default AudioRecorder;
