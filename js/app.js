document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - Iniciando script...');
    
    // ============================================
    // LIGHTBOX - CÓDIGO DEPURADO
    // ============================================
    
    // Elementos del lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImagen = document.getElementById('lightbox-imagen');
    const lightboxTitulo = document.getElementById('lightbox-titulo');
    const lightboxDescripcion = document.getElementById('lightbox-descripcion');
    const lightboxPrecios = document.getElementById('lightbox-precios');
    const lightboxCerrar = document.querySelector('.lightbox-cerrar');
    
    console.log('Elementos lightbox:', {
        lightbox,
        lightboxImagen,
        lightboxTitulo,
        lightboxDescripcion,
        lightboxPrecios,
        lightboxCerrar
    });
    
    // Hacer cada fila de plato clicable
    const filasPlato = document.querySelectorAll('.fila-plato');
    console.log('Filas de plato encontradas:', filasPlato.length);
    
    filasPlato.forEach((fila, index) => {
        fila.style.cursor = 'pointer';
        fila.setAttribute('title', 'Haz clic para ver detalles');
        
        fila.addEventListener('click', function(e) {
            console.log('Clic en fila:', index);
            
            // Prevenir que se active si se hace clic en enlaces dentro de la fila
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                console.log('Clic en enlace, ignorando...');
                return;
            }
            
            // Obtener datos del plato
            const imagen = this.querySelector('.imagen-plato img');
            const titulo = this.querySelector('.info-plato strong');
            const descripcion = this.querySelector('.info-plato p');
            const precios = this.querySelectorAll('.precios span');
            
            console.log('Datos encontrados:', {
                imagen: imagen ? 'Sí' : 'No',
                titulo: titulo ? 'Sí' : 'No',
                descripcion: descripcion ? 'Sí' : 'No',
                precios: precios.length
            });
            
            // Si hay imagen y título, mostrar lightbox
            if (imagen && titulo) {
                console.log('Mostrando lightbox con imagen:', imagen.src);
                
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
                    console.log('Postre detectado');
                    lightboxPrecios.classList.add('postre');
                    const span = document.createElement('span');
                    span.textContent = precios[0].textContent;
                    span.setAttribute('data-tipo', 'Porción');
                    lightboxPrecios.appendChild(span);
                } else if (precios.length >= 2) {
                    // Son tapas (dos precios)
                    console.log('Tapa/Ración detectada');
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
                
                console.log('Lightbox activado');
            } else {
                console.warn('No se encontraron datos necesarios para el lightbox');
            }
        });
    });
    
    // Cerrar lightbox con botón
    if (lightboxCerrar) {
        lightboxCerrar.addEventListener('click', function() {
            console.log('Cerrando lightbox con botón');
            cerrarLightbox();
        });
    }
    
    // Cerrar lightbox al hacer clic fuera del contenido
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            console.log('Cerrando lightbox (clic fuera)');
            cerrarLightbox();
        }
    });
    
    // Cerrar lightbox con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('activo')) {
            console.log('Cerrando lightbox (tecla ESC)');
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
    
    console.log('Lightbox configurado correctamente');
    
    // ============================================
    // BOTÓN SUBIR (tu código existente)
    // ============================================
    const btnSubir = document.getElementById('btn-subir');
    
    if (btnSubir) {
        console.log('Botón subir encontrado');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                btnSubir.style.display = 'flex';
            } else {
                btnSubir.style.display = 'none';
            }
        });
        
        btnSubir.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    } else {
        console.warn('Botón subir no encontrado');
    }
    
    // ============================================
    // FECHA AUTOMÁTICA (tu código existente)
    // ============================================
    const fechaElemento = document.getElementById('fecha-auto');
    
    if (fechaElemento) {
        console.log('Elemento fecha encontrado');
        
        const hoy = new Date();
        
        const diasSemana = [
            'Domingo',
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado'
        ];
        
        const meses = [
            'enero',
            'febrero',
            'marzo',
            'abril',
            'mayo',
            'junio',
            'julio',
            'agosto',
            'septiembre',
            'octubre',
            'noviembre',
            'diciembre'
        ];
        
        const diaSemana = diasSemana[hoy.getDay()];
        const dia = hoy.getDate();
        const mes = meses[hoy.getMonth()];
        const ano = hoy.getFullYear();
        
        fechaElemento.textContent = `${diaSemana}, ${dia} de ${mes} de ${ano}`;
        
        console.log('Fecha actualizada:', fechaElemento.textContent);
    } else {
        console.warn('Elemento fecha no encontrado');
    }
    
    console.log('Script cargado completamente');
});
