import View from "./view";

class SearchView extends View {
    _parentElement = document.querySelector('.search');
    _errorMessage = 'No results found for your query! Please try again!';
    _message = '';

    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }

    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        })
    }

    _clearInput() {
        this._parentElement.querySelector('.search__field').value = '';
    }
}

export default new SearchView();