import { WebDriver } from 'selenium-webdriver';
import { SeleniumConfig } from '../config/selenium.config';

/**
 * Gestor del ciclo de vida del WebDriver
 * 
 * CONCEPTO SINGLETON PATTERN:
 * - Garantiza una única instancia del driver por sesión de pruebas
 * - Gestiona eficientemente los recursos del sistema
 * - Facilita la compartición del driver entre múltiples pruebas
 */
export class DriverManager {
  private static driver: WebDriver | null = null;
  private static isHeadless: boolean = false;

  /**
   * Obtiene o crea una instancia del WebDriver
   * 
   * CONCEPTO LAZY INITIALIZATION:
   * - El driver solo se crea cuando se necesita
   * - Ahorra recursos si no se ejecutan pruebas
   */
  static async getDriver(headless: boolean = false): Promise<WebDriver> {
    if (!this.driver) {
      this.isHeadless = headless;
      this.driver = await SeleniumConfig.createDriver(headless);
    }
    return this.driver;
  }

  /**
   * Cierra y limpia el driver actual
   * 
   * CONCEPTO RESOURCE CLEANUP:
   * - Libera memoria y procesos del navegador
   * - Debe llamarse al finalizar las pruebas
   */
  static async quitDriver(): Promise<void> {
    if (this.driver) {
      await SeleniumConfig.quitDriver(this.driver);
      this.driver = null;
    }
  }

  /**
   * Reinicia el driver (cierra y crea uno nuevo)
   * 
   * CONCEPTO TEST ISOLATION:
   * - Cada conjunto de pruebas puede tener un navegador limpio
   * - Evita efectos secundarios entre pruebas
   */
  static async restartDriver(headless: boolean = false): Promise<WebDriver> {
    await this.quitDriver();
    return await this.getDriver(headless);
  }
}
