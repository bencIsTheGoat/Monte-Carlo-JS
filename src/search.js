
let LineChart = require('./line_chart');
let BarChart = require('./bar_chart.js');
let Stats = require('./stats.js');

class Search {

    constructor({ input, ul, button }) {
        this.fetchCompanies();
        this.input = input;
        this.ul = ul;
        this.button = button;
        let body = $('html,body');
        this.input.addEventListener('input', (e) => {
            e.preventDefault();
            this.displayMatches(e.currentTarget.value);
        });
        this.input.addEventListener('keyup', (e) => {
            if (e.keyCode === 13 && this.ul.children.length === 1) {
                e.preventDefault();
                this.getStockData(this.ul.firstElementChild.dataset.ticker.toLowerCase());
                body.animate({ scrollTop: 500 }, 3000, 'swing')
            }
        })
        this.ul.addEventListener('click', (e) => {
            e.preventDefault();
            this.fetchStockData(e);
            body.animate({scrollTop: 500 }, 3000, 'swing')
        });
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.reload();
        })

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
            this.ul.innerHTML = ''
            this.input.value = ''
            this.prices = data;
            let simulations = [];
            let endPrices = [];
            let i = 0;
            while (simulations.length <= 150) {
                let sim = this.calculateSim(this.prices)
                simulations.push({idx: i, data: sim});
                endPrices.push(sim[sim.length - 1].price)
                i++;
            }
            let filterData = this.prices.filter(datum => {
                if (datum.close !== undefined) return datum
            });
            let recentPrice = filterData[filterData.length - 1].close;
            let avgEndPrice = this.avgEndPrice(endPrices)
            let avgLine = this.avgLine(this.prices, avgEndPrice)
            new LineChart (simulations, avgLine, avgEndPrice);
            new BarChart (endPrices, avgEndPrice);
            let stats = new Stats (endPrices, avgEndPrice, ticker, recentPrice);
            stats.render();
        })
    }

    avgLine (data, avgEndPrice) {
        let filterData = data.filter(datum => {
            if (datum.close !== undefined) return datum;
        })
        let startPrice = filterData[filterData.length - 1].close;
        let slope = (avgEndPrice - startPrice) / filterData.length;
        let line = []
        for (let i = 0; i < filterData.length; i++) {
            line.push({date: i, price: startPrice += slope})
        }
        return line;
    }

    avgEndPrice (prices) {
        let sum = 0;
        for (let i = 0; i < prices.length; i++) {
            sum += prices[i];
        }
        return sum / prices.length
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

    calculateSim (data) {
        let filterData = data.filter(datum => {
            if (datum.close !== undefined) return datum
        })
        let average = this.calculateAvg(filterData);
        let stdDev = this.calculateStdDev(filterData, average);
        let variance = Math.pow(stdDev, 2);
        let recentPrice = filterData[filterData.length - 1].close;
        let sim = [{date: 0, price: recentPrice}];
        for (let i = 0; i < filterData.length; i++) {
            let dailyDrift = average - (variance / 2);
            let drift = (dailyDrift - (Math.pow(stdDev, 2) / 2));
            let shock = drift + stdDev * this.calculateNoise(-3, 3);
            let nextPrice = sim[i].price * Math.pow(Math.E, shock);
            sim.push({date: i + 1, price: nextPrice});
        }
        return sim;
    }

    calculateAvg (data) {
        let percent = 0;
        for (let i = 0; i < data.length - 1; i++) {
            let change = (data[i + 1].close - data[i].close) / data[i].close ;
            percent += change;
        }
        return percent / (data.length - 1)
    }

    calculateStdDev (data, average) {
        let sum = 0;
        for (let i = 0; i < data.length - 1; i++) {
            let change = (data[i + 1].close - data[i].close) / data[i].close;
            let stdDev = Math.pow(change - average, 2);

            sum += stdDev;
        }
        return Math.pow((sum / (data.length - 1)), 0.5);
    }

    calculateNoise (min, max,) {
        let randX = 0;
        let randY = 0;
        while (randX === 0) {
            randX = Math.random();
        }
        while (randY === 0) {
            randY = Math.random();
        } 
        let stdDevs = Math.sqrt(-2.0 * Math.log(randX)) * Math.cos(2.0 * Math.PI * randY);

        stdDevs = stdDevs   / 10.0 + 0.5;
        if (stdDevs > 1 || stdDevs  < 0) stdDevs = this.calculateNoise(min, max);
        stdDevs *= max - min;
        stdDevs += min;
        return stdDevs ;
    }
}

module.exports = Search