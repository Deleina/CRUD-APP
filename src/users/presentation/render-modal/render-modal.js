import modalHtml from "./render-modal.html?raw";
import "./render-modal.css";
import { User } from "../../models/user";
import { getUserById } from "../../use-case/get-user-by-id";


let modal, form;
let loaderUser = {};



//todo: cargar usuario por id
export const showModal = async (id) => {
    modal?.classList.remove('hide-modal');
    loaderUser = {};

    if (!id) {
        return;
    }

    const user = await getUserById(id);
    setFormValues(user);

}




/**
 * 
 * @param {User} user 
 */
const setFormValues = (user) => {

    form.querySelector('[name = "firstName"]').value = user.firstName;
    form.querySelector('[name = "lastName"]').value = user.lastName;
    form.querySelector('[name = "balance"]').value = user.balance;
    form.querySelector('[name = "isActive"]').checked = user.isActive;
    loaderUser = user;
}




export const hideModal = () => {
    modal?.classList.add('hide-modal');
    form.reset()
}




/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike) => Promise<void>} callback 
 */
export const renderModal = (element, callback) => {


    if (modal) {
        return;
    }

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';

    form = modal.querySelector('form');

    modal.addEventListener('click', (e) => {
        if (e.target.className === 'modal-container') {
            hideModal();
        }
    });




    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const userLike = { ...loaderUser };

        for (const [key, value] of formData) {
            if (key === 'balance') {
                userLike[key] = Number(value);
                continue;
            }

            if (key === 'isActive') {
                userLike[key] = (value === 'on') ? true : false;
                continue;
            }

            userLike[key] = value;
        }

        //console.log(userLike);
        await callback(userLike);

        hideModal();

    })



    element.append(modal);

};
