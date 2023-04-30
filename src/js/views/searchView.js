/*
* Search view class for the search field section in the app UI
*/

class SearchView {

    _htmlEl = document.querySelector('.search');

    // Gets the search field value
    getSearchFieldValue() {
        const query = this._htmlEl.querySelector('.search__field').value;
        this._clearSearchInput();
        return query;
    }

    // Handler for the search field submit with 'Enter' key
    addSearchHandler(handler) {
        this._htmlEl.addEventListener('submit', function (event) {
            event.preventDefault();
            handler();
        });
    }

    // Auxiliary method to cleanup the search field 
    _clearSearchInput() {
        this._htmlEl.querySelector('.search__field').value = '';
    }

}

// Exporting object for the controller
export default new SearchView();