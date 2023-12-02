import analyzeImage from './azure-image-analysis';
import React, { useState } from 'react';

function DisplayResults({ results, imageUrl }) {
  return (
    <div>
      <h2>Resultados del análisis de imagen:</h2>
      <p>URL de la imagen procesada: {imageUrl}</p>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  const handleAnalyzeImage = () => {
    setProcessing(true);
    analyzeImage()
      .then((response) => {
        setResults(response.results);
        setImageUrl(response.imageUrl);
        setProcessing(false);
      })
      .catch((error) => {
        console.error(error);
        setProcessing(false);
      });
  };

  return (
    <>
      <h1>Computer Vision!</h1>
      <input type="text" id="inputImage" name="inputImage" />
      <button id="analyzeButton" onClick={handleAnalyzeImage}>
        {processing ? 'Procesando...' : 'Analizar imagen'}
      </button>
      <button id="generateButton">Generar imagen</button>
      {results.length > 0 && <DisplayResults results={results} imageUrl={imageUrl} />}
    </>
  );
}

export default App;