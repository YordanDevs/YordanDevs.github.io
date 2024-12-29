document.getElementById('checkBtn').addEventListener('click', function() {  
    const serverInput = document.getElementById('serverIP').value;  
    const [ip, port] = serverInput.split(':');  

    if (!ip || !port) {  
        document.getElementById('result').innerHTML = `<h2>Por favor, ingresa la IP y el puerto en el formato IP:Puerto</h2>`;  
        return;  
    }  

    fetch(`https://api.mcsrvstat.us/2/${ip}:${port}`)  
        .then(response => response.json())  
        .then(data => {  
            const resultDiv = document.getElementById('result');  
            if (data.online) {  
                resultDiv.innerHTML = `  
                    <h2>Estado: Activo</h2>  
                    <p>IP: ${data.ip}</p>  
                    <p>Puerto: ${data.port}</p>  
                    <p>Jugadores Actuales: ${data.players.online}/${data.players.max}</p>  
                    <p>Versión: ${data.version}</p>  
                `;  
            } else {  
                resultDiv.innerHTML = `<h2>Estado: Inactivo</h2>`;  
            }  
        })  
        .catch(err => {  
            console.error(err);  
            document.getElementById('result').innerHTML = `<h2>Error al verificar el servidor</h2>`;  
        });  
});
