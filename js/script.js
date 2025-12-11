document.addEventListener("DOMContentLoaded", function () {
    const contenido = document.getElementById("contenido");

    function loadSection(page) {
        // aseguramos extensión .html
        if (!page.endsWith(".html")) page += ".html";

        fetch(page)
            .then(res => res.text())
            .then(html => {
                contenido.innerHTML = html;

                // Detectar si viene un proyecto desde los botones de portafolio
                const params = new URLSearchParams(window.location.search);
                const proyecto = params.get("proyecto");

                if (page === "contacto.html" && proyecto) {
                    setTimeout(() => {
                        const mensajeEl = document.getElementById("mensaje");
                        if (mensajeEl) {
                            mensajeEl.value = "Quiero saber más del proyecto: " + proyecto;
                        }
                    }, 50);
                }
            })
            .catch(() => {
                contenido.innerHTML = "<p style='color:red'>Error cargando la sección.</p>";
            });
    }

    // Detectar si la URL pidió una sección específica
    const params = new URLSearchParams(window.location.search);
    const sectionURL = params.get("section");

    if (sectionURL) {
        loadSection(sectionURL);
    } else {
        loadSection("acerca");
    }

    // Botones del sidebar
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            loadSection(btn.dataset.section);
        });
    });

    // Tabs superiores
    document.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            loadSection(tab.dataset.section);
        });
    });
});
