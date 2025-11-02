document.addEventListener("DOMContentLoaded", function() {
    fetch('./templates/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar o navbar:', error));
});