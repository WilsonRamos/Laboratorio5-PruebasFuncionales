import { WebDriver, By, until, WebElement } from 'selenium-webdriver';
import { TIMEOUTS } from '../utils/test-data';

/**
 * Clase base para Page Objects
 * 
 * CONCEPTO PAGE OBJECT MODEL (POM):
 * - Patrón de diseño que encapsula la estructura de una página web
 * - Separa la lógica de prueba de los detalles de la UI
 * - Mejora la mantenibilidad cuando cambia la interfaz
 * - Promueve la reutilización de código
 * 
 * BENEFICIOS:
 * 1. Código más legible: Las pruebas se leen como lenguaje natural
 * 2. Menos duplicación: Métodos compartidos entre múltiples pruebas
 * 3. Fácil mantenimiento: Cambios en un solo lugar
 * 4. Abstracción: Los tests no necesitan conocer detalles de HTML
 */
export abstract class BasePage {
  protected driver: WebDriver;

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  /**
   * Navega a una URL específica
   * 
   * CONCEPTO NAVIGATION:
   * - Primer paso en cualquier prueba web
   * - WebDriver controla la navegación del navegador
   */
  async navigateTo(url: string): Promise<void> {
    await this.driver.get(url);
  }

  /**
   * Obtiene el título de la página actual
   * 
   * CONCEPTO ASSERTION DATA:
   * - El título es un dato comúnmente usado en assertions
   * - Verifica que estamos en la página correcta
   */
  async getTitle(): Promise<string> {
    return await this.driver.getTitle();
  }

  /**
   * Obtiene la URL actual
   */
  async getCurrentUrl(): Promise<string> {
    return await this.driver.getCurrentUrl();
  }

  /**
   * Espera a que un elemento sea visible
   * 
   * CONCEPTO EXPLICIT WAIT:
   * - Espera específica para una condición
   * - Más preciso que implicit wait
   * - Evita errores por elementos no disponibles
   * 
   * @param locator - Selector del elemento
   * @param timeout - Tiempo máximo de espera
   */
  async waitForElement(
    locator: By, 
    timeout: number = TIMEOUTS.MEDIUM
  ): Promise<WebElement> {
    return await this.driver.wait(
      until.elementLocated(locator),
      timeout,
      `Element ${locator.toString()} not found after ${timeout}ms`
    );
  }

  /**
   * Espera a que un elemento sea visible y clickeable
   * 
   * CONCEPTO ELEMENT INTERACTABILITY:
   * - Un elemento puede existir pero no ser clickeable
   * - Verifica visibilidad y estado de interacción
   */
  async waitForElementToBeClickable(
    locator: By,
    timeout: number = TIMEOUTS.MEDIUM
  ): Promise<WebElement> {
    const element = await this.waitForElement(locator, timeout);
    await this.driver.wait(
      until.elementIsVisible(element),
      timeout,
      `Element ${locator.toString()} not visible after ${timeout}ms`
    );
    return element;
  }

  /**
   * Encuentra un elemento
   * 
   * CONCEPTO LOCATORS:
   * - Estrategias para encontrar elementos en el DOM
   * - By.id, By.name, By.css, By.xpath, etc.
   */
  async findElement(locator: By): Promise<WebElement> {
    return await this.driver.findElement(locator);
  }

  /**
   * Encuentra múltiples elementos
   */
  async findElements(locator: By): Promise<WebElement[]> {
    return await this.driver.findElements(locator);
  }

  /**
   * Hace click en un elemento
   * 
   * CONCEPTO USER INTERACTION:
   * - Simula la interacción real del usuario
   * - Espera a que el elemento sea clickeable
   */
  async click(locator: By): Promise<void> {
    const element = await this.waitForElementToBeClickable(locator);
    await element.click();
  }

  /**
   * Escribe texto en un campo de entrada
   * 
   * CONCEPTO INPUT SIMULATION:
   * - Simula el ingreso de texto por teclado
   * - Útil para formularios
   */
  async type(locator: By, text: string): Promise<void> {
    const element = await this.waitForElement(locator);
    await element.clear();  // Limpia el campo primero
    await element.sendKeys(text);
  }

  /**
   * Obtiene el texto de un elemento
   * 
   * CONCEPTO TEXT VERIFICATION:
   * - Verifica el contenido visible de elementos
   * - Útil para assertions de mensajes y labels
   */
  async getText(locator: By): Promise<string> {
    const element = await this.waitForElement(locator);
    return await element.getText();
  }

  /**
   * Verifica si un elemento está visible
   * 
   * CONCEPTO VISIBILITY CHECK:
   * - No solo verifica existencia, sino visibilidad
   * - Elemento puede existir pero estar oculto con CSS
   */
  async isElementVisible(locator: By): Promise<boolean> {
    try {
      const element = await this.findElement(locator);
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Espera un tiempo específico
   * 
   * CONCEPTO SLEEP/WAIT:
   * - Usar con precaución, preferir explicit waits
   * - Útil solo en casos muy específicos
   */
  async sleep(milliseconds: number): Promise<void> {
    await this.driver.sleep(milliseconds);
  }

  /**
   * Toma una captura de pantalla
   * 
   * CONCEPTO SCREENSHOT FOR DEBUGGING:
   * - Útil para debugging de pruebas fallidas
   * - Captura el estado visual en momento específico
   */
  async takeScreenshot(): Promise<string> {
    return await this.driver.takeScreenshot();
  }
}
