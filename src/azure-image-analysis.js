// azure-image-analysis.js
async function analyzeImage(imageUrl) {
    const apiKey = '1442bfd2c3934279a9185aacfb7247b9';
    const endpoint = 'https://generacionyanalisisdeimagenes.cognitiveservices.azure.com/';
    const features = 'description,objects'; // Personaliza las características visuales que deseas obtener

    const params = new URLSearchParams({
        visualFeatures: features,
        language: 'es'
    });

    const url = `${endpoint}vision/v3.1/analyze?${params.toString()}`;

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
