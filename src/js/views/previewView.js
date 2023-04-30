import View from "./view";

/*
* Preview view class is a parent view class that generate a preview element
* to be derived from
*/

class PreviewView extends View {

    _htmlEl = '';

    // Generate a generic preeview HTML
    _generateHTML() {

        // Get the selected recipe id
        const currId = window.location.hash.slice(1);

        return `
        <li class="preview">
            <a class="preview__link ${this._data.id === currId ? 'preview__link--active' : ''}" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
              </div>
            </a>
        </li>
    `;
    }
}

// Exporting object for the controller
export default new PreviewView();