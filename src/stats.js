class Stats {

    constructor(endPrices, avgEndPrice, ticker, recentPrice) {
        this.endPrices = endPrices;
        this.avgEndPrice = avgEndPrice;
        this.span = document.getElementById('stats');
        this.header = document.getElementById('stats-header');
        this.ticker = ticker;
        this.recentPrice = recentPrice;
        this.currency = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }
    
    downsideDev () {
        let lowerHalf = this.endPrices.filter(price => this.avgEndPrice > price);
        let sum = 0;
        for(let i = 0; i < lowerHalf.length; i++) {
            sum += Math.pow(this.avgEndPrice - lowerHalf[i], 2)
        }
        this.downDev = Math.pow((sum / (lowerHalf.length - 1)), 0.5);
        return this.currency.format(this.downDev);
    }
    
    upsideDev () {
        let lowerHalf = this.endPrices.filter(price => this.avgEndPrice < price);
        let sum = 0;
        for (let i = 0; i < lowerHalf.length; i++) {
            sum += Math.pow(this.avgEndPrice - lowerHalf[i], 2)
        }
        this.upDev = Math.pow((sum / (lowerHalf.length - 1)), 0.5);
        return this.currency.format(this.upDev);
    }

    percentChange () {
        let percent = (this.avgEndPrice - this.recentPrice) / this.recentPrice * 100;
        if (percent >= 0) {
            return `${Math.abs(percent.toFixed(2))}% gain`
        } else {
            return `${Math.abs(percent.toFixed(2))}% loss`
        }
    }

    upPercent () {
        let percent = this.upDev / this.avgEndPrice * 100;
        return `${percent.toFixed(2)}%`
    }

    downPercent () {
        let percent = this.downDev / this.avgEndPrice * 100;
        return `${percent.toFixed(2)}%`
    }

    render () {
        this.header.innerHTML = `${this.ticker.toUpperCase()} Distribution Statistics`
        this.span.innerHTML = `In 250 business days (approximately 1 calendar year), the projected
        stock price for ${this.ticker.toUpperCase().bold()} is ${this.currency.format(this.avgEndPrice).bold()},
        this represents a ${this.percentChange().bold()} from today's price of ${this.currency.format(this.recentPrice).bold()}.
        The downside deviation, which denotes the volatility of simulations with end prices below the projected price,
         is ${this.downsideDev().bold()} or ${this.downPercent().bold()}. The upside deviation,
        which denotes the volatility of simulations with end prices below the projected price,
        ${this.upsideDev().bold()} or ${this.upPercent().bold()}.`

    }
}

module.exports = Stats;