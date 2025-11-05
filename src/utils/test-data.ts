/**
 * Datos de prueba para los test cases
 * 
 * CONCEPTO DATA-DRIVEN TESTING:
 * - Separar los datos de prueba del código de prueba
 * - Facilita la mantenibilidad y reutilización
 * - Permite agregar nuevos casos sin modificar lógica
 */

export interface FormData {
  name: string;
  message: string;
}

export interface ProductData {
  name: string;
  description: string;
  price: number;
  category: string;
}

/**
 * Datos válidos para pruebas positivas
 * 
 * CONCEPTO POSITIVE TESTING:
 * - Pruebas con datos válidos y esperados
 * - Verifican el comportamiento normal del sistema
 */
export const VALID_FORM_DATA: FormData = {
  name: 'Selenium Test User',
  message: 'This is a valid test message for functional testing'
};

export const VALID_PRODUCT_DATA: ProductData = {
  name: 'Test Product',
  description: 'This is a test product created by automated testing',
  price: 99.99,
  category: 'Electronics'
};

/**
 * Datos inválidos para pruebas negativas
 * 
 * CONCEPTO NEGATIVE TESTING:
 * - Pruebas con datos inválidos o inesperados
 * - Verifican el manejo de errores del sistema
 */
export const INVALID_FORM_DATA: FormData[] = [
  {
    name: '',
    message: 'Message without name'
  },
  {
    name: 'Name without message',
    message: ''
  },
  {
    name: '',
    message: ''
  },
  {
    name: 'A',  // Nombre muy corto
    message: 'M'  // Mensaje muy corto
  }
];

/**
 * Datos de límites para pruebas de frontera
 * 
 * CONCEPTO BOUNDARY TESTING:
 * - Pruebas en los límites de los valores aceptables
 * - Detectan errores en los extremos de los rangos
 */
export const BOUNDARY_FORM_DATA: FormData[] = [
  {
    name: 'A'.repeat(255),  // Máximo permitido
    message: 'Short message'
  },
  {
    name: 'Test',
    message: 'M'.repeat(1000)  // Mensaje muy largo
  }
];

/**
 * URLs utilizadas en las pruebas
 * 
 * CONCEPTO CONFIGURATION:
 * - Centralizar URLs para fácil mantenimiento
 * - Permite cambiar entornos fácilmente
 */
export const TEST_URLS = {
  SELENIUM_FORM: 'https://www.selenium.dev/selenium/web/web-form.html',
  SPRING_BOOT_APP: 'http://localhost:8083',
  // URL de respaldo si el servidor local no está disponible
  DEMO_FORM: 'https://www.selenium.dev/selenium/web/web-form.html'
};

/**
 * Timeouts para las pruebas
 * 
 * CONCEPTO TIMEOUTS:
 * - Evitar pruebas que se ejecuten indefinidamente
 * - Balance entre velocidad y estabilidad
 */
export const TIMEOUTS = {
  SHORT: 5000,    // 5 segundos - Para elementos rápidos
  MEDIUM: 10000,  // 10 segundos - Para carga de página
  LONG: 30000     // 30 segundos - Para operaciones lentas
};
