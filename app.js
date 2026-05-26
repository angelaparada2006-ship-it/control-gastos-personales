let transacciones = [];

const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");
const balance = document.getElementById("balance");
const ingresos = document.getElementById("ingresos");
const gastos = document.getElementById("gastos");
const tipo = document.getElementById("tipo");
const categoria = document.getElementById("categoria");

const categorias = {
  ingreso: ["Salario", "Ventas", "Otros"],
  gasto: ["Comida", "Transporte", "Vivienda", "Ocio", "Educacion", "Otros"]
};

tipo.addEventListener("change", cargarCategorias);
cargarCategorias();

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const descripcion = document.getElementById("descripcion").value;
  const monto = Number(document.getElementById("monto").value);
  const fecha = document.getElementById("fecha").value;

  if (descripcion === "" || monto <= 0 || fecha === "") {
    alert("Completa la descripcion, la fecha y un monto mayor a 0.");
    return;
  }

  const nueva = {
    descripcion: descripcion,
    monto: monto,
    fecha: fecha,
    tipo: tipo.value,
    categoria: categoria.value
  };

  transacciones.push(nueva);
  formulario.reset();
  cargarCategorias();
  mostrarTransacciones();
});

function cargarCategorias() {
  categoria.innerHTML = "";

  categorias[tipo.value].forEach(function (nombre) {
    categoria.innerHTML += `<option value="${nombre}">${nombre}</option>`;
  });
}

function mostrarTransacciones() {
  lista.innerHTML = "";

  transacciones.forEach(function (item, indice) {
    const signo = item.tipo === "ingreso" ? "+$" : "-$";

    lista.innerHTML += `
      <div class="item ${item.tipo}">
        <div>
          <h3>${item.descripcion}</h3>
          <p>${item.categoria} - ${item.fecha}</p>
        </div>
        <div class="acciones">
          <span class="monto">${signo}${item.monto}</span>
          <button onclick="eliminarTransaccion(${indice})">X</button>
        </div>
      </div>
    `;
  });

calcularResumen();
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

function eliminarTransaccion(indice) {
  transacciones.splice(indice, 1);
  mostrarTransacciones();
}

function calcularResumen() {
  let totalIngresos = 0;
  let totalGastos = 0;

  transacciones.forEach(function (item) {
    if (item.tipo === "ingreso") {
      totalIngresos += item.monto;
    } else {
      totalGastos += item.monto;
    }
  });

  ingresos.textContent = "$" + totalIngresos;
  gastos.textContent = "$" + totalGastos;
  balance.textContent = "$" + (totalIngresos - totalGastos);
}
