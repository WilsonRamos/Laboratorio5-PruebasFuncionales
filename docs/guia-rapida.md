# Guía Rápida de Inicio - Laboratorio 5

## 🚀 Inicio Rápido (5 minutos)

### Paso 1: Verificar Prerequisitos

```powershell
# Verificar Node.js (requiere 18+)
node --version

# Verificar npm
npm --version

# Verificar Git
git --version
```

Si falta alguno, instalar desde:

- Node.js: https://nodejs.org/ (LTS)
- Git: https://git-scm.com/

### Paso 2: Instalar Dependencias

```powershell
# En la raíz del proyecto
npm install
```

Esto instalará:

- ✓ TypeScript
- ✓ Selenium WebDriver
- ✓ Jest
- ✓ Todas las dependencias de tipos

### Paso 3: Compilar TypeScript

```powershell
npm run build
```

### Paso 4: Ejecutar Pruebas

```powershell
# Ejecutar todas las pruebas
npm test

# Ejecutar con cobertura
npm run test:coverage

# Ejecutar en modo watch (desarrollo)
npm run test:watch
```

---

## 📚 Estructura del Proyecto

```
laboratorio5-pruebas-funcionales/
│
├── src/                          # Código fuente
│   ├── config/                   # Configuraciones
│   │   └── selenium.config.ts    # Setup de Selenium
│   │
│   ├── pages/                    # Page Objects
│   │   ├── base.page.ts          # Clase base
│   │   └── selenium-form.page.ts # Página del formulario
│   │
│   ├── tests/                    # Casos de prueba
│   │   ├── basic-selenium.test.ts    # Actividad C
│   │   ├── form-tests.test.ts        # Actividad E
│   │   └── create-product.test.ts    # Actividad D
│   │
│   └── utils/                    # Utilidades
│       ├── driver.manager.ts     # Gestor del WebDriver
│       └── test-data.ts          # Datos de prueba
│
├── docs/                         # Documentación
│   ├── casos-de-prueba.md        # Tabla de casos
│   ├── conceptos.md              # Teoría completa
│   └── guia-rapida.md            # Esta guía
│
├── coverage/                     # Reportes de cobertura (generado)
├── dist/                         # JavaScript compilado (generado)
│
├── package.json                  # Dependencias
├── tsconfig.json                 # Config de TypeScript
├── jest.config.js                # Config de Jest
└── README.md                     # Documentación principal
```

---

## 🧪 Comandos Útiles

### Testing

```powershell
# Ejecutar todos los tests
npm test

# Ejecutar suite específica
npm test -- basic-selenium.test.ts
npm test -- form-tests.test.ts
npm test -- create-product.test.ts

# Modo watch (re-ejecuta al cambiar archivos)
npm run test:watch

# Con reporte de cobertura
npm run test:coverage

# Ver reporte HTML de cobertura
start coverage/lcov-report/index.html
```

### TypeScript

```powershell
# Compilar TypeScript
npm run build

# Limpiar archivos generados
npm run clean
```

### Desarrollo

```powershell
# Ver estructura de archivos
tree /F /A

# Ver paquetes instalados
npm list --depth=0

# Actualizar dependencias
npm update
```

---

## 🎯 Actividades del Laboratorio

### ✅ Actividad A: Proyecto Base

**Archivo**: Configuración completa del proyecto

- `package.json` - Dependencias
- `tsconfig.json` - TypeScript config
- `jest.config.js` - Jest config

### ✅ Actividad B: Importar Selenium

**Archivo**: `src/config/selenium.config.ts`

- Configuración de WebDriver
- Opciones de Chrome
- Timeouts

### ✅ Actividad C: Proyecto de Prueba

**Archivo**: `src/tests/basic-selenium.test.ts`

- Navegación básica
- Verificación de título
- Verificación de elementos
- Interacción con formulario

**Ejecutar**:

```powershell
npm test -- basic-selenium.test.ts
```

