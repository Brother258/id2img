
const swalScript = document.createElement('script');
swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
document.head.appendChild(swalScript);

swalScript.onload = function () {

    
    Swal.fire({
        title: 'Legal Use Notice',
        text: 'Please use this tool legally and responsibly.',
        icon: 'warning',
        confirmButtonText: 'I Understand',
        confirmButtonColor: '#1abc9c'
    });

    window.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('idForm');
        if (!form) return;

        
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.style.marginBottom = '15px';
        checkboxWrapper.style.textAlign = 'left';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'legalUseCheckbox';
        checkbox.style.marginRight = '8px';

        const label = document.createElement('label');
        label.setAttribute('for', 'legalUseCheckbox');
        label.textContent = 'I confirm my use is legal';

        checkboxWrapper.appendChild(checkbox);
        checkboxWrapper.appendChild(label);

        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.style.opacity = '0.6';
            submitButton.style.cursor = 'not-allowed';
            submitButton.parentNode.insertBefore(checkboxWrapper, submitButton);
        }

        
        checkbox.addEventListener('change', function () {
            submitButton.disabled = !this.checked;
            submitButton.style.opacity = this.checked ? '1' : '0.6';
            submitButton.style.cursor = this.checked ? 'pointer' : 'not-allowed';
        });

        
        form.addEventListener('submit', function (e) {
            if (!checkbox.checked) {
                e.preventDefault();
                Swal.fire({
                    title: 'Checkbox Required',
                    text: 'You must confirm legal use before proceeding.',
                    icon: 'error',
                    confirmButtonColor: '#1abc9c'
                });
            }
        });
    });
};
