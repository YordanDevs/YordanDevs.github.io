// script.js

let shortsData = [];
let currentShortIndex = 0;

async function obtenerApiKey() {
    const response = await fetch('api_key.txt');
    return response.text();
}

async function buscar() {
    const query = document.getElementById('channelSearch').value;
    const apiKey = await obtenerApiKey();
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}&maxResults=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const canalesDiv = document.getElementById('canales');
        const videosDiv = document.getElementById('videos');
        canalesDiv.innerHTML = '';
        videosDiv.innerHTML = '';

        if (data.items && data.items.length > 0) {
            data.items.forEach(item => {
                if (item.id.kind === 'youtube#channel') {
                    const canalElement = document.createElement('div');
                    canalElement.classList.add('canal-card');
                    canalElement.innerHTML = `
                        <h3>${item.snippet.title}</h3>
                        <button onclick="mostrarVideosDeCanal('${item.id.channelId}')">Ver Videos</button>
                    `;
                    canalesDiv.appendChild(canalElement);
                } else if (item.id.kind === 'youtube#video') {
                    const videoElement = document.createElement('div');
                    videoElement.classList.add('video-card');
                    videoElement.innerHTML = `
                        <h3>${item.snippet.title}</h3>
                        <iframe src="https://www.youtube.com/embed/${item.id.videoId}" allowfullscreen></iframe>
                    `;
                    videosDiv.appendChild(videoElement);
                }
            });
        } else {
            document.getElementById('error').innerText = 'No se encontraron resultados.';
        }
    } catch (error) {
        console.error('Error al buscar:', error);
        document.getElementById('error').innerText = 'Error al cargar resultados. Inténtalo más tarde.';
    }
}

async function mostrarVideosDeCanal(canalId) {
    const apiKey = await obtenerApiKey();
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${canalId}&part=snippet,id&order=date&maxResults=10`;

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

async function cargarShorts() {
    const apiKey = await obtenerApiKey();
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoCategoryId=43&key=${apiKey}&maxResults=10`; // 43 es el ID de la categoría de Shorts

    try {
        const response = await fetch(url);
        const data = await response.json();
        shortsData = data.items; // Almacenar los shorts para navegación
        mostrarShort(currentShortIndex);
    } catch (error) {
        console.error('Error al cargar Shorts:', error);
    }
}

function mostrarShort(index) {
    const shortsView = document.getElementById('shorts-view');
    shortsView.innerHTML = '';

    if (shortsData.length > 0) {
        const short = shortsData[index];
        const shortElement = document.createElement('div');
        shortElement.classList.add('short-card');
        shortElement.innerHTML = `
            <h3>${short.snippet.title}</h3>
            <iframe src="https://www.youtube.com/embed/${short.id.videoId}" allowfullscreen></iframe>
        `;
        shortsView.appendChild(shortElement);
    }
}

function cambiarShort(direction) {
    currentShortIndex += direction;

    if (currentShortIndex < 0) {
        currentShortIndex = shortsData.length - 1; // Volver al último short
    } else if (currentShortIndex >= shortsData.length) {
        currentShortIndex = 0; // Volver al primer short
    }

    mostrarShort(currentShortIndex);
}

function mostrarShorts() {
    document.getElementById('shorts').style.display = 'block';
    document.getElementById('videos').style.display = 'none';
    document.getElementById('canales').style.display = 'none';
    cargarShorts();
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block'; // Alternar visibilidad
}

function mostrarVideos() {
    document.getElementById('search-container').style.display = 'block';
    document.getElementById('canales').style.display = 'none';
    document.getElementById('videos').style.display = 'block';
    document.getElementById('shorts').style.display = 'none';
    cargarVideosRecomendados();
}

function mostrarBuscarCanales() {
    document.getElementById('search-container').style.display = 'block';
    document.getElementById('canales').style.display = 'block';
    document.getElementById('videos').style.display = 'none';
    document.getElementById('shorts').style.display = 'none';
}