### ✅ Actividad D: Casos de Prueba "Create Product"

**Archivo**: `src/tests/create-product.test.ts`

- 12 casos de prueba completos
- Clases de equivalencia
- Valores límite
- Tabla de decisión
- Casos de seguridad

**Ejecutar**:

```powershell
npm test -- create-product.test.ts
```

**Documentación**:

```powershell
# Ver tabla de casos
type docs\casos-de-prueba.md
```

### ✅ Actividad E: Pruebas con Jest (xUnit)

**Archivo**: `src/tests/form-tests.test.ts`

- Suite completa con sub-suites
- Pruebas positivas
- Pruebas negativas
- Pruebas de límites
- Pruebas de rendimiento

**Ejecutar**:

```powershell
npm test -- form-tests.test.ts
```

---

## 📖 Conceptos Clave

### Page Object Model (POM)

```typescript
// Page Object encapsula la página
class LoginPage extends BasePage {
  private usernameInput = By.id("username");

  async login(user: string, pass: string) {
    await this.type(this.usernameInput, user);
    // ...
  }
}

// Test usa el Page Object
test("login", async () => {
  await loginPage.login("admin", "123");
  // Fácil de leer y mantener
});
```

### Selenium WebDriver

```typescript
// Crear driver
const driver = await new Builder().forBrowser(Browser.CHROME).build();

// Navegar
await driver.get("https://example.com");

// Encontrar elemento
const element = await driver.findElement(By.id("btn"));

// Interactuar
await element.click();
```

### Jest Testing

```typescript
describe("Suite", () => {
  beforeAll(() => {
    /* Setup */
  });
  afterAll(() => {
    /* Cleanup */
  });

  test("caso de prueba", () => {
    // Arrange
    const data = prepareData();

    // Act
    const result = doSomething(data);

    // Assert
    expect(result).toBe(expected);
  });
});
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'selenium-webdriver'"

**Solución**:

```powershell
npm install
```

### Error: ChromeDriver no encontrado

**Solución**:

1. Verificar que Chrome está instalado
2. El ChromeDriver se instala automáticamente con selenium-webdriver
3. Si persiste, actualizar Chrome:

```powershell
# Verificar versión de Chrome
# Ir a chrome://version/
```

### Tests muy lentos

**Solución**:

```powershell
# Ejecutar en modo headless (sin interfaz)
# Editar en src/utils/driver.manager.ts:
# await DriverManager.getDriver(true); // true = headless
```

### Error de timeout

**Solución**:

- Aumentar timeout en `jest.config.js`: `testTimeout: 60000`
- O por test individual: `test('name', async () => {}, 60000)`

### Puerto 8083 ocupado

**Solución**:
El proyecto usa el formulario público de Selenium:
`https://www.selenium.dev/selenium/web/web-form.html`
No requiere servidor local.

---

## 📊 Interpretando Resultados

### Salida de Jest

```
PASS  src/tests/basic-selenium.test.ts
  ✓ Debe navegar a la página (523ms)
  ✓ Debe obtener el título correcto (312ms)
  ✓ Debe verificar elementos presentes (445ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Time:        2.458s
```

✅ **PASS** = Suite completa exitosa
✓ **Check** = Test individual exitoso
⏱ **(Xms)** = Tiempo de ejecución

### Reporte de Cobertura

```
File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
All files             |   85.71 |    66.67 |     100 |   83.33 |
```

- **Stmts**: Sentencias ejecutadas
- **Branch**: Ramas (if/else) cubiertas
- **Funcs**: Funciones llamadas
- **Lines**: Líneas ejecutadas

**Objetivo**: > 80% en proyectos reales

---

## 💡 Tips para el Desarrollo

### 1. Modo Watch para Desarrollo

```powershell
npm run test:watch
```

Re-ejecuta automáticamente al guardar cambios.

### 2. Ejecutar Test Específico

