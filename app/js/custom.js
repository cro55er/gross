(function() {

    var menu = document.querySelector('.main-nav'),
        toggleBtn = document.querySelector('.toggle-menu');

    toggleBtn.addEventListener('click', function() {
        toggleBtn.classList.toggle('active');
        menu.classList.toggle('show');
    });

})();