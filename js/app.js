const btnSubir = document.getElementById("btn-subir");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        btnSubir.style.display = "flex";
    } else {
        btnSubir.style.display = "none";
    }
});

btnSubir.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- Fecha automática con día de la semana y mes en español ---
const fechaElemento = document.getElementById("fecha-auto");

if (fechaElemento) {
    const hoy = new Date();

    const diasSemana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
    ];

    const meses = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
    ];

    const diaSemana = diasSemana[hoy.getDay()];
    const dia = hoy.getDate();
    const mes = meses[hoy.getMonth()];
    const ano = hoy.getFullYear();

    fechaElemento.textContent = `${diaSemana}, ${dia} de ${mes} de ${ano}`;
}

