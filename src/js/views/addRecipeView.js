import View from "./view";

/*
* Add recipe view class for the add recipe button and form in the app UI
*/

class AddRecipeView extends View {

    _htmlEl = document.querySelector('.upload');
    _formEl = document.querySelector('.add-recipe-window');
    _overlayEl = document.querySelector('.overlay');
    _openFormBtn = document.querySelector('.nav__btn--add-recipe');
    _closeFormBtn = document.querySelector('.btn--close-modal');
    _successMessage = 'Recipe uploded successfully.'

    constructor() {
        super();
        this._addOpenRecipeFormHandler();
        this._addCloseRecipeFormHandler();
    }

    /**
     * Helper function for bind the this key word to the handler function.
     */
    toggleWindow() {
        this._overlayEl.classList.toggle('hidden');
        this._formEl.classList.toggle('hidden');
    }

    /**
     * Handler for open the add recipe form.
     */
    _addOpenRecipeFormHandler() {
        this._openFormBtn.addEventListener('click', this.toggleWindow.bind(this));
    }

    /**
     * Handler for close the add recipe form
     */
    _addCloseRecipeFormHandler() {

        // For the 'X' close button
        this._closeFormBtn.addEventListener('click', this.toggleWindow.bind(this));

        // For press outside of form bound close
        this._overlayEl.addEventListener('click', this.toggleWindow.bind(this));
    }

    /**
     * Handler for upload a new recipe form.
     * @param {function} handler For the handler function to call.
     */
    addUploadRecipeHandler(handler) {

        this._htmlEl.addEventListener('submit', function (event) {
            event.preventDefault();

            // Convert the form data to an Object
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        });
    }

    // Generate html code to be inserted to the DOM.
    _generateHTML() { }

}

// Exporting object for the controller
export default new AddRecipeView();