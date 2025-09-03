import Swal from 'sweetalert2'

export const confirmAction = async ({
  title = '¿Estás seguro?',
  text = 'Esta acción no se puede deshacer.',
  confirmText = 'Sí, confirmar',
  cancelText = 'Cancelar',
  icon = 'warning',
  confirmButtonColor = '#d33',
  cancelButtonColor = '#3085d6',
  isDark // ahora recibimos el valor desde tu app
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
    backdrop: true,
    background: isDark ? '#1f2937' : '#fff',
    color: isDark ? '#f3f4f6' : '#111',
    customClass: {
      popup: isDark ? 'dark-popup' : '',
      title: isDark ? 'dark-title' : '',
      htmlContainer: isDark ? 'dark-text' : '',
      confirmButton: isDark ? 'dark-confirm' : '',
      cancelButton: isDark ? 'dark-cancel' : ''
    }
  })

  return result.isConfirmed
}