/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bar_chart.js":
/*!**************************!*\
  !*** ./src/bar_chart.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class BarChart {\n\n    constructor(data, average) {\n        this.data = data;\n        this.margin = { top: 50, right: 50, bottom: 50, left: 50 };\n        this.width = 700 - this.margin.left - this.margin.right;\n        this.height = 500 - this.margin.top - this.margin.bottom;\n\n        d3.selectAll('.barchart').remove();\n\n        this.svg = d3.select('.charts').append('svg')\n        .attr('class', 'barchart')\n        .attr(\"width\", this.width + this.margin.left + this.margin.right)\n        .attr('height', this.height + this.margin.top + this.margin.bottom)\n        .append('g')\n        .attr(\"transform\", \"translate(\" + this.margin.left + \",\" + this.margin.top + \")\");\n\n        this.x = d3.scaleLinear()\n        .range([0, this.width])\n        .domain([d3.min(this.data, d => d) - 5, d3.max(this.data, d => d) + 5]);\n        \n        this.hist = d3.histogram()\n        .domain(this.x.domain())\n        .thresholds(this.x.ticks(20))(this.data)\n\n\n        this.yMax = d3.max(this.hist, d => d.length)\n        this.y = d3.scaleLinear()\n        .range([this.height, 0])\n        .domain([0, d3.max(this.hist, d => d.length)])\n\n        this.colorScale = d3.scaleLinear()\n        .domain([0, d3.max(this.hist, data => data.length)])\n        .range([d3.rgb('lightgreen').brighter(), d3.rgb('lightgreen').darker()])\n\n        this.svg.append('g')\n        .attr('id', 'x-axis')\n        .attr(\"transform\", `translate(0, ${this.height})`)\n        .call(d3.axisBottom(this.x))\n\n        this.line = d3.line()\n            .x(average)\n            .y([0, this.yMax])\n\n        this.bar = this.svg.selectAll('bar')\n        .data(this.hist)\n        .enter()\n        .append('g')\n        .attr('class', 'bar')\n        .attr('transform', d => `translate(${this.x(d.x0)}, ${this.y(d.length)})`)\n\n        this.bar.append('rect')\n        .attr('height', 0)\n        .attr('width', d => this.x(d.x1) - this.x(d.x0) - 1)\n        .attr('y', d => this.height - this.y(d.length))\n        // .attr('opacity', 0)\n        .transition()\n        .duration(8000)\n        .delay((d, i) => i * 80 + 6000)\n        .ease(d3.easeBounce)\n        .attr('fill', d => this.colorScale(d.length))\n        .attr('opacity', 1)\n        .attr('y', 0)\n        .attr('width', d => this.x(d.x1) - this.x(d.x0) - 1)\n        .attr('height', d => this.height - this.y(d.length))\n\n        this.line = d3.line()\n            .x(this.x(average))\n            .y([0, this.yMax])\n\n        this.svg\n        .append('g')\n        .selectAll('line')\n        .data([{y1: 0, y2: this.height, x1: this.x(average), x2: this.x(average)}])\n        .enter()\n        .append('line')\n        .attr('class', 'avgLine')\n        .attr('y1', this.height)\n        .attr('y2', d => d.y2)\n        .attr('x1', d => d.x1)\n        .attr('x2', d => d.x2)\n        .attr('stroke', 'orange')\n        .attr('fill', 'none')\n        .attr('stroke-width', '0')\n        .transition()\n            .delay((d, i) => i * 8000 + 6000)\n        .duration(8000)\n        .attr('y1', d => d.y1)\n        .attr('stroke-width', '6')\n\n        let currency = new Intl.NumberFormat('en-US', {\n            style: 'currency',\n            currency: 'USD',\n            minimumFractionDigits: 2,\n            maximumFractionDigits: 2\n        })\n\n        this.svg\n        .append('text')\n        .attr('stroke', 'none')\n        .attr('y', this.height)\n        .transition()\n        .duration(8000)\n        .delay((d, i) => i * 8000 + 6000)\n        .attr('opacity', '1')\n        .attr('fill', 'orange')\n        .attr('x', this.x(average)-70)\n        .attr('y', -5)\n        .text(`Projected Price ${currency.format(average)}`)\n        \n        this.svg.append('g')\n        .attr('class', 'xaxis')\n        .attr('transform', `translate(0, ${this.height})`)\n\n        this.svg.append('text')\n        .text('Price ($)')\n        .attr('y', this.height + 30)\n        .attr('x', this.width / 2)\n        \n        this.svg.append('text')\n            .text('Distribution of Projected Prices')\n            .style('font-weight', '900')\n            .attr('font-size', '22px')\n            .attr('y', -30)\n            .attr('x', this.width / 2 - 130)\n\n    }\n\n}\n\nmodule.exports = BarChart\n\n//# sourceURL=webpack:///./src/bar_chart.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let Search = __webpack_require__(/*! ./search */ \"./src/search.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", (e) => {\n    let input = document.querySelector('.search-input');\n    let ul = document.querySelector('.search-ul');\n    let button = document.querySelector('.reset-button');\n    new Search ({input, ul, button});\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/line_chart.js":
/*!***************************!*\
  !*** ./src/line_chart.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class LineChart {\n\n    constructor (data, averageLine, avgEndPrice) {\n\n     \n        this.data = Object.values(data).map(ele => ele.data)\n        // this.averageLine = Object.values(averageLine).map(ele => ele.data)\n        this.margin = {top: 50, right: 100, bottom: 50, left: 70};\n        this.width = 700 - this.margin.left - this.margin.right;\n        this.height = 500 - this.margin.top - this.margin.bottom;\n\n        d3.selectAll('.linechart').remove();\n    \n        this.svg = d3.select(\".charts\").append('svg')\n        .attr('class', 'linechart')\n        .attr(\"width\", this.width + this.margin.left + this.margin.right)\n        .attr('height', this.height + this.margin.top + this.margin.bottom)\n        .append('g')\n        .attr(\"transform\", \"translate(\" + this.margin.left + \",\" + this.margin.top + \")\");\n\n        this.x = d3.scaleLinear()\n        .range([0, this.width])\n        .domain([0, this.data[0].length]);\n\n        this.y = d3.scaleLinear()\n        .range([this.height, 0])\n        .domain([d3.min(this.data, sim => d3.min(sim, data => data.price)), d3.max(this.data, sim => d3.max(sim, data => data.price))]);\n\n\n        this.svg.append('g')\n            .attr('id', 'x-axis')\n            .attr(\"transform\", `translate(0, ${this.height})`)\n            .call(d3.axisBottom(this.x));\n\n\n        this.svg.append(\"g\")\n            .attr('id', 'y-axis')\n            .attr('transform', `translate(0, 0)`)\n            .call(d3.axisLeft(this.y));\n\n        this.line = d3.line()\n            .x(data => this.x(data.date))\n            .y(data => this.y(data.price))\n\n    \n        this.lines = this.svg.selectAll('.lines')\n            .data(this.data)\n            .enter()\n            .append('g')\n            .attr('class', '.lines')\n\n            \n        this.lines\n            .append(\"path\")\n            .attr(\"class\", 'line')\n            .style('fill', 'none')\n            .style('stroke-width', '3')\n            .style('stoke-linecap', 'round')\n            .style('stroke', () => this.randomColor())\n            .attr('d', d => {\n                this.line(d)\n                return this.line(d)\n            })\n\n        this.lines\n            .append('path')\n            .attr('class', 'line')\n            .style('fill', 'none')\n            .style('stroke-width', '6')\n            .style('stoke-linecap', 'round')\n            .style('stroke', 'orange')\n            .attr('d', () => {\n                this.line(averageLine)\n                return this.line(averageLine)\n            })\n            \n        this.svg.append('text')\n            .attr('class', 'projected')\n        .text('Projected')\n        .attr('fill', 'orange')\n        .attr('opacity', 0)\n        .attr('x', this.width)\n        .attr('y', this.y(avgEndPrice)-10)\n\n\n        this.svg.append('text')\n            .attr('class', 'projected')\n            .text('Path')\n            .attr('fill', 'orange')\n            .attr('opacity', '0')\n            .attr('x', this.width)\n            .attr('y', this.y(avgEndPrice)+10)\n\n        this.svg.append('text')\n            .text('Price ($)')\n            .attr('y', -30)\n            .attr('x', -(this.height / 2))\n            .attr('transform', 'rotate(-90)')\n\n        this.svg.append('text')\n            .text('Days from Today')\n            .attr('y', this.height + 30)\n            .attr('x', this.width / 2 - 50)\n\n        this.svg.append('text')\n            .text('Future Stock Price Simulations')\n            .style('font-weight', '900')\n            .attr('font-size', '22px')\n            .attr('y', -30)\n            .attr('x', this.width / 2 - 130)\n        \n\n        this.animateLine();\n\n    }\n\n    lineHelper (data) {\n        data.forEach(ele => `line-${ele.date}`)\n    }\n\n    animateLine () {\n        d3.selectAll('.line')\n            .style('opacity', '1')\n            .style('font-weight', '900')\n\n        let totalLength = d3.selectAll('.line').node().getTotalLength() * 1.7;\n\n        d3.selectAll('.line')\n            .attr('stroke-dasharray', totalLength + \" \" + totalLength)\n            .attr('stroke-dashoffset', totalLength)\n            .transition()\n            .delay((d, i) => 40 * i)\n            .ease(d3.easeExp)\n            .duration(10000)\n            .attr('stroke-dashoffset', 0);\n\n\n        d3.selectAll('.projected')\n        .transition()\n        .duration(7000)\n        .attr('opacity', '1')\n    }\n\n    randomColor () {\n        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`\n    }\n\n    update () {\n\n    }\n\n}\n\nmodule.exports = LineChart;\n\n//# sourceURL=webpack:///./src/line_chart.js?");

/***/ }),

