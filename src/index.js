let Search = require('./search');

document.addEventListener("DOMContentLoaded", (e) => {
    let input = document.querySelector('.search-input');
    let ul = document.querySelector('.search-ul');
    let button = document.querySelector('.reset-button');
    $(document).ready(() => $.ajax({
        method: 'GET',
        url: 'https://api.iextrading.com/1.0/ref-data/symbols'
    }).then(data => {
        let companies = data
        new Search ({input, ul, button, companies });
    }))
});