```powershell
# Solo tests que coincidan con el patrón
npm test -- --testNamePattern="debe navegar"
```

### 3. Ver Output Detallado

```powershell
npm test -- --verbose
```

### 4. Debugging

```typescript
// Agregar screenshot en caso de fallo
test("my test", async () => {
  try {
    // ... test code
  } catch (error) {
    const screenshot = await driver.takeScreenshot();
    // Guardar screenshot para debugging
    throw error;
  }
});
```

### 5. Skip/Only Tests

```typescript
test.skip("skip this test", () => {}); // Omitir
test.only("run only this", () => {}); // Solo este
```

---

## 📝 Checklist de Entregables

Según el laboratorio, debes entregar:

- [x] **Casos de prueba identificados** (formato tabular)
  - Ubicación: `docs/casos-de-prueba.md`
- [x] **Proyecto de automatización de pruebas**
  - Todo el código en `src/`
- [x] **Reporte de ejecución: xUnit/Jest**
  - Ejecutar: `npm test`
  - Capturar salida de consola
- [ ] **Presentación/Demo**
  - Mostrar ejecución de pruebas
  - Explicar Page Objects
  - Mostrar reporte de cobertura

### Generar Reporte para Entrega

```powershell
# 1. Ejecutar tests con cobertura
npm run test:coverage > test-results.txt

# 2. Abrir reporte HTML
start coverage\lcov-report\index.html

# 3. Tomar screenshots del reporte
# (Use Snipping Tool o captura de pantalla)
```

---

## 🎓 Recursos de Aprendizaje

### Documentación Incluida

1. `README.md` - Overview general
2. `docs/conceptos.md` - Teoría completa (50+ páginas)
3. `docs/casos-de-prueba.md` - Estrategias detalladas
4. `docs/guia-rapida.md` - Esta guía

### Código Fuente

- Todos los archivos tienen comentarios extensos
- Cada concepto explicado inline
- Ejemplos prácticos

### Referencias Externas

- [Selenium Docs](https://www.selenium.dev/documentation/)
- [Jest Docs](https://jestjs.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## ❓ Preguntas Frecuentes

**P: ¿Por qué TypeScript en vez de Java como las imágenes?**
R: TypeScript ofrece las mismas capacidades con mejor DX (Developer Experience), tipado moderno, y es más relevante en el desarrollo web actual.

**P: ¿Cuánto tiempo toma ejecutar todas las pruebas?**
R: Aproximadamente 1-2 minutos para la suite completa.

**P: ¿Puedo usar Firefox en vez de Chrome?**
R: Sí, cambiar en `selenium.config.ts`: `.forBrowser(Browser.FIREFOX)`

**P: ¿Funciona en Linux/Mac?**
R: Sí, el proyecto es cross-platform. Solo ajustar comandos de shell.

**P: ¿Cómo agrego más casos de prueba?**
R:

1. Agregar test en archivo `.test.ts` existente
2. O crear nuevo archivo siguiendo patrón `*.test.ts`
3. Jest los descubre automáticamente

---

## 🚦 Próximos Pasos

1. **Explorar el código**:

   ```powershell
   code src/tests/basic-selenium.test.ts
   ```

2. **Ejecutar pruebas**:

   ```powershell
   npm test
   ```

3. **Modificar un test**:

   - Cambiar un valor esperado
   - Ver cómo falla
   - Corregir y re-ejecutar

4. **Estudiar conceptos**:

   ```powershell
   type docs\conceptos.md
   ```

5. **Preparar entregables**:
   - Ejecutar con cobertura
   - Capturar resultados
   - Documentar hallazgos

---

## 📞 Soporte

Si tienes problemas:

1. Revisar sección Troubleshooting arriba
2. Verificar que todas las dependencias están instaladas
3. Revisar logs de error completos
4. Consultar documentación en `docs/`

**Éxito con tu laboratorio! 🎉**
