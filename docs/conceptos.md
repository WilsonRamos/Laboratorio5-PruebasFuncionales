# Conceptos Fundamentales de Pruebas Funcionales

## Índice

1. [¿Qué son las Pruebas Funcionales?](#qué-son-las-pruebas-funcionales)
2. [Selenium WebDriver](#selenium-webdriver)
3. [Jest Testing Framework](#jest-testing-framework)
4. [Page Object Model](#page-object-model)
5. [Estrategias de Prueba](#estrategias-de-prueba)
6. [Patrones y Best Practices](#patrones-y-best-practices)

---

## ¿Qué son las Pruebas Funcionales?

### Definición

Las **pruebas funcionales** son un tipo de testing de caja negra que verifica que el software cumple con los requisitos funcionales especificados. Se enfocan en **QUÉ** hace el sistema, no en **CÓMO** lo hace.

### Características

- **Basadas en requisitos**: Cada caso deriva de un requisito
- **Perspectiva del usuario**: Simulan interacciones reales
- **Entrada-Salida**: Verifican outputs para inputs dados
- **Independientes de implementación**: No requieren conocer el código

### Tipos de Pruebas Funcionales

```
┌─────────────────────────────────────────┐
│      PIRÁMIDE DE PRUEBAS                │
├─────────────────────────────────────────┤
│           UI Tests (E2E)                │ ← Pruebas Funcionales
│         ▲                               │   (Este laboratorio)
│        ▲ ▲                              │
│       ▲   ▲                             │
│      ▲     ▲                            │
│     ▲       ▲  Integration Tests       │
│    ▲         ▲                          │
│   ▲           ▲                         │
│  ▲             ▲                        │
│ ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Unit Tests          │
└─────────────────────────────────────────┘
```

1. **Unit Tests**: Prueban componentes individuales
2. **Integration Tests**: Prueban interacción entre componentes
3. **System Tests**: Prueban el sistema completo
4. **Acceptance Tests**: Prueban criterios de aceptación
5. **E2E Tests**: Prueban flujos completos de usuario

---

## Selenium WebDriver

### ¿Qué es Selenium?

**Selenium** es un conjunto de herramientas para automatizar navegadores web. Es el estándar de facto para pruebas funcionales web.

### Componentes de Selenium

```
┌──────────────────────────────────────────────┐
│            SELENIUM SUITE                     │
├──────────────────────────────────────────────┤
│  Selenium IDE    │  Grabador de pruebas      │
│  Selenium WebDriver │ API de automatización  │
│  Selenium Grid   │  Ejecución distribuida    │
└──────────────────────────────────────────────┘
```

### Arquitectura de WebDriver

```
┌─────────────────────────────────────────────┐
│  Test Script (TypeScript/JavaScript)        │
│  - test.ts                                  │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│  Selenium WebDriver API                     │
│  - driver.get(), driver.findElement(), etc. │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│  JSON Wire Protocol / W3C WebDriver         │
│  - Protocolo de comunicación                │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│  Browser Driver (ChromeDriver, etc.)        │
│  - Traductor específico del navegador       │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│  Navegador (Chrome, Firefox, etc.)          │
│  - Aplicación siendo probada                │
└─────────────────────────────────────────────┘
```

### Locator Strategies (Estrategias de Localización)

Los **locators** son métodos para encontrar elementos en el DOM:

| Estrategia       | Ejemplo                         | Velocidad | Estabilidad | Uso Recomendado    |
| ---------------- | ------------------------------- | --------- | ----------- | ------------------ |
| `By.id()`        | `By.id('submit-btn')`           | ⚡⚡⚡    | ⭐⭐⭐      | ✓ Siempre preferir |
| `By.name()`      | `By.name('username')`           | ⚡⚡⚡    | ⭐⭐⭐      | ✓ Formularios      |
| `By.className()` | `By.className('btn-primary')`   | ⚡⚡      | ⭐⭐        | ⚠ Con precaución   |
| `By.css()`       | `By.css('.container > button')` | ⚡⚡      | ⭐⭐        | ✓ Flexible         |
| `By.xpath()`     | `By.xpath('//div[@id="main"]')` | ⚡        | ⭐          | ⚠ Último recurso   |
| `By.linkText()`  | `By.linkText('Click Here')`     | ⚡⚡      | ⭐⭐        | ✓ Para enlaces     |
| `By.tagName()`   | `By.tagName('button')`          | ⚡⚡⚡    | ⭐          | ⚠ Muy genérico     |

**Orden de preferencia**:

1. **ID** - Único y rápido
2. **Name** - Común en formularios
3. **CSS Selector** - Flexible y legible
4. **XPath** - Poderoso pero frágil

### Waits (Esperas)

Las esperas son cruciales para manejar el asincronismo de las aplicaciones web:

#### 1. Implicit Wait

```typescript
await driver.manage().setTimeouts({ implicit: 10000 });
```

- Se aplica globalmente
- Espera a que elementos aparezcan en el DOM
- No espera por visibilidad o estado

#### 2. Explicit Wait

```typescript
await driver.wait(until.elementLocated(By.id("btn")), 10000);
```

- Espera específica para una condición
- Más preciso y controlado
- Recomendado sobre implicit wait

#### 3. Fluent Wait

```typescript
await driver.wait(
  until.elementIsVisible(element),
  10000,
  "Element not visible",
  500 // Poll cada 500ms
);
```

- Personalizable con polling interval
- Permite ignorar excepciones específicas

**¿Cuándo usar cada uno?**

- **Implicit**: Setup inicial, casos simples
- **Explicit**: Condiciones específicas (visibilidad, clickeabilidad)
- **Fluent**: Condiciones complejas, polling personalizado

---

## Jest Testing Framework

### ¿Qué es Jest?

**Jest** es un framework de testing JavaScript completo desarrollado por Facebook. Es el equivalente en ecosistema JS/TS de JUnit (Java) o xUnit (general).

### Características Principales

```
┌────────────────────────────────────┐
│          JEST FEATURES             │
├────────────────────────────────────┤
│ ✓ Zero config                      │
│ ✓ Snapshot testing                 │
│ ✓ Isolated tests                   │
│ ✓ Great API                        │
│ ✓ Coverage reports                 │
│ ✓ Mocking capabilities             │
│ ✓ Parallel execution               │
└────────────────────────────────────┘
```

### Estructura de Tests

```typescript
// SUITE - Agrupa tests relacionados
describe("Feature: User Authentication", () => {
  // HOOKS - Lifecycle methods
  beforeAll(() => {
    // Se ejecuta UNA VEZ antes de todos los tests
    // Usar para: setup costoso (DB, servidor)
  });

  beforeEach(() => {
    // Se ejecuta ANTES de CADA test
    // Usar para: estado limpio, instancias frescas
  });

  afterEach(() => {
    // Se ejecuta DESPUÉS de CADA test
    // Usar para: cleanup, restaurar mocks
  });

  afterAll(() => {
    // Se ejecuta UNA VEZ después de todos los tests
    // Usar para: cerrar conexiones, liberar recursos
  });

  // TEST CASE - Prueba individual
  test("should authenticate user with valid credentials", () => {
    // Arrange - Preparar
    const credentials = { user: "admin", pass: "123" };

    // Act - Actuar
    const result = authenticate(credentials);

    // Assert - Verificar
    expect(result).toBeTruthy();
  });

  // Alternativamente: it() es alias de test()
  it("should reject invalid credentials", () => {
    // ...
  });
});
```

### Matchers (Aserciones)

Jest proporciona matchers expresivos para verificaciones:

```typescript
// Igualdad
expect(value).toBe(4); // Igualdad estricta (===)
expect(value).toEqual({ a: 1 }); // Igualdad profunda (objetos)

// Veracidad
expect(value).toBeTruthy(); // Valor truthy
expect(value).toBeFalsy(); // Valor falsy
expect(value).toBeDefined(); // No undefined
expect(value).toBeNull(); // Exactamente null

// Números
expect(value).toBeGreaterThan(3); // Mayor que
expect(value).toBeLessThan(5); // Menor que
expect(value).toBeCloseTo(0.3); // Flotantes (con margen)

// Strings
expect(text).toMatch(/regex/); // Regex match
expect(text).toContain("substring"); // Contiene substring

// Arrays
expect(array).toContain(item); // Contiene elemento
expect(array).toHaveLength(3); // Longitud específica

// Excepciones
expect(() => fn()).toThrow(); // Lanza excepción
expect(() => fn()).toThrow(Error); // Tipo específico

// Promesas
await expect(promise).resolves.toBe(val); // Promise se resuelve
await expect(promise).rejects.toThrow(); // Promise se rechaza

// Negación
expect(value).not.toBe(false); // Negación de cualquier matcher
```

### Test Coverage (Cobertura)

Jest mide automáticamente la cobertura de código:

```
----------------------|---------|----------|---------|---------|
File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
All files             |   85.71 |    66.67 |     100 |   83.33 |
 pages                |   100   |     75   |     100 |   100   |
  selenium-form.page.ts|   100   |     75   |     100 |   100   |
 utils                |   66.67 |    50    |     100 |   60    |
  driver.manager.ts   |   66.67 |    50    |     100 |   60    |
----------------------|---------|----------|---------|---------|
```

**Métricas explicadas**:

- **Statements**: % de sentencias ejecutadas
- **Branches**: % de ramas (if/else) ejecutadas
- **Functions**: % de funciones llamadas
- **Lines**: % de líneas ejecutadas

**Objetivos recomendados**:

- Core Logic: > 90%
- UI Layer: > 70%
- Integrations: > 80%

---

## Page Object Model (POM)

### ¿Qué es POM?

El **Page Object Model** es un patrón de diseño que:

1. Encapsula elementos y acciones de una página en una clase
2. Separa la lógica de prueba de los detalles de UI
3. Mejora mantenibilidad y reutilización

### Sin POM vs Con POM

#### ❌ Sin POM (Código frágil)

```typescript
test("login test", async () => {
  await driver.get("https://app.com/login");
  await driver.findElement(By.id("username")).sendKeys("admin");
  await driver.findElement(By.id("password")).sendKeys("pass");
  await driver.findElement(By.css('button[type="submit"]')).click();

  // Si cambia el ID de username, hay que actualizar TODOS los tests
});
```

#### ✅ Con POM (Código mantenible)

```typescript
class LoginPage {
  private usernameInput = By.id("username");
  private passwordInput = By.id("password");
  private submitButton = By.css('button[type="submit"]');

  async login(user: string, pass: string) {
    await this.driver.get("https://app.com/login");
    await this.driver.findElement(this.usernameInput).sendKeys(user);
    await this.driver.findElement(this.passwordInput).sendKeys(pass);
    await this.driver.findElement(this.submitButton).click();
  }
}

test("login test", async () => {
  await loginPage.login("admin", "pass");
  // Si cambia el ID, solo se actualiza en LoginPage
});
```

### Estructura de un Page Object

```typescript
export class MyPage extends BasePage {
  // 1. LOCATORS - Selectores privados
  private readonly locators = {
    submitBtn: By.id("submit"),
    nameInput: By.name("username"),
  };

  // 2. ACTIONS - Métodos públicos
  async fillName(name: string): Promise<void> {
    await this.type(this.locators.nameInput, name);
  }

  async submit(): Promise<void> {
    await this.click(this.locators.submitBtn);
  }

  // 3. QUERIES - Obtener información
  async isSubmitted(): Promise<boolean> {
    return await this.isElementVisible(this.successLocator);
  }

  // 4. HIGH-LEVEL FLOWS - Flujos completos
  async fillAndSubmitForm(data: FormData): Promise<void> {
    await this.fillName(data.name);
    await this.submit();
  }
}
```

### Principios de POM

1. **Encapsulación**: Locators son privados
2. **Abstracción**: Métodos expresan intención de usuario
3. **Reutilización**: Métodos usados en múltiples tests
4. **Mantenibilidad**: Cambios en un solo lugar
5. **Legibilidad**: Tests se leen como lenguaje natural

### Jerarquía de Page Objects

```
BasePage (Abstracta)
    │
    ├── LoginPage
    │   └── login()
    │   └── logout()
    │
    ├── HomePage
    │   └── navigateToProducts()
    │   └── navigateToCart()
    │
    └── ProductPage
        └── addToCart()
        └── selectQuantity()
```

---

## Estrategias de Prueba

### 1. Equivalence Partitioning (Clases de Equivalencia)

**Concepto**: Dividir el dominio de entrada en clases que el sistema maneja de forma similar.

**Ejemplo**: Campo "edad"

```
Clase Inválida 1: edad < 0        → Error
Clase Inválida 2: 0 ≤ edad < 18   → Menor de edad
Clase Válida:     18 ≤ edad < 120 → Válido
Clase Inválida 3: edad ≥ 120      → Error
```

**Ventajas**:

- ✓ Reduce número de casos de prueba
- ✓ Cobertura sistemática
- ✓ Fácil de aplicar

**Aplicación**:

```typescript
// En lugar de probar edad = 1, 2, 3, ..., 17
// Probar UN valor de cada clase:
test("edad = -5", () => {
  /* Clase Inválida 1 */
});
test("edad = 10", () => {
  /* Clase Inválida 2 */
});
test("edad = 25", () => {
  /* Clase Válida */
});
test("edad = 150", () => {
  /* Clase Inválida 3 */
});
```

### 2. Boundary Value Analysis (Análisis de Valores Límite)

**Concepto**: Los errores ocurren frecuentemente en los límites de las clases.

**Estrategia**:

- Probar valores justo antes del límite
- En el límite exacto
- Justo después del límite

**Ejemplo**: Campo que acepta 1-255 caracteres

```
Inválido: 0 caracteres     ← Límite inferior inválido
Válido:   1 carácter       ← Límite inferior válido (PROBAR)
Válido:   2 caracteres     ← Después del límite
Válido:   127 caracteres   ← Medio del rango
Válido:   254 caracteres   ← Antes del límite superior
Válido:   255 caracteres   ← Límite superior válido (PROBAR)
Inválido: 256 caracteres   ← Límite superior inválido
```

**Aplicación**:

```typescript
test("name with 0 chars", () => {
  /* Debe rechazar */
});
test("name with 1 char", () => {
  /* Debe aceptar */
});
test("name with 255 chars", () => {
  /* Debe aceptar */
});
test("name with 256 chars", () => {
  /* Debe rechazar */
});
```

### 3. Decision Table Testing (Tabla de Decisión)

**Concepto**: Matriz de condiciones y acciones resultantes.

**Ejemplo**: Login

| #   | Usuario Existe | Password Correcto | Cuenta Activa | Resultado                  |
| --- | -------------- | ----------------- | ------------- | -------------------------- |
| 1   | ✓              | ✓                 | ✓             | Login exitoso              |
| 2   | ✓              | ✓                 | ✗             | Error: cuenta inactiva     |
| 3   | ✓              | ✗                 | -             | Error: password incorrecto |
| 4   | ✗              | -                 | -             | Error: usuario no existe   |

**Ventajas**:

- ✓ Visualiza lógica compleja
- ✓ Identifica combinaciones faltantes
- ✓ Detecta reglas redundantes

### 4. State Transition Testing (Transición de Estados)

**Concepto**: Probar transiciones entre estados del sistema.

**Ejemplo**: Pedido en e-commerce

```
[Carrito Vacío]
      │
      ├─(agregar producto)→ [Carrito con Items]
      │                           │
      │                           ├─(checkout)→ [Procesando Pago]
      │                           │                    │
      │                           │                    ├─(pago exitoso)→ [Pedido Confirmado]
      │                           │                    │
      │                           │                    └─(pago fallido)→ [Error Pago]
      │                           │
      │                           └─(vaciar)→ [Carrito Vacío]
      │
      └─────────────────────────────────────┘
```

**Casos de prueba**:

- Transiciones válidas (todas las flechas)
- Transiciones inválidas (intentar pagar sin items)
- Secuencias completas (agregar → checkout → pago)

### 5. Use Case Testing

**Concepto**: Derivar casos de prueba de casos de uso del sistema.

**Estructura**:

```
Caso de Uso: Crear Producto

Actor: Usuario autenticado

Flujo Principal:
1. Usuario navega a "Crear Producto"
2. Sistema muestra formulario
3. Usuario ingresa nombre y descripción
4. Usuario hace click en "Guardar"
5. Sistema valida datos
6. Sistema guarda producto
7. Sistema muestra confirmación

Flujos Alternativos:
3a. Usuario no ingresa nombre requerido
    → Sistema muestra error de validación

5a. Nombre ya existe
    → Sistema muestra error de duplicado
```

**Casos de prueba derivados**:

- TC1: Flujo principal completo (happy path)
- TC2: Nombre vacío (flujo 3a)
- TC3: Nombre duplicado (flujo 5a)

---

## Patrones y Best Practices

### AAA Pattern (Arrange-Act-Assert)

**Estructura estándar de un test**:

```typescript
test('should calculate total correctly', () => {
  // ARRANGE - Preparar precondiciones
  const cart = new ShoppingCart();
  cart.addItem({ name: 'Product', price: 10 }, quantity: 2);

  // ACT - Ejecutar la acción a probar
  const total = cart.calculateTotal();

  // ASSERT - Verificar el resultado
  expect(total).toBe(20);
});
```

**Variante Given-When-Then (BDD)**:

```typescript
test("total calculation", () => {
  // GIVEN a cart with 2 items at $10 each
  const cart = setupCart();

  // WHEN calculating total
  const total = cart.calculateTotal();

  // THEN total should be $20
  expect(total).toBe(20);
});
```

### Test Independence (Independencia de Tests)

**Principio**: Cada test debe ser completamente independiente.

❌ **MAL** - Tests acoplados:

```typescript
let globalUser;

test("create user", () => {
  globalUser = createUser(); // Modifica estado global
});

test("delete user", () => {
  deleteUser(globalUser); // Depende del test anterior
});
```

✅ **BIEN** - Tests independientes:

```typescript
test("create user", () => {
  const user = createUser(); // Estado local
  expect(user).toBeDefined();
});

test("delete user", () => {
  const user = createUser(); // Crea su propio usuario
  deleteUser(user);
  expect(getUser(user.id)).toBeNull();
});
```

### DRY en Tests (Don't Repeat Yourself)

**Balance**: Tests deben ser DRY pero también legibles.

❌ **Demasiado DRY** - Difícil de entender:

```typescript
const testData = [
  [1, 2, 3],
  [4, 5, 9],
  [10, 10, 20],
];
testData.forEach(([a, b, expected]) => {
  test(`${a}+${b}=${expected}`, () => {
    expect(add(a, b)).toBe(expected);
  });
});
```

✅ **DRY balanceado** - Claro y mantenible:

```typescript
function testAddition(a: number, b: number, expected: number) {
  expect(add(a, b)).toBe(expected);
}

test("add positive numbers", () => testAddition(1, 2, 3));
test("add larger numbers", () => testAddition(4, 5, 9));
test("add equal numbers", () => testAddition(10, 10, 20));
```

### Test Naming Conventions

**Formatos comunes**:

1. **Should-When**:

```typescript
test("should return error when username is empty", () => {});
```

2. **Given-When-Then**:

```typescript
test("given valid user, when logging in, then returns token", () => {});
```

3. **Descriptivo directo**:

```typescript
test("empty username causes validation error", () => {});
```

**Reglas**:

- ✓ Describe el comportamiento, no la implementación
- ✓ Incluye contexto y resultado esperado
- ✓ Legible sin ver el código
- ✓ Específico pero conciso

### Test Data Management

**Estrategias**:

1. **Inline Data** - Para datos simples:

```typescript
test("test", () => {
  const data = { name: "Test", value: 123 };
});
```

2. **Fixtures** - Para datos reutilizables:

```typescript
// test-data.ts
export const VALID_USER = { name: "John", email: "john@test.com" };
```

3. **Factories** - Para datos dinámicos:

```typescript
function createUser(overrides = {}) {
  return {
    id: generateId(),
    name: "Default",
    email: "default@test.com",
    ...overrides,
  };
}
```

4. **Builders** - Para objetos complejos:

```typescript
class UserBuilder {
  private user = { name: "", email: "" };

  withName(name: string) {
    this.user.name = name;
    return this;
  }

  build() {
    return this.user;
  }
}

const user = new UserBuilder()
  .withName("John")
  .withEmail("john@test.com")
  .build();
```

---

## Conclusión

Este documento cubre los conceptos fundamentales aplicados en el Laboratorio 5:

- **Pruebas Funcionales**: Verificación de comportamiento desde perspectiva del usuario
- **Selenium**: Automatización de navegadores para testing E2E
- **Jest**: Framework completo para organizar y ejecutar pruebas
- **POM**: Patrón para mantener tests legibles y mantenibles
- **Estrategias**: Técnicas sistemáticas para diseñar casos de prueba
- **Best Practices**: Patrones para código de prueba de calidad

La combinación de estas herramientas y conceptos permite crear suites de pruebas:

- ✓ Mantenibles
- ✓ Legibles
- ✓ Confiables
- ✓ Escalables
- ✓ Efectivas

## Referencias Adicionales

### Libros

- _The Art of Software Testing_ - Glenford J. Myers
- _Agile Testing_ - Lisa Crispin & Janet Gregory
- _Test-Driven Development_ - Kent Beck

### Documentación Online

- [Selenium Documentation](https://www.selenium.dev/documentation/)
- [Jest Documentation](https://jestjs.io/)
- [ISTQB Syllabus](https://www.istqb.org/)
- [Martin Fowler's Testing Articles](https://martinfowler.com/testing/)

### Cursos

- Udemy: "Selenium WebDriver with TypeScript"
- Coursera: "Software Testing and Automation"
- Test Automation University (gratis)
