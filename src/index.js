let Search = require('./search');


document.addEventListener("DOMContentLoaded", (e) => {
    let input = document.querySelector('.search-input');
    let ul = document.querySelector('.search-ul');
    new Search ({input, ul});
});
