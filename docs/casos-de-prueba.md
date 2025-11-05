# Documentación de Casos de Prueba - Laboratorio 5

## Tabla Completa de Casos de Prueba

### Suite: Funcionalidad "Create Product"

| ID     | Objeto de Prueba | Escenario/Acciones                         | Valores de Prueba                                  | Resultado Esperado                                 | Prioridad | Tipo        |
| ------ | ---------------- | ------------------------------------------ | -------------------------------------------------- | -------------------------------------------------- | --------- | ----------- |
| CP-001 | Formulario Web   | Crear producto con datos válidos completos | name: "Test Product", message: "Valid description" | Producto creado exitosamente, formulario procesado | P0        | Positive    |
| CP-002 | Formulario Web   | Crear producto con nombre mínimo           | name: "A" (1 carácter), message: "Description"     | Producto creado exitosamente                       | P1        | Boundary    |
| CP-003 | Formulario Web   | Crear producto con nombre máximo           | name: 255 caracteres, message: "Description"       | Producto creado exitosamente                       | P0        | Boundary    |
| CP-004 | Formulario Web   | Crear producto con descripción larga       | name: "Product", message: 1000 caracteres          | Formulario acepta el input sin errores             | P1        | Boundary    |
| CP-005 | Formulario Web   | Crear producto sin nombre                  | name: "", message: "Description"                   | Error o permanece en formulario                    | P0        | Negative    |
| CP-006 | Formulario Web   | Crear producto sin descripción             | name: "Product", message: ""                       | Manejo apropiado (acepta o advierte)               | P1        | Negative    |
| CP-007 | Formulario Web   | Enviar formulario vacío                    | name: "", message: ""                              | Error de validación, permanece en formulario       | P0        | Negative    |
| CP-008 | Formulario Web   | Producto con caracteres especiales         | name: "Español ñáéí", message: "@#$%^&\*()"        | Caracteres procesados correctamente                | P0        | Special     |
| CP-009 | Formulario Web   | Intento de XSS                             | name: "<script>alert('XSS')</script>"              | Script no ejecutado, input escapado                | P0        | Security    |
| CP-010 | Formulario Web   | Intento de SQL Injection                   | name: "'; DROP TABLE products; --"                 | Input manejado sin afectar BD                      | P0        | Security    |
| CP-011 | Formulario Web   | Unicode y emojis                           | name: "Product 🚀", message: "中文字符"            | Unicode procesado correctamente                    | P2        | Special     |
| CP-012 | Formulario Web   | Tiempo de procesamiento                    | Datos válidos completos                            | Procesamiento < 5 segundos                         | P1        | Performance |

## Matriz de Trazabilidad Requisitos - Casos de Prueba

| Requisito | Descripción                                    | Casos de Prueba        | Cobertura |
| --------- | ---------------------------------------------- | ---------------------- | --------- |
| REQ-001   | El sistema debe permitir crear productos       | CP-001, CP-002, CP-003 | 100%      |
| REQ-002   | El nombre del producto es obligatorio          | CP-005, CP-007         | 100%      |
| REQ-003   | El sistema debe validar longitud de campos     | CP-002, CP-003, CP-004 | 100%      |
| REQ-004   | El sistema debe prevenir XSS                   | CP-009                 | 100%      |
| REQ-005   | El sistema debe prevenir SQL Injection         | CP-010                 | 100%      |
| REQ-006   | El sistema debe soportar caracteres especiales | CP-008, CP-011         | 100%      |
| REQ-007   | El sistema debe responder en tiempo razonable  | CP-012                 | 100%      |

## Estrategias de Prueba Aplicadas

### 1. Clases de Equivalencia (Equivalence Partitioning)

**Definición**: Técnica que divide el dominio de entrada en clases de datos que el sistema debe manejar de forma similar.

**Aplicación en este proyecto**:

- **Clase Válida 1**: Datos completos y válidos

  - Ejemplo: name="Product", message="Description"
  - Casos: CP-001, CP-002, CP-003

- **Clase Válida 2**: Datos válidos en límites

  - Ejemplo: name con 1 carácter, name con 255 caracteres
  - Casos: CP-002, CP-003, CP-004

