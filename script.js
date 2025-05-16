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


