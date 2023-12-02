import analyzeImage from './azure-image-analysis';
import React, { useState } from 'react';

function DisplayResults({ results, imageUrl }) {
  const captionText = results.description?.captions[0]?.text || "Resultados del análisis de imagen:";

  return (
    <div>
      <h1>{captionText}</h1>
      {imageUrl && <img src={imageUrl} alt="Imagen analizada" />}
      <p>URL de la imagen procesada: {imageUrl}</p>
      <ul>
        {results && Object.entries(results).map(([key, value], index) => (
          <li key={index}>
            <strong>{key}:</strong> {JSON.stringify(value)}
          </li>
        ))}
      </ul>
    </div>
  );
}
function App() {
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  const handleAnalyzeImage = async () => {
    setProcessing(true);
    const imageUrl = document.getElementById('inputImage').value;
    try {
      const results = await analyzeImage(imageUrl);
      setResults(results);
      setImageUrl(imageUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="App">
      <h1>Análisis de imagen</h1>
      <input type="text" id="inputImage" name="inputImage" />
      <button onClick={handleAnalyzeImage}>
        {processing ? "Procesando..." : "Analizar imagen"}
      </button>
      <DisplayResults results={results} imageUrl={imageUrl} />
      <h1>Creado por Santiago Santafe</h1>
    </div>
  );
}

export default App;