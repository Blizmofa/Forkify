import icons from 'url:../../img/icons.svg';

/*
* View class is a parent class for view sub classes to be derived from.
*/

export default class View {

    _data;

    // Renders a given html data
    renderData(data, render = true) {

        if (!data || (Array.isArray(data) && data.length === 0)) {
            return this.renderError();
        }

        this._data = data;
        const html = this._generateHTML();

        if (!render) {
            return html;
        }

        this._cleanup();
        this._htmlEl.insertAdjacentHTML('afterbegin', html);
    }

    // Update a given html data without re-render it
    updateData(data) {

        this._data = data;
        const html = this._generateHTML();

        // Creating a memory copy of the html data
        const domNoteToUpdate = document.createRange().createContextualFragment(html);

        // Creating a compare variables
        const newDOMElements = Array.from(domNoteToUpdate.querySelectorAll('*'));
        const currDOMElements = Array.from(this._htmlEl.querySelectorAll('*'));

        // Update data
        newDOMElements.forEach((newDOMEl, i) => {
            const currEl = currDOMElements[i];

            // For text changes
            if (!newDOMEl.isEqualNode(currEl) && newDOMEl.firstChild?.nodeValue.trim() !== '') {
                currEl.textContent = newDOMEl.textContent;
            }

            // For attribute changes
            if (!newDOMEl.isEqualNode(currEl)) {
                Array.from(newDOMEl.attributes).forEach(attr => currEl.setAttribute(attr.name, attr.value));
            }
        });
    }

    // Auxiliary method to cleanup HTML elements
    _cleanup() {
        this._htmlEl.innerHTML = '';
    }

    // Renders a loading spinner circle to a given container in the app UI
    renderLoadingSpinner() {

        const html = `
        <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
        `;
        this._cleanup();
        this._htmlEl.insertAdjacentHTML('afterbegin', html);
    }

    // Renders a given error message to the app UI
    renderError(err = this._errorMessage) {
        const html = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${err}</p>
        </div>
        `;
        this._cleanup();
        this._htmlEl.insertAdjacentHTML('afterbegin', html);
    }

    // Renders a given message to the app UI
    renderMessage(msg = this._successMessage) {
        const html = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${msg}</p>
        </div>
        `;
        this._cleanup();
        this._htmlEl.insertAdjacentHTML('afterbegin', html);
    }
}