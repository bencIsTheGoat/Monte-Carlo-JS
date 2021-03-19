let Search = require('./search');

document.addEventListener("DOMContentLoaded", (e) => {
    let input = document.querySelector('.search-input');
    let ul = document.querySelector('.search-ul');
    let button = document.querySelector('.reset-button');
    $(document).ready(() => $.ajax({
        method: 'GET',
        url: 'https://cloud.iexapis.com/stable/ref-data/iex/symbols?token=pk_cf7af45bc1714be8ba5a7869e7acc84d'
    }).then(data => {
        let companies = data
        new Search ({input, ul, button, companies });
    }))
});
