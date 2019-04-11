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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let Search = __webpack_require__(/*! ./search */ \"./src/search.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", (e) => {\n    let input = document.querySelector('.search-input');\n    let ul = document.querySelector('.search-ul');\n    new Search ({input, ul});\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/line_chart.js":
/*!***************************!*\
  !*** ./src/line_chart.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class LineChart {\n\n    constructor (data) {\n        this.data = Object.values(data).map(ele => ele.data)\n        // this.data = data\n        this.margin = {top: 50, right: 150, bottom: 80, left: 50};\n        this.width = 900 - this.margin.left - this.margin.right;\n        this.height = 500 - this.margin.top - this.margin.bottom;\n        \n        this.svg = d3.select(\"svg\")\n        .attr(\"width\", this.width + this.margin.left + this.margin.right)\n        .attr('height', this.height + this.margin.top + this.margin.bottom)\n        .append('g')\n        .attr(\"transform\", \"translate(\" + this.margin.left + \",\" + this.margin.top + \")\");\n\n        this.x = d3.scaleLinear()\n        .range([0, this.width])\n        .domain([0, this.data[0].length]);\n\n        this.y = d3.scaleLinear()\n        .range([this.height, 0])\n            .domain([d3.min(this.data, sim => d3.min(sim, data => data.price)), d3.max(this.data, sim => d3.max(sim, data => data.price))]);\n\n        this.svg.append('g')\n            .attr('id', 'x-axis')\n            .attr(\"transform\", `translate(0, ${this.height})`)\n            .call(d3.axisBottom(this.x));\n\n\n        this.svg.append(\"g\")\n            .attr('id', 'y-axis')\n            .attr('transform', `0, translate(${this.width})`)\n            .call(d3.axisLeft(this.y));\n\n        this.line = d3.line()\n            .x(data => this.x(data.date))\n            .y(data => this.y(data.price))\n\n        this.lines = this.svg.selectAll('.lines')\n            .data(this.data)\n            .enter()\n            .append('g')\n            .attr('class', '.lines')\n\n        this.lines\n            .append(\"path\")\n            .attr(\"class\", 'line')\n            .style('fill', 'none')\n            .style('stroke-width', '4')\n            .style('stoke-linecap', 'round')\n            .style('stroke', () => this.randomColor())\n            .attr('d', d => {\n                return this.line(d)\n            })\n\n        d3.selectAll('.line')\n            .style('opacity', '0')\n\n        this.animateLine();\n\n    }\n\n    lineHelper (data) {\n        data.forEach(ele => `line-${ele.date}`)\n    }\n\n    animateLine () {\n        d3.selectAll('.line')\n            .style('opacity', '1')\n\n        let totalLength = d3.selectAll('.line').node().getTotalLength() * 1.3;\n\n        d3.selectAll('.line')\n            .attr('stroke-dasharray', totalLength + \" \" + totalLength)\n            .attr('stroke-dashoffset', totalLength)\n            .transition()\n            .delay((d, i) => 500 * i)\n            .ease(d3.easeLinear)\n            .duration(5000)\n            .attr('stroke-dashoffset', 0);\n    }\n\n    randomColor () {\n        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`\n    }\n\n}\n\nmodule.exports = LineChart;\n\n//# sourceURL=webpack:///./src/line_chart.js?");

/***/ }),

/***/ "./src/search.js":
/*!***********************!*\
  !*** ./src/search.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// let Line = require('./line.js');\nlet LineChart = __webpack_require__(/*! ./line_chart */ \"./src/line_chart.js\");\n\nclass Search {\n\n    constructor({ input, ul }) {\n        this.fetchCompanies();\n        this.input = input;\n        this.ul = ul;\n        this.input.addEventListener('input', (e) => {\n            e.preventDefault();\n            this.displayMatches(e.currentTarget.value);\n        });\n        this.ul.addEventListener('click', (e) => {\n            e.preventDefault();\n            this.fetchStockData(e);\n        });\n    }\n\n    fetchCompanies () {\n        $.ajax({\n            method: 'GET',\n            url: 'https://api.iextrading.com/1.0/ref-data/symbols'\n        }).then(data => {\n            this.companies = data;\n            \n        })\n    }\n\n    getStockData (ticker) {\n        $.ajax({\n            method: 'GET',\n            url: `https://api.iextrading.com/1.0/stock/${ticker}/chart/1y`\n        }).then(data => {\n            this.ul.innerHTML = ''\n            this.input.value = ''\n            this.prices = data;\n            let simulations = []\n            let i = 0;\n            while (simulations.length <= 50) {\n                simulations.push({idx: i, data: this.calculateSim(this.prices)});\n                i++;\n            }\n            new LineChart (simulations);\n        })\n    }\n\n    getMatches (input) {\n        return this.companies.filter(company => {\n            let len = input.length;\n            if (company.name.slice(0, len).toLowerCase() === input.toLowerCase()) {\n                return company.name\n            }\n        })\n    }\n\n    displayMatches (input) {\n        let matches = this.getMatches(input);\n        let lis = matches.map(company => {\n            return `<li data-ticker=${company.symbol}>\n                <span class='company' data-ticker=${company.symbol}>${company.name}</span>\n            </li>`;\n        }).join('');\n\n        if (input.length > 0) {\n            this.ul.innerHTML = lis;  \n        } else {\n            this.ul.innerHTML = '';\n        }\n    }\n\n    fetchStockData (e) {\n        let ticker = e.target.dataset.ticker.toLowerCase();\n        if (ticker) {\n            this.getStockData(ticker);\n        }\n    }\n\n    calculateSim (data) {\n        let filterData = data.filter(datum => {\n            if (datum.close !== undefined) return datum\n        })\n        let average = this.calculateAvg(filterData);\n        let stdDev = this.calculateStdDev(filterData, average);\n        let variance = Math.pow(stdDev, 2);\n        let recentPrice = filterData[filterData.length - 1].close;\n        let sim = [{date: 0, price: recentPrice}];\n        for (let i = 0; i < filterData.length; i++) {\n            let dailyDrift = average - (variance / 2);\n            let drift = (dailyDrift - (Math.pow(stdDev, 2) / 2));\n            let shock = drift + stdDev * this.calculateNoise(-3, 3);\n            let nextPrice = sim[i].price * Math.pow(Math.E, shock);\n            sim.push({date: i, price: nextPrice});\n        }\n        return sim;\n    }\n\n    calculateAvg (data) {\n        let percent = 0;\n        for (let i = 0; i < data.length - 1; i++) {\n            let change = (data[i + 1].close - data[i].close) / data[i].close ;\n            percent += change;\n        }\n        return percent / (data.length - 1)\n    }\n\n    calculateStdDev (data, average) {\n        let sum = 0;\n        for (let i = 0; i < data.length - 1; i++) {\n            let change = (data[i + 1].close - data[i].close) / data[i].close;\n            let stdDev = Math.pow(change - average, 2);\n\n            sum += stdDev;\n        }\n        return Math.pow((sum / (data.length - 1)), 0.5);\n    }\n\n    calculateNoise (min, max,) {\n        var u = 0, v = 0;\n        while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)\n        while (v === 0) v = Math.random();\n        let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);\n\n        num = num / 10.0 + 0.5; // Translate to 0 -> 1\n        if (num > 1 || num < 0) num = this.calculateNoise(min, max); // resample between 0 and 1 if out of range\n        num *= max - min; // Stretch to fill range\n        num += min; // offset to min\n        return num;\n    }\n}\n\nmodule.exports = Search\n\n//# sourceURL=webpack:///./src/search.js?");

/***/ })

/******/ });