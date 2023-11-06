const adds = document.querySelector('.layaout_section');
const estrella = document.querySelector('.estrella');
const contenedorDatos = document.querySelector('.layaout_table_contains');
const tbody = document.querySelector('.layaout_table tbody');
const carrito = document.querySelector('.layaout_table');
let articulos = [];

cargar();

function cargar() {
    adds.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
}

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const mostrar = e.target.parentElement.parentElement;
        leerdato(mostrar);
    }
}

function eliminarCurso(a) {
    if (a.target.classList.contains('num')) {
        const cursoId = a.target.getAttribute('data-id');

        articulos = articulos.filter(cursos => cursos.id !== cursoId);
        carritoHtml();
    }
}

function leerdato(cursos) {
    let infoCurso = {
        imagen: cursos.querySelector('img').src,
        titulo: cursos.querySelector('h4').textContent,
        precio: cursos.querySelector('.valor').textContent,
        id: cursos.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    const existe = articulos.some(cursos => cursos.id === infoCurso.id);
    if (existe) {
        const existeCursos = articulos.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        carritoHtml();
        mostrarMensaje("Curso agregado al carrito");
    } else {
        articulos = [...articulos, infoCurso];
        carritoHtml();
        mostrarMensaje("Curso agregado al carrito");
    }
}

function carritoHtml() {
    limpiarCarrito();
    articulos.forEach(valores => {
        const filas = document.createElement('tr');
        filas.innerHTML = `
            <td>
                <img src="${valores.imagen}" width="100px">
            </td>
            <td>
                ${valores.titulo}
            </td>
            <td>
                ${valores.precio}
            </td>
            <td>
                ${valores.cantidad}
            </td>
            <td>
                <a href="#" class="num" data-id=${valores.id}> x </a>
            </td>
        `;
        tbody.appendChild(filas);
    });
}

function limpiarCarrito() {
    tbody.innerHTML = '';
}
function mostrarMensaje(mensaje) {
    Swal.fire({
        title: '¡Curso agregado al carrito!',
        text: mensaje,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false
    });
}

let datosVisible = false;

estrella.addEventListener('click', () => {
    if (datosVisible) {
        contenedorDatos.style.display = 'none';
        datosVisible = false;
    } else {
        contenedorDatos.style.display = 'flex';
        datosVisible = true;
    }
});
