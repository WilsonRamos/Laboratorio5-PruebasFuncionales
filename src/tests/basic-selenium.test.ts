import { WebDriver } from 'selenium-webdriver';
import { DriverManager } from '../utils/driver.manager';
import { SeleniumFormPage } from '../pages/selenium-form.page';
import { TEST_URLS } from '../utils/test-data';

/**
 * ACTIVIDAD C: Prueba básica de Selenium
 * 
 * CONCEPTO TEST SUITE:
 * - describe() crea una suite de pruebas relacionadas
 * - Agrupa tests que prueban funcionalidad similar
 * - Permite organización jerárquica
 * 
 * CONCEPTO TEST LIFECYCLE:
 * - beforeAll: Se ejecuta una vez antes de todos los tests
 * - beforeEach: Se ejecuta antes de cada test
 * - afterEach: Se ejecuta después de cada test
 * - afterAll: Se ejecuta una vez después de todos los tests
 */
describe('Actividad C: Pruebas Básicas con Selenium WebDriver', () => {
  let driver: WebDriver;
  let formPage: SeleniumFormPage;

  /**
   * CONCEPTO SETUP:
   * - Inicialización antes de las pruebas
   * - Crea recursos compartidos (driver, pages)
   * - Ejecuta una sola vez por suite
   */
  beforeAll(async () => {
    // Crear driver (cambia a true para modo headless)
    driver = await DriverManager.getDriver(false);
    formPage = new SeleniumFormPage(driver);
  });

  /**
   * CONCEPTO TEARDOWN:
   * - Limpieza después de las pruebas
   * - Libera recursos (cierra navegador)
   * - Previene memory leaks
   */
  afterAll(async () => {
    await DriverManager.quitDriver();
  });

  /**
   * TEST CASE 1: Verificar navegación a la página
   * 
   * CONCEPTO SMOKE TEST:
   * - Prueba básica de funcionalidad crítica
   * - Verifica que la aplicación está accesible
   * - Primera prueba que debe pasar
   */
  test('Debe navegar a la página del formulario web', async () => {
    // ARRANGE: Preparar precondiciones
    // (En este caso, ya tenemos el driver y page object)

    // ACT: Ejecutar la acción
    await formPage.open();

    // ASSERT: Verificar el resultado
    const currentUrl = await formPage.getCurrentUrl();
    expect(currentUrl).toBe(TEST_URLS.SELENIUM_FORM);
  });

  /**
   * TEST CASE 2: Verificar título de la página
   * 
   * CONCEPTO TITLE VERIFICATION:
   * - El título es un identificador importante de la página
   * - Ayuda a confirmar que estamos en la página correcta
   * - Detecta problemas de navegación o carga
   */
  test('Debe obtener el título correcto de la página', async () => {
    await formPage.open();
    
    const title = await formPage.getTitle();
    
    // CONCEPTO ASSERTION:
    // - toContain verifica que una cadena contiene otra
    // - Más flexible que toBe (igualdad exacta)
    expect(title).toContain('Web form');
  });

  /**
   * TEST CASE 3: Verificar elementos del formulario
   * 
   * CONCEPTO STRUCTURAL TEST:
   * - Verifica que todos los elementos necesarios existen
   * - Detecta cambios inesperados en la UI
   * - Prueba de integridad de la página
   */
  test('Debe verificar que todos los elementos del formulario están presentes', async () => {
    await formPage.open();
    
    const arePresent = await formPage.areAllFormElementsPresent();
    
    // CONCEPTO BOOLEAN ASSERTION:
    // - toBeTruthy/toBeFalsy para valores booleanos
    // - Más expresivo que toBe(true)
    expect(arePresent).toBeTruthy();
  });

  /**
   * TEST CASE 4: Ingresar texto en campo de entrada
   * 
   * CONCEPTO INPUT TEST:
   * - Verifica capacidad de ingresar datos
   * - Prueba interacción básica con formularios
   * - Base para pruebas más complejas
   */
  test('Debe poder ingresar texto en el campo de entrada', async () => {
    await formPage.open();
    
    const testText = 'Selenium WebDriver Test';
    
    // No lanza error = éxito
    await expect(
      formPage.fillTextInput(testText)
    ).resolves.not.toThrow();
  });

  /**
   * TEST CASE 5: Verificar navegación y header
   * 
   * CONCEPTO TEXT VERIFICATION:
   * - Verifica contenido textual de elementos
   * - Útil para validar mensajes y labels
   */
  test('Debe mostrar el header correcto de la página', async () => {
    await formPage.open();
    
    const header = await formPage.getPageHeader();
    
    expect(header).toBe('Web form');
  });

  /**
   * TEST CASE 6: Prueba de timeout
   * 
   * CONCEPTO TIMEOUT TEST:
   * - Verifica que las operaciones no se cuelguen
   * - Jest permite configurar timeout por test
   */
  test('Debe cargar la página dentro del tiempo límite', async () => {
    const startTime = Date.now();
    
    await formPage.open();
    
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    // CONCEPTO PERFORMANCE ASSERTION:
    // - Verifica que la carga es suficientemente rápida
    // - 10 segundos es un límite razonable
    expect(loadTime).toBeLessThan(10000);
  }, 15000); // Timeout de 15 segundos para este test
});

/**
 * CONCEPTOS CLAVE DEMOSTRADOS:
 * 
 * 1. AAA PATTERN (Arrange-Act-Assert):
 *    - Arrange: Configurar precondiciones
 *    - Act: Ejecutar la acción a probar
 *    - Assert: Verificar el resultado
 * 
 * 2. TEST INDEPENDENCE:
 *    - Cada test es independiente
 *    - No depende del estado de otros tests
 *    - Puede ejecutarse en cualquier orden
 * 
 * 3. DESCRIPTIVE TEST NAMES:
 *    - Nombres claros que explican qué se prueba
 *    - Documentación viva del comportamiento
 *    - Facilita identificar fallos
 * 
 * 4. SINGLE RESPONSIBILITY:
 *    - Cada test verifica una sola cosa
 *    - Fácil de entender y mantener
 *    - Fallos más fáciles de diagnosticar
 */
