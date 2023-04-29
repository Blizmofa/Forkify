/*
* Search view class for search field section in the app UI
*/

class SearchView {

    #searchEl = document.querySelector('.search');

    // Gets the search field value
    getSearchFieldValue() {
        const query = this.#searchEl.querySelector('.search__field').value;
        this.#clearSearchInput();
        return query;
    }

    // Handler for the search field submit with 'Enter' key
    addSearchHandler(handler) {
        this.#searchEl.addEventListener('submit', function (event) {
            event.preventDefault();
            handler();
        });
    }

    // Auxiliary method to cleanup the search field 
    #clearSearchInput() {
        this.#searchEl.querySelector('.search__field').value = '';
    }

}

export default new SearchView();