- **Clase Inválida 1**: Campos requeridos faltantes

  - Ejemplo: name vacío
  - Casos: CP-005, CP-007

- **Clase Inválida 2**: Datos con intentos maliciosos
  - Ejemplo: Scripts XSS, SQL Injection
  - Casos: CP-009, CP-010

**Beneficios**:

- Reduce el número de casos necesarios
- Asegura cobertura representativa
- Identifica escenarios críticos

### 2. Análisis de Valores Límite (Boundary Value Analysis)

**Definición**: Técnica que prueba valores en los extremos de las clases de equivalencia.

**Límites identificados**:

| Campo       | Mínimo    | Mínimo+1 | Normal | Máximo-1 | Máximo |
| ----------- | --------- | -------- | ------ | -------- | ------ |
| Nombre      | 0 (vacío) | 1        | 50     | 254      | 255    |
| Descripción | 0 (vacío) | 1        | 200    | 999      | 1000   |

**Aplicación**:

- CP-002: Prueba con mínimo válido (1 carácter)
- CP-003: Prueba con máximo válido (255 caracteres)
- CP-004: Prueba con descripción larga (1000 caracteres)
- CP-005: Prueba con mínimo inválido (0 caracteres)

**Justificación**: Los errores ocurren frecuentemente en los límites debido a:

- Errores off-by-one
- Desbordamiento de buffer
- Validaciones incorrectas de rangos

### 3. Tabla de Decisión (Decision Table Testing)

**Definición**: Matriz que relaciona combinaciones de condiciones con acciones resultantes.

**Tabla de decisión para el formulario**:

| #   | Nombre Presente | Mensaje Presente | Nombre Válido | Mensaje Válido | Acción Esperada  |
| --- | --------------- | ---------------- | ------------- | -------------- | ---------------- |
| 1   | ✓               | ✓                | ✓             | ✓              | Crear producto   |
| 2   | ✓               | ✓                | ✓             | ✗              | Advertir o crear |
| 3   | ✓               | ✗                | ✓             | N/A            | Advertir o crear |
| 4   | ✗               | ✓                | N/A           | ✓              | Error            |
| 5   | ✗               | ✗                | N/A           | N/A            | Error            |

**Casos de prueba correspondientes**:

- Regla 1 → CP-001 (ambos válidos)
- Regla 3 → CP-006 (sin mensaje)
- Regla 4 → CP-005 (sin nombre)
- Regla 5 → CP-007 (ambos vacíos)

### 4. Adivinación de Errores (Error Guessing)

**Definición**: Técnica basada en experiencia que anticipa errores comunes.

**Errores anticipados**:

1. **Inyección de Código**

   - XSS: `<script>alert('XSS')</script>` (CP-009)
   - SQL Injection: `'; DROP TABLE products; --` (CP-010)
   - **Por qué**: Vulnerabilidades comunes en aplicaciones web

2. **Problemas de Encoding**

   - Caracteres especiales: áéíóú ñ (CP-008)
   - Unicode: 中文, العربية (CP-011)
   - Emojis: 🚀 😀 (CP-011)
   - **Por qué**: Problemas frecuentes con UTF-8

3. **Performance**
   - Timeouts (CP-012)
   - **Por qué**: UX degradada con tiempos largos

## Técnicas de Diseño de Casos de Prueba

### Black Box Testing (Caja Negra)

**Todas las pruebas en este laboratorio son de caja negra**:

- No conocemos la implementación interna
- Probamos desde la perspectiva del usuario
- Verificamos entradas y salidas

**Ventajas**:

- Simula uso real del sistema
- Independiente de la implementación
- Encuentra errores de requisitos

### Técnicas Específicas Aplicadas

#### 1. State Transition Testing

Aunque no implementado explícitamente, el formulario tiene estados:

- Estado Inicial (vacío)
- Estado Parcialmente Lleno
- Estado Lleno
- Estado Enviado
- Estado de Error

#### 2. Use Case Testing

Cada caso de prueba representa un flujo de uso:

- Flujo Principal: CP-001 (Happy Path)
- Flujos Alternativos: CP-006 (sin descripción)
- Flujos de Excepción: CP-005, CP-007 (validaciones)

## Métricas de Cobertura

### Cobertura de Requisitos

