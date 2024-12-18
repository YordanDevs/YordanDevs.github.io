const axios = require('axios');

const ACCESS_TOKEN = '148d8a6b28a2d5380956de46f3d82eeb'; // Reemplaza con tu Access Token

async function obtenerVideos() {
    try {
        const response = await axios.get('https://api.vimeo.com/videos', {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error al obtener videos:', error);
    }
}

obtenerVideos();
