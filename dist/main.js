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

/***/ "./src/search.js":
/*!***********************!*\
  !*** ./src/search.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Search {\n\n    constructor({ input, ul }) {\n        this.fetchCompanies();\n        this.input = input;\n        this.ul = ul;\n        this.input.addEventListener('input', (e) => {\n            e.preventDefault();\n            this.displayMatches(e.currentTarget.value);\n        });\n        this.ul.addEventListener('click', (e) => {\n            e.preventDefault();\n            this.fetchStockData(e);\n        });\n    }\n\n    fetchCompanies () {\n        $.ajax({\n            method: 'GET',\n            url: 'https://api.iextrading.com/1.0/ref-data/symbols'\n        }).then(data => {\n            this.companies = data;\n        })\n    }\n\n    getStockData (ticker) {\n        $.ajax({\n            method: 'GET',\n            url: `https://api.iextrading.com/1.0/stock/${ticker}/chart/1y`\n        }).then(data => {\n            this.prices = data;\n            console.log(this.prices)\n        })\n    }\n\n    getMatches (input) {\n        return this.companies.filter(company => {\n            let len = input.length;\n            if (company.name.slice(0, len).toLowerCase() === input.toLowerCase()) {\n                return company.name\n            }\n        })\n    }\n\n    displayMatches (input) {\n        let matches = this.getMatches(input);\n        let lis = matches.map(company => {\n            return `<li data-ticker=${company.symbol}>\n                <span class='company' data-ticker=${company.symbol}>${company.name}</span>\n            </li>`;\n        }).join('');\n\n        if (input.length > 0) {\n            this.ul.innerHTML = lis;  \n        } else {\n            this.ul.innerHTML = '';\n        }\n    }\n\n    fetchStockData (e) {\n        let ticker = e.target.dataset.ticker.toLowerCase();\n        if (ticker) {\n            this.getStockData(ticker);\n        }\n    }\n}\n\nmodule.exports = Search\n\n//# sourceURL=webpack:///./src/search.js?");

/***/ })

/******/ });