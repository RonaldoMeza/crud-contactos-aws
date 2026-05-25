const API_URL = 'http://localhost:3000/contacts';

// Elementos del DOM
const contactForm = document.getElementById('contact-form');
const contactIdInput = document.getElementById('contact-id');
const nombreInput = document.getElementById('nombre');
const telefonoInput = document.getElementById('telefono');
const emailInput = document.getElementById('email');
const direccionInput = document.getElementById('direccion');
const contactsBody = document.getElementById('contacts-body');
const formTitle = document.getElementById('form-title');
const btnSubmit = document.getElementById('btn-submit');
const btnCancel = document.getElementById('btn-cancel');
const searchInput = document.getElementById('search-input');
const messageContainer = document.getElementById('message-container');

let allContacts = [];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
});

// Cargar contactos
async function loadContacts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al cargar contactos');
        allContacts = await response.json();
        renderContacts(allContacts);
    } catch (error) {
        showMessage(error.message, 'error');
        contactsBody.innerHTML = '<tr><td colspan="5" class="text-center">Error al conectar con el servidor</td></tr>';
    }
}

// Renderizar contactos en la tabla
function renderContacts(contacts) {
    if (contacts.length === 0) {
        contactsBody.innerHTML = '<tr><td colspan="5" class="text-center">No hay contactos registrados</td></tr>';
        return;
    }

    contactsBody.innerHTML = contacts.map(contact => `
        <tr>
            <td>${contact.nombre}</td>
            <td>${contact.telefono}</td>
            <td>${contact.email || '-'}</td>
            <td>${contact.direccion || '-'}</td>
            <td class="actions">
                <button class="btn btn-secondary btn-small" onclick="editContact(${contact.id})">Editar</button>
                <button class="btn btn-danger btn-small" onclick="deleteContact(${contact.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

// Manejar envío del formulario (Crear/Editar)
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const contactData = {
        nombre: nombreInput.value,
        telefono: telefonoInput.value,
        email: emailInput.value || undefined,
        direccion: direccionInput.value || undefined
    };

    const id = contactIdInput.value;
    const isEditing = !!id;

    try {
        const url = isEditing ? `${API_URL}/${id}` : API_URL;
        const method = isEditing ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al procesar la solicitud');
        }

        showMessage(isEditing ? 'Contacto actualizado con éxito' : 'Contacto creado con éxito', 'success');
        resetForm();
        loadContacts();
    } catch (error) {
        showMessage(error.message, 'error');
    }
});

// Editar contacto
async function editContact(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('No se pudo obtener el contacto');
        const contact = await response.json();

        contactIdInput.value = contact.id;
        nombreInput.value = contact.nombre;
        telefonoInput.value = contact.telefono;
        emailInput.value = contact.email || '';
        direccionInput.value = contact.direccion || '';

        formTitle.innerText = 'Editar Contacto';
        btnSubmit.innerText = 'Actualizar Contacto';
        btnCancel.style.display = 'inline-block';
        
        // Scroll al formulario
        contactForm.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

// Eliminar contacto
async function deleteContact(id) {
    if (!confirm('¿Estás seguro de eliminar este contacto?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error al eliminar contacto');

        showMessage('Contacto eliminado con éxito', 'success');
        loadContacts();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

// Buscar contactos
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allContacts.filter(contact => 
        contact.nombre.toLowerCase().includes(term) || 
        contact.telefono.includes(term) ||
        (contact.email && contact.email.toLowerCase().includes(term))
    );
    renderContacts(filtered);
});

// Cancelar edición
btnCancel.addEventListener('click', () => {
    resetForm();
});

// Limpiar formulario
function resetForm() {
    contactForm.reset();
    contactIdInput.value = '';
    formTitle.innerText = 'Registrar Nuevo Contacto';
    btnSubmit.innerText = 'Guardar Contacto';
    btnCancel.style.display = 'none';
}

// Mostrar mensajes
function showMessage(text, type) {
    messageContainer.innerText = text;
    messageContainer.className = `message ${type}`;
    
    setTimeout(() => {
        messageContainer.className = 'message';
    }, 3000);
}
