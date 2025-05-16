fetch('equipos.json')
  .then(response => response.json())
  .then(data => {
    const ligas = Object.keys(data);
    const ligaSelect = document.createElement('select');
    ligaSelect.id = 'ligaSelect';

    // Crear opción por cada liga
    ligas.forEach(liga => {
      const option = document.createElement('option');
      option.value = liga;
      option.textContent = liga.toUpperCase();
      ligaSelect.appendChild(option);
    });

    const equiposDiv = document.createElement('div');
    equiposDiv.id = 'equiposDiv';

    const app = document.getElementById('app');
    app.appendChild(ligaSelect);
    app.appendChild(equiposDiv);

    // Mostrar equipos de la liga seleccionada
    function mostrarEquipos() {
      const ligaSeleccionada = ligaSelect.value;
      equiposDiv.innerHTML = '';
      const equipos = data[ligaSeleccionada];
      equipos.forEach(equipo => {
        const p = document.createElement('p');
        p.textContent = equipo;
        equiposDiv.appendChild(p);
      });
    }

    ligaSelect.addEventListener('change', mostrarEquipos);
    mostrarEquipos(); // Inicial
  })
  .catch(error => console.error('Error cargando equipos.json:', error));
function cargarPartidosDeHoy() {
  const API_TOKEN = '0102ba8c03cf42c1b7b1e9217bc9501e'; // Pon aquí tu token real

  fetch('https://api.football-data.org/v4/matches?dateFrom=today&dateTo=today', {
    headers: { 'X-Auth-Token': API_TOKEN }
  })
  .then(response => response.json())
  .then(data => {
    const partidos = data.matches;
    const container = document.getElementById('app');

    // Crear contenedor o limpiar si ya existe
    let partidosDiv = document.getElementById('partidosHoy');
    if (!partidosDiv) {
      partidosDiv = document.createElement('div');
      partidosDiv.id = 'partidosHoy';
      container.appendChild(partidosDiv);
    }
    partidosDiv.innerHTML = '<h2>Partidos de hoy</h2>';

    if (partidos.length === 0) {
      partidosDiv.innerHTML += '<p>No hay partidos programados para hoy.</p>';
      return;
    }

    partidos.forEach(partido => {
      const div = document.createElement('div');
      div.className = 'partido';
      div.innerHTML = `
        <h3>${partido.competition.name}</h3>
        <p>${partido.homeTeam.name} vs ${partido.awayTeam.name}</p>
        <p>Hora: ${new Date(partido.utcDate).toLocaleTimeString()}</p>
        <p>Estado: ${partido.status}</p>
      `;
      partidosDiv.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Error cargando los partidos:', error);
  });
}

// Llamar a la función para que cargue los partidos
cargarPartidosDeHoy();




