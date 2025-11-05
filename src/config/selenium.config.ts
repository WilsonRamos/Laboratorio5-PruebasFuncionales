import { Builder, WebDriver, Browser } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

/**
 * Configuración de Selenium WebDriver
 * 
 * CONCEPTO: Esta clase gestiona la creación y configuración del WebDriver,
 * que es el componente principal que permite controlar el navegador.
 */
export class SeleniumConfig {
  /**
   * Opciones de Chrome para el modo headless
   * 
   * CONCEPTO HEADLESS MODE:
   * - Permite ejecutar el navegador sin interfaz gráfica
   * - Útil para CI/CD pipelines
   * - Más rápido que el modo con interfaz
   * - Consume menos recursos
   */
  private static getChromeOptions(headless: boolean = false): chrome.Options {
    const options = new chrome.Options();
    
    if (headless) {
      options.addArguments('--headless');
      options.addArguments('--disable-gpu');
    }
    
    // Argumentos adicionales para estabilidad
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--window-size=1920,1080');
    
    return options;
  }

  /**
   * Crea una instancia de WebDriver con Chrome
   * 
   * CONCEPTO BUILDER PATTERN:
   * - Selenium usa el patrón Builder para construir el WebDriver
   * - Permite configuración fluida y flexible
   * - Separa la construcción de la representación
   * 
   * @param headless - Si true, ejecuta en modo sin interfaz gráfica
   * @returns Instancia de WebDriver configurada
   */
  static async createDriver(headless: boolean = false): Promise<WebDriver> {
    const options = this.getChromeOptions(headless);
    
    const driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(options)
      .build();
    
    // Configuración de timeouts
    // CONCEPTO IMPLICIT WAIT:
    // - Espera implícita para que los elementos aparezcan en el DOM
    // - Evita fallos por elementos que aún no están disponibles
    await driver.manage().setTimeouts({
      implicit: 10000,  // 10 segundos
      pageLoad: 30000,  // 30 segundos
      script: 30000     // 30 segundos
    });
    
    return driver;
  }

  /**
   * Limpia y cierra el WebDriver
   * 
   * CONCEPTO CLEANUP:
   * - Importante liberar recursos del sistema
   * - Cierra el navegador y todas las ventanas
   * - Previene memory leaks
   */
  static async quitDriver(driver: WebDriver): Promise<void> {
    if (driver) {
      await driver.quit();
    }
  }
}
