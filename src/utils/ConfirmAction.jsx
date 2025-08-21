import Swal from 'sweetalert2'

export const confirmAction = async ({
  title = '¿Estás seguro?',
  text = 'Esta acción no se puede deshacer.',
  confirmText = 'Sí, confirmar',
  cancelText = 'Cancelar',
  icon = 'warning',
  confirmButtonColor = '#d33',
  cancelButtonColor = '#3085d6'
}) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
    backdrop: true
  });

  return result.isConfirmed
}