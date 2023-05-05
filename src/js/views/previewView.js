import View from "./view";
import icons from 'url:../../img/icons.svg';

/*
* Preview view class is a parent view class that generate a preview element.
*/

class PreviewView extends View {

  _htmlEl = '';

  // 
  /**
   * @returns an HTML code to be inserted into the app DOM.
   */
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
                <div class="preview__user-generated ${this._data.key ? '' : 'hidden'}">
                 <svg>
                  <use href="${icons}#icon-user"></use>
                 </svg>
               </div>
              </div>
            </a>
        </li>
    `;
  }
}

// Exporting object for the controller
export default new PreviewView();