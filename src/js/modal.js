import { DataSource } from './data-source';
import { UIElement, UI } from './ui';

/**
 * Contains modal related functionality.
 */
export class Modal {

    /**
     * Returns a singleton instance of the Modal class.
     */
    static getInstance() {
        if(!Modal.instance) {
            Modal.instance = new Modal();
        }
        return Modal.instance;
    }

    constructor() {
        this.modal = document.querySelector("#my-modal");
        this.modalDescription = document.querySelector('#modal-description');
        this.modalContents = new ModalContents();
    }

    initializeHandlers() {
        Array.from(document.querySelectorAll(".app-details")).forEach(
            element => element.addEventListener('click', (event) => {
                this.clear();
                this.show();
                this.modalContents.createApdexDetails(this.modalDescription, event);
            })
        );

        Array.from(document.querySelectorAll(".fa-edit")).forEach(
            element => element.addEventListener('click', (event) => {
                this.clear();
                this.show();
                const hostName = event.target.previousSibling.innerHTML;
                const dataSource = DataSource.getInstance();
                const appsForHost = dataSource.getTopApps(dataSource.getAppsForHost(hostName), 25);
                this.modalContents.createAppsForHost(this.modalDescription, hostName, appsForHost);
            })
        );

        document.querySelector("#modal-close").addEventListener('click', (event) => this.hide());
        this.modal.addEventListener('click', (event) => this.hide());
    }

    hide() {
        this.modal.style.display = "none";
    }

    show() {
        this.modal.style.display = "block";
    }

    clear() {
        this.modalDescription.innerHTML = "";
    }
}

/**
 * Contains methods for creating elements within the modal.
 */
class ModalContents {

    /**
     * Creates the elements for showing the apdex information.
     */
    createApdexDetails(parentElement, event) {
        const apdexRating = event.currentTarget.querySelector('.app-details--rating').innerHTML;
        const appName = event.currentTarget.querySelector('.app-details--name').innerHTML;

        UIElement.createWithContent(parentElement, 'span', appName, 'app-details--name');
        UIElement.createWithContent(parentElement, 'span', 'Apdex Rating', 'app-details--rating');
        UIElement.createWithContent(parentElement, 'span', apdexRating, 'app-details--rating');
    }

    /**
     * Creates the elements for showing the editor modal.
     */
    createAppsForHost(parentElement, hostName, appsForHost) {
        const ui = UI.getInstance();
        ui.createHostName(parentElement, hostName);
        ui.createAppRows(parentElement, appsForHost, true);
    }
}