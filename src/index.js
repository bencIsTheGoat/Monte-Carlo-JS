let Search = require('./search');


document.addEventListener("DOMContentLoaded", (e) => {
    let input = document.querySelector('.search-input');
    let ul = document.querySelector('.search-ul');
    let button = document.querySelector('.reset-button');
    new Search ({input, ul, button});
});
