document.getElementById('serverForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const ip = document.getElementById('ip').value;
    const port = document.getElementById('port').value;
    
    fetch(`https://api.servers.com/check?ip=${ip}&port=${port}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            if (data.active) {
                resultDiv.innerHTML = `<h2>Servidor Activo</h2>
                                       <p>Jugadores en línea: ${data.players}</p>`;
            } else {
                resultDiv.innerHTML = `<h2>Servidor No Activo</h2>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = '<h2>Error al consultar el servidor</h2>';
        });
});
