// azure-image-analysis.js
async function analyzeImage(imageUrl) {
    const apiKey = '62a33e192ef14682b513a1340e51dabd'; // Reemplaza con tu propia clave de API
    const endpoint = 'https://generacionyanalisisdeimagenes.cognitiveservices.azure.com/';
    const features = 'description,objects'; // Personaliza las características visuales que deseas obtener

    const params = new URLSearchParams({
        visualFeatures: features,
        language: 'es'
    });

    const url = `${endpoint}?${params.toString()}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': apiKey
        },
        body: JSON.stringify({
            url: imageUrl
        })
    });

    const data = await response.json();
    return data;
}

export default analyzeImage;
