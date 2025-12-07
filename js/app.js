document.addEventListener('DOMContentLoaded', function() {
    // Elementos del lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImagen = document.getElementById('lightbox-imagen');
    const lightboxTitulo = document.getElementById('lightbox-titulo');
    const lightboxDescripcion = document.getElementById('lightbox-descripcion');
    const lightboxPrecios = document.getElementById('lightbox-precios');
    const lightboxCerrar = document.querySelector('.lightbox-cerrar');
    
    // Hacer cada fila de plato clicable
    const filasPlato = document.querySelectorAll('.fila-plato');
    
    filasPlato.forEach(fila => {
        fila.addEventListener('click', function(e) {
            // Prevenir que se active si se hace clic en enlaces dentro de la fila
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            // Obtener datos del plato
            const imagen = this.querySelector('.imagen-plato img');
            const titulo = this.querySelector('.info-plato strong');
            const descripcion = this.querySelector('.info-plato p');
            const precios = this.querySelectorAll('.precios span');
            
            // Si hay imagen, mostrar lightbox
            if (imagen && titulo) {
                // Configurar imagen
                lightboxImagen.src = imagen.src;
                lightboxImagen.alt = imagen.alt;
                
                // Configurar título y descripción
                lightboxTitulo.textContent = titulo.textContent;
                lightboxDescripcion.textContent = descripcion ? descripcion.textContent : '';
                
                // Configurar precios
                lightboxPrecios.innerHTML = '';
                lightboxPrecios.className = 'lightbox-precios';
                
                if (precios.length === 1) {
                    // Es un postre (un solo precio)
                    lightboxPrecios.classList.add('postre');
                    const span = document.createElement('span');
                    span.textContent = precios[0].textContent;
                    span.setAttribute('data-tipo', 'Porción');
                    lightboxPrecios.appendChild(span);
                } else if (precios.length >= 2) {
                    // Son tapas (dos precios)
                    const tipos = ['Tapa', 'Ración'];
                    precios.forEach((precio, index) => {
                        if (index < 2) { // Solo primeros dos precios
                            const span = document.createElement('span');
                            span.textContent = precio.textContent;
                            span.setAttribute('data-tipo', tipos[index]);
                            lightboxPrecios.appendChild(span);
                        }
                    });
                }
                
                // Mostrar lightbox
                lightbox.classList.add('activo');
                document.body.style.overflow = 'hidden'; // Prevenir scroll
            }
        });
    });
    
    // Cerrar lightbox con botón
    lightboxCerrar.addEventListener('click', function() {
        cerrarLightbox();
    });
    
    // Cerrar lightbox al hacer clic fuera del contenido
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            cerrarLightbox();
        }
    });
    
    // Cerrar lightbox con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('activo')) {
            cerrarLightbox();
        }
    });
    
    function cerrarLightbox() {
        lightbox.classList.remove('activo');
        document.body.style.overflow = 'auto'; // Restaurar scroll
        
        // Limpiar después de la animación
        setTimeout(() => {
            lightboxImagen.src = '';
            lightboxTitulo.textContent = '';
            lightboxDescripcion.textContent = '';
            lightboxPrecios.innerHTML = '';
        }, 300);
    }

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

