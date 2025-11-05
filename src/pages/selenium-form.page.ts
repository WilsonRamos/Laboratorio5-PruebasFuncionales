import { By, WebDriver } from 'selenium-webdriver';
import { BasePage } from './base.page';
import { FormData, TEST_URLS } from '../utils/test-data';

/**
 * Page Object para el formulario de Selenium
 * 
 * CONCEPTO PAGE OBJECT ESPECÍFICO:
 * - Hereda funcionalidad común de BasePage
 * - Define elementos y acciones específicas de esta página
 * - Encapsula toda la interacción con el formulario
 */
export class SeleniumFormPage extends BasePage {
  /**
   * Locators (selectores) de elementos
   * 
   * CONCEPTO LOCATOR STRATEGY:
   * - Preferir ID > Name > CSS > XPath (en orden de estabilidad)
   * - IDs son únicos y más rápidos
   * - CSS es más legible que XPath
   * - XPath útil para navegación compleja del DOM
   */
  private readonly locators = {
    // Campo de texto principal
    textInput: By.id('my-text-id'),
    
    // Campo de contraseña
    passwordInput: By.name('my-password'),
    
    // Textarea para mensajes
    textArea: By.name('my-textarea'),
    
    // Botón de submit
    submitButton: By.css('button[type="submit"]'),
    
    // Mensaje de éxito (después del submit)
    successMessage: By.css('.alert-success'),
    
    // Título de la página
    pageHeader: By.css('h1'),
    
    // Dropdown/Select
    dropdown: By.name('my-select'),
    
    // Checkboxes
    checkbox1: By.id('my-check-1'),
    checkbox2: By.id('my-check-2'),
    
    // Radio buttons
    radio1: By.id('my-radio-1'),
    radio2: By.id('my-radio-2')
  };

  constructor(driver: WebDriver) {
    super(driver);
  }

  /**
   * Navega a la página del formulario
   * 
   * CONCEPTO INITIALIZATION:
   * - Primer paso antes de interactuar con la página
   * - Cada test debe navegar a la página
   */
  async open(): Promise<void> {
    await this.navigateTo(TEST_URLS.SELENIUM_FORM);
  }

  /**
   * Llena el campo de texto principal
   * 
   * CONCEPTO FORM INTERACTION:
   * - Simula el ingreso de datos por el usuario
   * - Verifica que el campo acepta el input
   */
  async fillTextInput(text: string): Promise<void> {
    await this.type(this.locators.textInput, text);
  }

  /**
   * Llena el campo de contraseña
   */
  async fillPasswordInput(password: string): Promise<void> {
    await this.type(this.locators.passwordInput, password);
  }

  /**
   * Llena el textarea
   */
  async fillTextArea(message: string): Promise<void> {
    await this.type(this.locators.textArea, message);
  }

  /**
   * Llena el formulario completo con datos
   * 
   * CONCEPTO COMPOSITE ACTION:
   * - Combina múltiples acciones en una sola
   * - Simplifica los tests
   * - Representa una tarea de usuario completa
   */
  async fillForm(data: FormData): Promise<void> {
    await this.fillTextInput(data.name);
    await this.fillTextArea(data.message);
  }

  /**
   * Hace click en el botón de submit
   * 
   * CONCEPTO FORM SUBMISSION:
   * - Acción crítica que desencadena validación y procesamiento
   * - Debe verificarse que la página responde correctamente
   */
  async submitForm(): Promise<void> {
    await this.click(this.locators.submitButton);
  }

  /**
   * Llena y envía el formulario en un solo método
   * 
   * CONCEPTO HIGH-LEVEL ACTION:
   * - Abstracción de nivel alto para tests más simples
   * - Combina múltiples pasos en uno
   */
  async fillAndSubmitForm(data: FormData): Promise<void> {
    await this.fillForm(data);
    await this.submitForm();
  }

  /**
   * Verifica si el formulario fue enviado exitosamente
   * 
   * CONCEPTO VERIFICATION:
   * - Valida el resultado de una acción
   * - Busca indicadores de éxito (mensaje, redirección, etc.)
   */
  async isFormSubmittedSuccessfully(): Promise<boolean> {
    try {
      return await this.isElementVisible(this.locators.successMessage);
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtiene el mensaje de éxito
   */
  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.locators.successMessage);
  }

  /**
   * Obtiene el header de la página
   * 
   * CONCEPTO PAGE VERIFICATION:
   * - Verifica que estamos en la página correcta
   * - Útil al inicio de cada test
   */
  async getPageHeader(): Promise<string> {
    return await this.getText(this.locators.pageHeader);
  }

  /**
   * Verifica si todos los elementos del formulario están presentes
   * 
   * CONCEPTO STRUCTURAL VERIFICATION:
   * - Verifica la integridad de la página
   * - Detecta cambios inesperados en la UI
   */
  async areAllFormElementsPresent(): Promise<boolean> {
    try {
      await this.waitForElement(this.locators.textInput);
      await this.waitForElement(this.locators.textArea);
      await this.waitForElement(this.locators.submitButton);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Selecciona una opción del dropdown
   * 
   * CONCEPTO SELECT INTERACTION:
   * - Manejo de elementos select/dropdown
   * - Diferente a inputs de texto
   */
  async selectDropdownOption(value: string): Promise<void> {
    const dropdown = await this.findElement(this.locators.dropdown);
    await dropdown.sendKeys(value);
  }

  /**
   * Marca un checkbox
   * 
   * CONCEPTO CHECKBOX INTERACTION:
   * - Manejo de elementos de tipo checkbox
   * - Verifica estado antes de actuar
   */
  async checkCheckbox(checkboxNumber: 1 | 2): Promise<void> {
    const locator = checkboxNumber === 1 
      ? this.locators.checkbox1 
      : this.locators.checkbox2;
    
    const checkbox = await this.findElement(locator);
    const isChecked = await checkbox.isSelected();
    
    if (!isChecked) {
      await checkbox.click();
    }
  }

  /**
   * Selecciona un radio button
   * 
   * CONCEPTO RADIO BUTTON INTERACTION:
   * - Solo uno puede estar seleccionado a la vez
   * - Grupo mutuamente exclusivo
   */
  async selectRadioButton(radioNumber: 1 | 2): Promise<void> {
    const locator = radioNumber === 1 
      ? this.locators.radio1 
      : this.locators.radio2;
    
    await this.click(locator);
  }

  /**
   * Limpia todos los campos del formulario
   * 
   * CONCEPTO FORM RESET:
   * - Útil para preparar estado limpio entre pruebas
   * - Simula "empezar de nuevo"
   */
  async clearForm(): Promise<void> {
    const textInput = await this.findElement(this.locators.textInput);
    const textArea = await this.findElement(this.locators.textArea);
    
    await textInput.clear();
    await textArea.clear();
  }
}
