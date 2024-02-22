import usersStore from '../../store/users-store';
import { deleteUserById } from '../../use-case/delete-user-by-id';
import { showModal } from '../render-modal/render-modal';
import './render-table.css';

/**
 * 
 * @param {HTMLDivElement} element 
 */


let table;

const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
    <tr>
        <th>#ID</th>
        <th>Balance</th>
        <th>FirtsName</th>
        <th>Lastname</th>
        <th>Active</th>
        <th>Actions</th>

    </tr>
    
    `;

    const tableBody = document.createElement('tbody');
    table.append(tableHeaders, tableBody)
    return table;
}


/**
 * 
 * @param {MouseEvent} e 
 */
const tableSelectListener = (e) => {
    const element = e.target.closest('.select-user');
   // console.log(element);
    if (!element) return;

    const id = element.getAttribute('data-id');
    showModal(id);
}



/**
 * @param {MouseEvent} event 
 */
const tableDeleteListener = async(event) => {
    const element = event.target.closest('.delete-user');
    if ( !element ) return;

    const id = element.getAttribute('data-id');
    try {
        await deleteUserById(id);
        await usersStore.reloadPage();
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();
        
    } catch (error) {
        console.log(error);
        alert('No se pudo eliminar');
    }

}


export const renderTable = (element) => {

    const users = usersStore.getUsers();

    if (!table) {
        table = createTable();
        element.append(table);

        //Todo: Listeners a la table
        table.addEventListener('click', tableSelectListener);
        table.addEventListener('click', tableDeleteListener);
    };


    let tableHTML = '';

    users.forEach(user => {
        tableHTML += `
        <tr>
            <td>${user.id}</td>
            <td>${user.balance}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.isActive}</td>
            <td>
                
            <a herf= '#/'class="select-user" data-id="${user.id}" >Select</a>
                
            <a herf= '#/'class="delete-user" data-id="${user.id}" >Delete</a>
            </td>
        </tr>
        
        `

        // console.log('user-render table'+user.id);
    });

    table.querySelector('tbody').innerHTML = tableHTML;
};