const btn = document.getElementById("btn");
const contenido = document.querySelector("#contenido p");

btn.addEventListener("click", () => {
  contenido.textContent = "¡El texto cambió con JavaScript!";
});
