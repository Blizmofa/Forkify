import View from "./view";
import previewView from "./previewView";

/*
* Results view class for the search results section in the app UI.
*/

class ResultsView extends View {

    _htmlEl = document.querySelector('.results');
    _errorMessage = 'Recpie not found.'

    /**
     * @returns an HTML section to be inserted into the app DOM.
     */
    _generateHTML() {

        return this._data.map(result => previewView.renderData(result, false)).join('');
    }
}

// Exporting object for the controller
export default new ResultsView();