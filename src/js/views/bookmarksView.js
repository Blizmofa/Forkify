import View from "./view";
import previewView from "./previewView";

/*
* Bookmarks view class for the bookmarks section in the app UI.
*/

class BookmarksView extends View {

  _htmlEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarkes saved.'

  /**
   * Handler for the bookmarks view at the app UI.
   * @param {function} handler For the handler function to call.
   */
  addBookmarksHandler(handler) {
    window.addEventListener('load', handler);
  }

  /**
   * @returns an HTML code to be inserted into the app DOM.
   */
  _generateHTML() {
    return this._data.map(bookmark => previewView.renderData(bookmark, false)).join('');
  }
}

// Exporting object for the controller
export default new BookmarksView();