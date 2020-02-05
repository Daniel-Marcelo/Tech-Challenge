
/**
 * Contains various methods for updating the UIs existing content or adding new content.
 */
export class UI {

    /**
     * Returns a singleton instance of the UI class.
     */
    static getInstance() {
        if(!UI.instance) {
            UI.instance = new UI();
        }
        return UI.instance;
    }

    constructor() {
        this.gridView = true;
    }

    /**
     * Creates a new card on the UI, showing the top 5 rated apps based on apdex rating for a host.
     */
    createCard(parentElement, hostName, apps) {
        const card = UIElement.create(parentElement, 'div', 'card');
        const contentContainer = UIElement.create(card, 'div', 'card-content');
        this.createHostName(contentContainer, hostName);
        UIElement.create(contentContainer, 'span', 'fas', 'fa-edit', 'card-content__icon');
        UIElement.create(contentContainer, 'span', 'fas', 'fa-plus', 'card-content__icon');

        this.createAppRows(contentContainer, apps);
    }

    /**
     * Creates the bolded hostname element.
     */
    createHostName(parentElement, hostName) {
        UIElement.createWithContent(parentElement, 'span', hostName, 'card-content__host-name');
    }

    /**
     * Creates the row elements containing the apdex rating and the app name.
     */
    createAppRows(parentElement, apps, editMode = false) {
        apps.forEach(app => {
            const row = UIElement.create(parentElement, 'div', 'app-details');
            if (editMode) {
                UIElement.create(row, 'span', 'app-details--rating', 'fas', 'fa-minus-square');
            }
            UIElement.createWithContent(row, 'span', app.apdex, 'app-details--rating');
            UIElement.createWithContent(row, 'span', app.name, 'app-details--name');
        });
    }

    /**
     * Updates the width of the email element based on the view type.
     */
    updateEmailTextWidth() {
        const emailAddressElement = document.querySelector('#heading-primary--sub');
        if (this.gridView) {
            emailAddressElement.classList.replace('heading-primary--sm', 'heading-primary--lg');
        } else {
            emailAddressElement.classList.replace('heading-primary--lg', 'heading-primary--sm');
        }
    }

    /**
     * Updates the UIs view type - can be either grid view or list view.
     */
    updateViewType() {
        this.gridView = !this.gridView;
    }

    /**
     * Updates the checkbox's label based on the view type.
     */
    updateCheckboxLabel() {
        document.querySelector('.heading-primary--label > span').innerHTML = this.gridView ? 'Show as list' : 'Show as an awesome grid';
    }

    /**
     * Unchecks the checkbox.
     */
    resetCheckbox(element) {
        element.checked = false;
    }

    /**
     * Updates each cards width based on view type.
     */
    updateCardWidth() {
        const cards = document.querySelectorAll('.card');
        const width = this.gridView ? '375px' : '100%';
        Array.from(cards).forEach(card => card.style.width = width);
    }
}

/**
 * Contains methods for adding/creating new DOM elements.
 */
export class UIElement {

    /**
     * Returns a new DOM element with the provided class list.
     */
    static create(parentElement, elementName, ...classList) {
        const element = document.createElement(elementName);
        classList.forEach(cssClass => element.classList.add(cssClass));
        parentElement.appendChild(element);
        return element;
    }

    /**
     * Returns a new DOM element with the provided class list and content.
     */
    static createWithContent(parentElement, elementName, content, ...classList) {
        const element = UIElement.create(parentElement, elementName, classList);
        element.innerHTML = content;
        return element;
    }
}