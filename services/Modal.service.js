trackflow.service('ModalService', function() {
    this.showModal = function(modalId) {
        var modalElement = document.getElementById(modalId);
        if (modalElement) {
            modalElement.classList.add('show');
            modalElement.style.display = 'block';
            modalElement.setAttribute('aria-modal', 'true');
        }
    };

    this.hideModal = function(modalId) {
        var modalElement = document.getElementById(modalId);
        if (modalElement) {
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
            modalElement.removeAttribute('aria-modal');
        }
    };
});