```
Total de requisitos: 7
Requisitos cubiertos: 7
Cobertura: 100%
```

### Cobertura de Funcionalidad

```
- Crear producto exitoso: ✓ (CP-001, CP-002, CP-003)
- Validación de campos: ✓ (CP-005, CP-007)
- Manejo de límites: ✓ (CP-002, CP-003, CP-004)
- Seguridad: ✓ (CP-009, CP-010)
- Caracteres especiales: ✓ (CP-008, CP-011)
- Performance: ✓ (CP-012)
```

### Distribución de Pruebas

```
Positivas: 4 casos (33%)
Negativas: 3 casos (25%)
Límites: 3 casos (25%)
Seguridad: 2 casos (17%)
```

## Priorización de Casos de Prueba

### Criterios de Priorización

1. **Criticidad del Negocio**

   - ¿Afecta funcionalidad core?
   - ¿Impacta a usuarios?

2. **Probabilidad de Fallo**

   - Basado en experiencia
   - Áreas complejas

3. **Impacto del Fallo**
   - Seguridad: Crítico
   - Funcional: Alto
   - UX: Medio

### Orden de Ejecución Recomendado

**Fase 1: Smoke Tests (P0)**

1. CP-001 - Happy path básico
2. CP-005 - Validación de campo requerido
3. CP-009 - Seguridad XSS
4. CP-010 - Seguridad SQL Injection

**Fase 2: Core Functionality (P0-P1)** 5. CP-003 - Límite máximo de nombre 6. CP-007 - Formulario vacío 7. CP-008 - Caracteres especiales

**Fase 3: Edge Cases (P1-P2)** 8. CP-002 - Límite mínimo 9. CP-004 - Descripción larga 10. CP-006 - Sin descripción 11. CP-012 - Performance

**Fase 4: Nice to Have (P2)** 12. CP-011 - Unicode y emojis

## Ambiente de Pruebas

### Configuración Requerida

```yaml
Navegadores:
  - Chrome 120+ (recomendado)
  - Firefox 121+
  - Edge 120+

Sistema Operativo:
  - Windows 10/11
  - macOS 12+
  - Linux (Ubuntu 20.04+)

Herramientas:
  - Node.js 18+
  - TypeScript 5.3+
  - Selenium WebDriver 4.16+
  - Jest 29.7+
```

### Datos de Prueba

Los datos están centralizados en `src/utils/test-data.ts`:

- Fácil mantenimiento
- Reutilización entre pruebas
- Versionamiento con Git

## Reportes y Resultados

### Ejecución de Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar con cobertura
npm run test:coverage

# Ejecutar en modo watch
npm run test:watch

# Ejecutar suite específica
npm test -- create-product.test.ts
```

### Formato de Reporte

Jest genera reportes en:

- **Consola**: Resultados inmediatos
- **HTML**: Reporte visual en `coverage/`
- **LCOV**: Para integración con herramientas CI/CD

### Criterios de Éxito

Una prueba exitosa debe:

1. ✓ Ejecutarse sin errores
2. ✓ Completarse en < 30 segundos
3. ✓ Assertions pasen (verde)
4. ✓ No generar excepciones no manejadas

## Mantenimiento de Casos de Prueba

### Cuándo Actualizar

1. **Cambios en Requisitos**

   - Actualizar casos afectados
   - Agregar nuevos casos si necesario

2. **Bugs Encontrados**

   - Crear caso de regresión
   - Reproducir el bug
   - Verificar la corrección

3. **Refactoring**
   - Mantener tests actualizados
   - Mejorar legibilidad
   - Optimizar ejecución

### Best Practices

- ✓ Un test, una verificación
- ✓ Nombres descriptivos
- ✓ Tests independientes
- ✓ Setup/Teardown consistente
- ✓ Comentarios explicativos
- ✓ Datos de prueba parametrizados

## Referencias

- Martin, R. C. (2008). _Clean Code_. Prentice Hall.
- Myers, G. J. (2011). _The Art of Software Testing_. Wiley.
- ISTQB. (2018). _Certified Tester Foundation Level Syllabus_.
- Selenium Documentation: https://www.selenium.dev/documentation/
- Jest Documentation: https://jestjs.io/docs/getting-started
