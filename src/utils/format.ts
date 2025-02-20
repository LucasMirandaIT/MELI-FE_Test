export const formatPrice = (value: number, currency: string) => {
    return value.toLocaleString('es-AR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }