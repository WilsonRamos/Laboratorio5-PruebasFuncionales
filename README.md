# Laboratorio 5 - Pruebas Funcionales con Selenium y Jest

## 📋 Información del Curso

- **Docente**: Dsc. Edgar Sarmiento Calisaya
- **Carrera**: Escuela Profesional de Ciencia de la Computación
- **Curso**: Ingeniería de Software II
- **Tema**: Pruebas Funcionales
- **Duración**: 2 horas

## 🎯 Objetivos

Automatizar las pruebas funcionales utilizando los frameworks **Selenium** y **Jest** (equivalente a xUnit en el ecosistema JavaScript/TypeScript), maximizando la cobertura de pruebas.

## 🛠️ Tecnologías Utilizadas

- **TypeScript**: Lenguaje principal (type-safe JavaScript)
- **Selenium WebDriver**: Automatización de navegador
- **Jest**: Framework de testing (equivalente a xUnit/JUnit)
- **Node.js**: Runtime de JavaScript

## 📦 Prerequisitos

- Node.js 18+ instalado
- Chrome/Chromium instalado
- Git instalado

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Compilar TypeScript
npm run build

# Ejecutar pruebas
npm test

# Ejecutar pruebas con cobertura
npm run test:coverage

# Ejecutar pruebas en modo watch
npm run test:watch
```

## 📁 Estructura del Proyecto

```
laboratorio5-pruebas-funcionales/
├── src/
│   ├── config/
│   │   └── selenium.config.ts      # Configuración de Selenium
│   ├── pages/
│   │   ├── base.page.ts            # Page Object base
│   │   └── selenium-form.page.ts   # Page Object para formulario
│   ├── tests/
│   │   ├── basic-selenium.test.ts  # Prueba básica de Selenium
│   │   ├── form-tests.test.ts      # Pruebas del formulario
│   │   └── create-product.test.ts  # Pruebas de crear producto
│   └── utils/
│       ├── driver.manager.ts       # Gestión del WebDriver
│       └── test-data.ts            # Datos de prueba
├── docs/
│   ├── casos-de-prueba.md          # Documentación de casos
│   └── conceptos.md                # Conceptos teóricos
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## 📝 Actividades Implementadas

### Actividad A: Proyecto Maven con Selenium

✅ Implementado con npm/Node.js (equivalente en ecosistema JavaScript)

### Actividad B: Importar Selenium WebDriver

✅ Configuración de dependencias en `package.json`

### Actividad C: Proyecto de Prueba Spring Boot

✅ Implementado con el proyecto de ejemplo de Selenium

### Actividad D: Casos de Prueba - "Create Product"

✅ Implementados en `src/tests/create-product.test.ts`

### Actividad E: Pruebas con Jest (xUnit)

✅ Implementadas con Jest usando método xUnit (Test Suites y Test Cases)

## 🧪 Casos de Prueba Implementados

### Suite: Funcionalidad "Create Product"

| Objeto de Prueba | Escenario/Acciones                  | Valores de Prueba                              | Resultado Esperado              |
| ---------------- | ----------------------------------- | ---------------------------------------------- | ------------------------------- |
| Formulario Web   | Enviar formulario con datos válidos | name: "Product Test", message: "Valid message" | Formulario enviado exitosamente |
| Formulario Web   | Verificar título de la página       | URL del formulario                             | Título contiene "Web form"      |
| Formulario Web   | Ingresar texto en campo de entrada  | Texto: "Selenium Test"                         | Texto ingresado correctamente   |
| Formulario Web   | Enviar formulario vacío             | Campos vacíos                                  | Validación de campos requeridos |
| Formulario Web   | Verificar elementos del formulario  | -                                              | Todos los elementos visibles    |

## 📊 Cobertura de Pruebas

Ejecuta `npm run test:coverage` para ver el reporte detallado de cobertura.

## 🔍 Conceptos Clave

### 1. **Page Object Model (POM)**

Patrón de diseño que encapsula los elementos y acciones de una página en una clase, mejorando la mantenibilidad.

### 2. **Selenium WebDriver**

API para automatizar navegadores web, permitiendo simular interacciones de usuarios reales.

### 3. **Jest Testing Framework**

Framework de testing completo con aserciones, mocks, cobertura y más.

### 4. **Test Suites y Test Cases**

Organización jerárquica de pruebas para mejor estructura y mantenimiento.

## 📚 Referencias

- [Selenium WebDriver Documentation](https://www.selenium.dev/documentation/webdriver/)
- [Jest Documentation](https://jestjs.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Spring Boot Web Form Example](https://github.com/spring-framework-guru/spring-boot-web-app)

## 👨‍💻 Autor

Wilson - UNSA 2025-B

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles
