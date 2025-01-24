
import Swal from 'sweetalert2';

export const swal = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary mx-2',
      cancelButton: 'btn btn-danger mx-2'
    },
    icon: 'question',
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'Proceed',
    reverseButtons: true
});

export const swalSuccess = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success mx-2',
      cancelButton: 'btn btn-danger mx-2'
    },
    icon: 'success',
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'Proceed',
    reverseButtons: true
});

export const swalDanger = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger mx-2',
      cancelButton: 'btn btn-secondary mx-2'
    },
    icon: 'error',
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: 'Proceed',
    reverseButtons: true
});