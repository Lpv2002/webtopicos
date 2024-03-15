//--------BARRA DE HERRAMIENTAS LATERAL------------/

// Declaramos variables
var side_menu = document.getElementById("menu_side");
var btn_open = document.getElementById("btn_open");
var body = document.getElementById("body");

//-- Evento para mostrar el menú
side_menu.addEventListener("mouseover", function () {
    side_menu.classList.add("menu__side_move");
    body.classList.add("body_move");
});

// Evento para ocultar el menú
side_menu.addEventListener("mouseout", function () {
    side_menu.classList.remove("menu__side_move");
    body.classList.remove("body_move");
});

// Mostrar u ocultar submenús
var submenuItems = document.querySelectorAll(".has-submenu");

submenuItems.forEach(function (item) {
  item.addEventListener("click", function () {
    this.classList.toggle("open");
    var submenu = this.querySelector(".submenu");
    if (submenu) {
      submenu.classList.toggle("show");
    }
  });
});


// Ejecutar función en el evento click
btn_open.addEventListener("click", open_close_menu);

// Evento para mostrar y ocultar menú
function open_close_menu() {
    body.classList.toggle("body_move");
    side_menu.classList.toggle("menu__side_move");
}

// Si el ancho de la página es menor a 760px, ocultará el menú al recargar la página
if (window.innerWidth < 760) {
    body.classList.add("body_move");
    side_menu.classList.add("menu__side_move");
}

// Haciendo el menú responsive (adaptable)
window.addEventListener("resize", function () {
    if (window.innerWidth > 760) {
        body.classList.remove("body_move");
        side_menu.classList.remove("menu__side_move");
    }
    if (window.innerWidth < 760) {
        body.classList.add("body_move");
        side_menu.classList.add("menu__side_move");
    }
});

// Agregar funcionalidad para desplegar submenús
var gestionItem = document.querySelector(".options__menu a:nth-child(2)");

gestionItem.addEventListener("click", function (event) {
    event.preventDefault();
    gestionItem.classList.toggle("active");
    var subMenus = gestionItem.nextElementSibling;
    subMenus.classList.toggle("show");
});
