let transacciones = [];
let indiceEditando = null;

const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");
const balance = document.getElementById("balance");
const ingresos = document.getElementById("ingresos");
const gastos = document.getElementById("gastos");
const tipo = document.getElementById("tipo");
const categoria = document.getElementById("categoria");
const tituloFormulario = document.getElementById("tituloFormulario");
const botonGuardar = document.getElementById("botonGuardar");
const botonCancelar = document.getElementById("botonCancelar");
const mensajeError = document.getElementById("mensajeError");

const filtroTipo = document.getElementById("filtroTipo");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroMes = document.getElementById("filtroMes");
const buscar = document.getElementById("buscar");

const categorias = {
  ingreso: ["Salario", "Ventas", "Otros"],
  gasto: ["Comida", "Transporte", "Vivienda", "Ocio", "Educacion", "Otros"]
};

tipo.addEventListener("change", cargarCategorias);
formulario.addEventListener("submit", guardarTransaccion);
botonCancelar.addEventListener("click", cancelarEdicion);
filtroTipo.addEventListener("change", mostrarTransacciones);
filtroCategoria.addEventListener("change", mostrarTransacciones);
filtroMes.addEventListener("input", mostrarTransacciones);
buscar.addEventListener("input", mostrarTransacciones);

cargarCategorias();
cargarFiltroCategorias();
mostrarTransacciones();

function guardarTransaccion(evento) {
  evento.preventDefault();
  mensajeError.textContent = "";

  const descripcion = document.getElementById("descripcion").value.trim();
  const monto = Number(document.getElementById("monto").value);
  const fecha = document.getElementById("fecha").value;

  if (descripcion === "") {
    mensajeError.textContent = "La descripcion es obligatoria.";
    return;
  }

  if (monto <= 0) {
    mensajeError.textContent = "El monto debe ser mayor a 0.";
    return;
  }

  if (fecha === "" || isNaN(new Date(fecha).getTime())) {
    mensajeError.textContent = "La fecha debe ser valida.";
    return;
  }

  const transaccion = {
    descripcion: descripcion,
    monto: monto,
    fecha: fecha,
    tipo: tipo.value,
    categoria: categoria.value
  };

  if (indiceEditando === null) {
    transacciones.push(transaccion);
  } else {
    transacciones[indiceEditando] = transaccion;
  }

  cancelarEdicion();
  cargarFiltroCategorias();
  mostrarTransacciones();
}

function cargarCategorias() {
  categoria.innerHTML = "";

  categorias[tipo.value].forEach(function (nombre) {
    categoria.innerHTML += `<option value="${nombre}">${nombre}</option>`;
  });
}

function cargarFiltroCategorias() {
  filtroCategoria.innerHTML = `<option value="todas">Todas</option>`;

  Object.values(categorias).flat().forEach(function (nombre) {
    if (!filtroCategoria.innerHTML.includes(`>${nombre}<`)) {
      filtroCategoria.innerHTML += `<option value="${nombre}">${nombre}</option>`;
    }
  });
}

function mostrarTransacciones() {
  lista.innerHTML = "";

  const filtradas = transacciones.filter(function (item) {
    const mes = item.fecha.slice(0, 7);
    const texto = buscar.value.toLowerCase();

    return (
      (filtroTipo.value === "todos" || item.tipo === filtroTipo.value) &&
      (filtroCategoria.value === "todas" || item.categoria === filtroCategoria.value) &&
      (filtroMes.value === "" || mes === filtroMes.value) &&
      item.descripcion.toLowerCase().includes(texto)
    );
  });

  if (filtradas.length === 0) {
    lista.innerHTML = `<div class="vacio">No hay transacciones para mostrar.</div>`;
  }

  filtradas.forEach(function (item) {
    const indice = transacciones.indexOf(item);
    const signo = item.tipo === "ingreso" ? "+$" : "-$";

    lista.innerHTML += `
      <div class="item ${item.tipo}">
        <div>
          <h3>${item.descripcion}</h3>
          <p>${item.categoria} - ${item.fecha}</p>
        </div>
        <div class="acciones">
          <span class="monto">${signo}${item.monto}</span>
          <button class="editar" onclick="editarTransaccion(${indice})">Editar</button>
          <button class="eliminar" onclick="eliminarTransaccion(${indice})">X</button>
        </div>
      </div>
    `;
  });

  calcularResumen();
}

function editarTransaccion(indice) {
  const item = transacciones[indice];

  document.getElementById("descripcion").value = item.descripcion;
  document.getElementById("monto").value = item.monto;
  document.getElementById("fecha").value = item.fecha;
  tipo.value = item.tipo;
  cargarCategorias();
  categoria.value = item.categoria;

  indiceEditando = indice;
  tituloFormulario.textContent = "Editar transaccion";
  botonGuardar.textContent = "Guardar cambios";
  botonCancelar.style.display = "block";
}

function eliminarTransaccion(indice) {
  const confirmar = confirm("Deseas eliminar esta transaccion?");

  if (confirmar) {
    transacciones.splice(indice, 1);
    cancelarEdicion();
    cargarFiltroCategorias();
    mostrarTransacciones();
  }
}

function cancelarEdicion() {
  formulario.reset();
  cargarCategorias();
  indiceEditando = null;
  tituloFormulario.textContent = "Agregar transaccion";
  botonGuardar.textContent = "Agregar";
  botonCancelar.style.display = "none";
  mensajeError.textContent = "";
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

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
