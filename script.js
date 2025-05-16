import equipos from './equipos.json' assert { type: 'json' };

const paisSelector = document.getElementById("selector-pais");
const ligaSelector = document.getElementById("selector-liga");
const container = document.getElementById("partidos-container");

function cargarPaises() {
  const paises = Object.keys(equipos);
  paises.forEach(pais => {
    const option = document.createElement("option");
    option.value = pais;
    option.textContent = pais;
    paisSelector.appendChild(option);
  });
}

function cargarLigas(pais) {
  ligaSelector.innerHTML = '';
  equipos[pais].forEach(liga => {
    const option = document.createElement("option");
    option.value = liga.codigo;
    option.textContent = liga.nombre;
    ligaSelector.appendChild(option);
  });
}

function mostrarPartidosFake() {
  container.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const div = document.createElement("div");
    div.className = 'partido';
    div.innerHTML = `
      <strong>Equipo A</strong> vs <strong>Equipo B</strong><br/>
      Predicción: <b>1</b> | Goles: 2-1 | Ambos anotan: Sí
    `;
    container.appendChild(div);
  }
}

paisSelector.addEventListener("change", (e) => {
  cargarLigas(e.target.value);
  mostrarPartidosFake();
});

ligaSelector.addEventListener("change", () => {
  mostrarPartidosFake(); // Aquí se conecta con la API real
});

cargarPaises();




