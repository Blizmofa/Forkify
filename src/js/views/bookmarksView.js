import View from "./view";
import previewView from "./previewView";

/*
* Bookmarks view class for the bookmarks section in the app UI
*/

class BookmarksView extends View {

  _htmlEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarkes saved.'
  _successMessage = ''

  // Handler for the bookmarks view at the app UI
  addBookmarksHandler(handler) {
    window.addEventListener('load', handler);
  }

  // Generate html code to be inserted to the DOM
  _generateHTML() {
    return this._data.map(bookmark => previewView.renderData(bookmark, false)).join('');
  }

}

// Exporting object for the controller
export default new BookmarksView();