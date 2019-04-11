class Search {

    constructor({ input, ul }) {
        this.fetchCompanies();
        this.input = input;
        this.ul = ul;
        this.input.addEventListener('input', (e) => {
            e.preventDefault();
            this.displayMatches(e.currentTarget.value);
        });
        this.ul.addEventListener('click', (e) => {
            e.preventDefault();
            this.fetchStockData(e);
        });
    }

    fetchCompanies () {
        $.ajax({
            method: 'GET',
            url: 'https://api.iextrading.com/1.0/ref-data/symbols'
        }).then(data => {
            this.companies = data;
        })
    }

    getStockData (ticker) {
        $.ajax({
            method: 'GET',
            url: `https://api.iextrading.com/1.0/stock/${ticker}/chart/1y`
        }).then(data => {
            this.prices = data;
            console.log(this.prices)
        })
    }

    getMatches (input) {
        return this.companies.filter(company => {
            let len = input.length;
            if (company.name.slice(0, len).toLowerCase() === input.toLowerCase()) {
                return company.name
            }
        })
    }

    displayMatches (input) {
        let matches = this.getMatches(input);
        let lis = matches.map(company => {
            return `<li data-ticker=${company.symbol}>
                <span class='company' data-ticker=${company.symbol}>${company.name}</span>
            </li>`;
        }).join('');

        if (input.length > 0) {
            this.ul.innerHTML = lis;  
        } else {
            this.ul.innerHTML = '';
        }
    }

    fetchStockData (e) {
        let ticker = e.target.dataset.ticker.toLowerCase();
        if (ticker) {
            this.getStockData(ticker);
        }
    }
}

module.exports = Search