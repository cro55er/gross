(function() {

    var menu = document.querySelector('.main-nav'),
        toggleBtn = document.querySelector('.toggle-menu');

    toggleBtn.addEventListener('click', function() {
        toggleBtn.classList.toggle('active');
        menu.classList.toggle('show');
    });

    var btnsShowPopup   = document.querySelectorAll('.show-popup'),
        overlay         = document.querySelector('.page-overlay'),
        btnsClosePopup  = document.querySelectorAll('.popup-btn-close'),
        popups          = document.querySelectorAll('.popup');

    btnsShowPopup.forEach(function (btn) {
        btn.addEventListener('click', function () {
            event.preventDefault();
            var modal = document.querySelector('.' + btn.getAttribute('data-target'));
            modal.classList.add('show');
            overlay.classList.add('show');
        });
    });

    btnsClosePopup.forEach(function (btn) {
        btn.addEventListener('click', closePopup);
    });

    overlay.addEventListener('click', closePopup);

    function closePopup() {
        event.preventDefault()
        popups.forEach(function (popup) {
            popup.classList.remove('show');
        });
        overlay.classList.remove('show');
    }


})();