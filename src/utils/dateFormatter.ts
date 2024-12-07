// utils/dateFormatter.ts
export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // Convertir el timestamp a milisegundos
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  