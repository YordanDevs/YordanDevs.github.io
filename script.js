async function obtenerApiKey() {
    const response = await fetch('api_key.txt');
    return response.text();
}

async function buscarCanal() {
    const query = document.getElementById('channelSearch').value;
    const apiKey = await obtenerApiKey();
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${query}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const canalesDiv = document.getElementById('canales');
        canalesDiv.innerHTML = '';
        document.getElementById('videos').innerHTML = ''; // Limpiar videos al buscar nuevo canal

        if (data.items && data.items.length > 0) {
            data.items.forEach(canal => {
                const canalElement = document.createElement('div');
                canalElement.classList.add('canal-card');
                canalElement.innerHTML = `
                    <h3>${canal.snippet.title}</h3>
                    <button onclick="verVideos('${canal.id.channelId}')">Ver Videos</button>
                `;
                canalesDiv.appendChild(canalElement);
            });
        } else {
            document.getElementById('error').innerText = 'No se encontraron canales.';
        }
    } catch (error) {
        console.error('Error al buscar canales:', error);
        document.getElementById('error').innerText = 'Error al cargar canales. Inténtalo más tarde.';
    }
}

async function verVideos(channelId) {
    const apiKey = await obtenerApiKey();
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const videosDiv = document.getElementById('videos');
        videosDiv.innerHTML = '';

        if (data.items && data.items.length > 0) {
            data.items.forEach(video => {
                const videoElement = document.createElement('div');
                videoElement.classList.add('video-card');
                videoElement.innerHTML = `
                    <h3>${video.snippet.title}</h3>
                    <iframe src="https://www.youtube.com/embed/${video.id.videoId}" allowfullscreen></iframe>
                `;
                videosDiv.appendChild(videoElement);
            });
        } else {
            document.getElementById('error').innerText = 'No se encontraron videos.';
        }
    } catch (error) {
        console.error('Error al obtener videos:', error);
        document.getElementById('error').innerText = 'Error al cargar videos. Inténtalo más tarde.';
    }
}
