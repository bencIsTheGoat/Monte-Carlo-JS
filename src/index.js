let Search = require('./search');

document.addEventListener("DOMContentLoaded", (e) => {
    let input = document.querySelector('.search-input');
    let ul = document.querySelector('.search-ul');
    let button = document.querySelector('.reset-button');
    $(document).ready(() => $.ajax({
        method: 'GET',
        url: 'https://cloud.iexapis.com/stable/ref-data/symbols?token=pk_a4d537a2e4054c8ca85a79513e34111b'
    }).then(data => {
        let companies = data
        new Search ({input, ul, button, companies });
    }))
});
