import View from "./view";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            console.log(btn);
            if (!btn) return;

            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        //console.log(numPages);
        if (curPage === 1 && numPages > 1) {
            return this._generateMarkupButton('R');
        }

        //Last Page
        if (curPage === numPages) {
            return this._generateMarkupButton('L');
        }

        //Other Page
        if (curPage < numPages) {
            return this._generateMarkupButton('All');
        }

        //No Other Page
        return ``;
    };

    _generateMarkupButton(direction) {
        const curPage = this._data.page;
        const prevBtn = `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
        `;

        const nextBtn = `
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;

        if (direction === 'L')
            return prevBtn;

        if (direction === 'R') {
            return nextBtn;
        }

        if (direction === 'All') {
            return prevBtn + nextBtn;
        }
    };
}

export default new PaginationView()