/***/ "./src/search.js":
/*!***********************!*\
  !*** ./src/search.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nlet LineChart = __webpack_require__(/*! ./line_chart */ \"./src/line_chart.js\");\nlet BarChart = __webpack_require__(/*! ./bar_chart.js */ \"./src/bar_chart.js\");\nlet Stats = __webpack_require__(/*! ./stats.js */ \"./src/stats.js\");\n\nclass Search {\n\n    constructor({ input, ul, button }) {\n        this.fetchCompanies();\n        this.input = input;\n        this.ul = ul;\n        this.button = button;\n        this.input.addEventListener('input', (e) => {\n            e.preventDefault();\n            this.displayMatches(e.currentTarget.value);\n        });\n        this.input.addEventListener('keyup', (e) => {\n            if (e.keyCode === 13 && this.ul.children.length === 1) {\n                e.preventDefault();\n                this.getStockData(this.ul.firstElementChild.dataset.ticker.toLowerCase());\n            }\n        })\n        this.ul.addEventListener('click', (e) => {\n            e.preventDefault();\n            this.fetchStockData(e);\n        });\n        this.button.addEventListener('click', (e) => {\n            e.preventDefault();\n            window.location.reload();\n        })\n\n    }\n\n    fetchCompanies () {\n        $.ajax({\n            method: 'GET',\n            url: 'https://api.iextrading.com/1.0/ref-data/symbols'\n        }).then(data => {\n            this.companies = data;\n            \n        })\n    }\n\n    getStockData (ticker) {\n        $.ajax({\n            method: 'GET',\n            url: `https://api.iextrading.com/1.0/stock/${ticker}/chart/1y`\n        }).then(data => {\n            this.ul.innerHTML = ''\n            this.input.value = ''\n            this.prices = data;\n            let simulations = [];\n            let endPrices = [];\n            let i = 0;\n            while (simulations.length <= 150) {\n                let sim = this.calculateSim(this.prices)\n                simulations.push({idx: i, data: sim});\n                endPrices.push(sim[sim.length - 1].price)\n                i++;\n            }\n            let filterData = this.prices.filter(datum => {\n                if (datum.close !== undefined) return datum\n            });\n            let recentPrice = filterData[filterData.length - 1].close;\n            let avgEndPrice = this.avgEndPrice(endPrices)\n            let avgLine = this.avgLine(this.prices, avgEndPrice)\n            new LineChart (simulations, avgLine, avgEndPrice);\n            new BarChart (endPrices, avgEndPrice);\n            let stats = new Stats (endPrices, avgEndPrice, ticker, recentPrice);\n            stats.render();\n        })\n    }\n\n    avgLine (data, avgEndPrice) {\n        let filterData = data.filter(datum => {\n            if (datum.close !== undefined) return datum;\n        })\n        let startPrice = filterData[filterData.length - 1].close;\n        let slope = (avgEndPrice - startPrice) / filterData.length;\n        let line = []\n        for (let i = 0; i < filterData.length; i++) {\n            line.push({date: i, price: startPrice += slope})\n        }\n        return line;\n    }\n\n    avgEndPrice (prices) {\n        let sum = 0;\n        for (let i = 0; i < prices.length; i++) {\n            sum += prices[i];\n        }\n        return sum / prices.length\n    }\n\n    getMatches (input) {\n        return this.companies.filter(company => {\n            let len = input.length;\n            if (company.name.slice(0, len).toLowerCase() === input.toLowerCase()) {\n                return company.name\n            }\n        })\n    }\n\n    displayMatches (input) {\n        let matches = this.getMatches(input);\n        let lis = matches.map(company => {\n            return `<li data-ticker=${company.symbol}>\n                <span class='company' data-ticker=${company.symbol}>${company.name}</span>\n            </li>`;\n        }).join('');\n\n        if (input.length > 0) {\n            this.ul.innerHTML = lis;  \n        } else {\n            this.ul.innerHTML = '';\n        }\n    }\n\n    fetchStockData (e) {\n        let ticker = e.target.dataset.ticker.toLowerCase();\n        if (ticker) {\n            this.getStockData(ticker);\n        }\n    }\n\n    calculateSim (data) {\n        let filterData = data.filter(datum => {\n            if (datum.close !== undefined) return datum\n        })\n        let average = this.calculateAvg(filterData);\n        let stdDev = this.calculateStdDev(filterData, average);\n        let variance = Math.pow(stdDev, 2);\n        let recentPrice = filterData[filterData.length - 1].close;\n        let sim = [{date: 0, price: recentPrice}];\n        for (let i = 0; i < filterData.length; i++) {\n            let dailyDrift = average - (variance / 2);\n            let drift = (dailyDrift - (Math.pow(stdDev, 2) / 2));\n            let shock = drift + stdDev * this.calculateNoise(-3, 3);\n            let nextPrice = sim[i].price * Math.pow(Math.E, shock);\n            sim.push({date: i + 1, price: nextPrice});\n        }\n        return sim;\n    }\n\n    calculateAvg (data) {\n        let percent = 0;\n        for (let i = 0; i < data.length - 1; i++) {\n            let change = (data[i + 1].close - data[i].close) / data[i].close ;\n            percent += change;\n        }\n        return percent / (data.length - 1)\n    }\n\n    calculateStdDev (data, average) {\n        let sum = 0;\n        for (let i = 0; i < data.length - 1; i++) {\n            let change = (data[i + 1].close - data[i].close) / data[i].close;\n            let stdDev = Math.pow(change - average, 2);\n\n            sum += stdDev;\n        }\n        return Math.pow((sum / (data.length - 1)), 0.5);\n    }\n\n    calculateNoise (min, max,) {\n        let randX = 0;\n        let randY = 0;\n        while (randX === 0) {\n            randX = Math.random();\n        }\n        while (randY === 0) {\n            randY = Math.random();\n        } \n        let stdDevs = Math.sqrt(-2.0 * Math.log(randX)) * Math.cos(2.0 * Math.PI * randY);\n\n        stdDevs = stdDevs   / 10.0 + 0.5;\n        if (stdDevs > 1 || stdDevs  < 0) stdDevs = this.calculateNoise(min, max);\n        stdDevs *= max - min;\n        stdDevs += min;\n        return stdDevs ;\n    }\n}\n\nmodule.exports = Search\n\n//# sourceURL=webpack:///./src/search.js?");

