const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const dayError = document.getElementById("dayError");
const monthError = document.getElementById("monthError");
const yearError = document.getElementById("yearError");
const resultadoDiv = document.querySelector(".resultado");

function validarCampo(
  campo,
  valorMinimo,
  valorMaximo,
  elementoError,
  mensajeVacio,
  mensajeInvalido
) {
  const valor = parseInt(campo.value);

  switch (true) {
    case isNaN(valor) || valor < valorMinimo || valor > valorMaximo:
      elementoError.textContent = mensajeInvalido;
      campo.style.border = "2px solid red";
      break;
    case valor >= valorMinimo && valor <= valorMaximo:
      elementoError.textContent = "";
      campo.style.border = "2px solid green";
      break;
    default:
      break;
  }

  // Validación del campo vacío
  if (campo.value === "") {
    elementoError.textContent = mensajeVacio;
    campo.style.border = "2px solid red";
  }
}

// Llamadas a la función con los campos respectivos
day.addEventListener("blur", function () {
  validarCampo(
    day,
    1,
    31,
    dayError,
    "Este campo es requerido.",
    "Por favor, ingresa un número válido."
  );
});

month.addEventListener("blur", function () {
  validarCampo(
    month,
    1,
    12,
    monthError,
    "Este campo es requerido.",
    "Por favor, ingresa un número válido."
  );
});

year.addEventListener("blur", function () {
  validarCampo(
    year,
    1900,
    2023,
    yearError,
    "Este campo es requerido.",
    "Por favor, ingresa un número válido."
  );
});

//RESULTADO

day.addEventListener("input", calcularEdad);
month.addEventListener("input", calcularEdad);
year.addEventListener("input", calcularEdad);

function calcularEdad() {
  const dia = parseInt(day.value);
  const mes = parseInt(month.value);
  const ano = parseInt(year.value);

  const fechaNacimiento = new Date(ano, mes - 1, dia);
  const fechaActual = new Date();

  if (isNaN(fechaNacimiento.getTime())) {
    resultadoDiv.textContent = "Ingresa una fecha de nacimiento válida.";
  } else {
    const diferencia = fechaActual - fechaNacimiento;
    const edad = new Date(diferencia);

    const anos = Math.abs(edad.getUTCFullYear() - 1970);
    const meses = edad.getUTCMonth();
    const dias = edad.getUTCDate() - 1;

    resultadoDiv.textContent = `Tienes ${anos} años, ${meses} meses y ${dias} días.`;
  }
}
