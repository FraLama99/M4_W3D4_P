let url = "https://jsonplaceholder.typicode.com/users";

async function fetchUsers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Errore nel fetch:', error);
        throw error;
    }
}


async function displayUsers(users) {
    try {
        const table = document.createElement('table');
        table.id = 'tabellaUtenti';
        table.className = 'table table-striped';
        table.innerHTML = `
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Website</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>${user.website}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;


        const tableContainer = document.getElementById('contenitoreTabella');
        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
    } catch (error) {
        console.error('Errore nella visualizzazione:', error);
    }
}
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const users = await fetchUsers();

        await displayUsers(users);
        initializeSearch(users);

    } catch (error) {
        console.error('Errore di inizializzazione:', error);
    }
});




function initializeSearch(users) {
    const searchInput = document.getElementById('inputFiltro');
    let filtroCascata = document.getElementById('filtroCascata');
    console.log(filtroCascata.value);
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const campoRicerca = e.target.value.toLowerCase();


        const filteredUsers = users.filter(user =>
            user[filtroCascata.value].toLowerCase().includes(campoRicerca)
        );
        console.log(filteredUsers, filtroCascata.value, campoRicerca);

        displayUsers(filteredUsers);
    });
}