/***/ }),

/***/ "./src/stats.js":
/*!**********************!*\
  !*** ./src/stats.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Stats {\n\n    constructor(endPrices, avgEndPrice, ticker, recentPrice) {\n        this.endPrices = endPrices;\n        this.avgEndPrice = avgEndPrice;\n        this.span = document.getElementById('stats');\n        this.header = document.getElementById('stats-header');\n        this.ticker = ticker;\n        this.recentPrice = recentPrice;\n        this.currency = new Intl.NumberFormat('en-US', {\n            style: 'currency',\n            currency: 'USD',\n            minimumFractionDigits: 2,\n            maximumFractionDigits: 2\n        })\n    }\n    \n    downsideDev () {\n        let lowerHalf = this.endPrices.filter(price => this.avgEndPrice > price);\n        let sum = 0;\n        for(let i = 0; i < lowerHalf.length; i++) {\n            sum += Math.pow(this.avgEndPrice - lowerHalf[i], 2)\n        }\n        this.downDev = Math.pow((sum / (lowerHalf.length - 1)), 0.5);\n        return this.currency.format(this.downDev);\n    }\n    \n    upsideDev () {\n        let lowerHalf = this.endPrices.filter(price => this.avgEndPrice < price);\n        let sum = 0;\n        for (let i = 0; i < lowerHalf.length; i++) {\n            sum += Math.pow(this.avgEndPrice - lowerHalf[i], 2)\n        }\n        this.upDev = Math.pow((sum / (lowerHalf.length - 1)), 0.5);\n        return this.currency.format(this.upDev);\n    }\n\n    percentChange () {\n        let percent = (this.avgEndPrice - this.recentPrice) / this.recentPrice * 100;\n        if (percent >= 0) {\n            return `${Math.abs(percent.toFixed(2))}% gain`\n        } else {\n            return `${Math.abs(percent.toFixed(2))}% loss`\n        }\n    }\n\n    upPercent () {\n        let percent = this.upDev / this.avgEndPrice * 100;\n        return `${percent.toFixed(2)}%`\n    }\n\n    downPercent () {\n        let percent = this.downDev / this.avgEndPrice * 100;\n        return `${percent.toFixed(2)}%`\n    }\n\n    render () {\n        this.header.innerHTML = `${this.ticker.toUpperCase()} Distribution Statistics`\n        this.span.innerHTML = `In 250 business days (approximately 1 calendar year), the projected\n        stock price for ${this.ticker.toUpperCase().bold()} is ${this.currency.format(this.avgEndPrice).bold()},\n        this represents a ${this.percentChange().bold()} from today's price of ${this.currency.format(this.recentPrice).bold()}.\n        The downside deviation, which denotes the volatility of simulations with end prices below the projected price,\n         is ${this.downsideDev().bold()} or ${this.downPercent().bold()}. The upside deviation,\n        which denotes the volatility of simulations with end prices below the projected price,\n        ${this.upsideDev().bold()} or ${this.upPercent().bold()}.`\n\n    }\n}\n\nmodule.exports = Stats;\n\n//# sourceURL=webpack:///./src/stats.js?");

/***/ })

/******/ });