# Proyecto de Pruebas Automatizadas con Playwright

Este proyecto contiene pruebas automatizadas para un sitio web de comercio electrónico utilizando Playwright y siguiendo el patrón Page Object Model.

## Estructura del Proyecto

- `pages/`: Contiene las clases de Page Object Model (POM)
- `tests/`: Contiene los casos de prueba
- `playwright.config.ts`: Configuración de Playwright

## Casos de Prueba

### CP1: Validar que un producto se agrega correctamente al carrito desde PDP
**Given** un usuario navega a la página de detalle de un producto (PDP)  
**When** el usuario agrega el producto al carrito  
**And** selecciona la opción "Sin garantía"  
**Then** el producto debe aparecer en el resumen con la cantidad correcta

### CP2: Validar que el OrderForm está vacío cuando el carrito está vacío
**Given** un usuario navega a la página de listado de productos (PLP)  
**When** el usuario acepta las cookies  
**And** va al mini carrito  
**And** navega a la página del carrito  
**Then** el OrderForm en sessionStorage debe estar vacío

### CP3: Validar que el OrderForm está vacío después de eliminar un producto
**Given** un usuario navega a la página de listado de productos  
**When** el usuario acepta las cookies  
**And** agrega el primer producto al carrito desde PLP  
**And** va al mini carrito  
**And** navega a la página del carrito  
**And** elimina el primer producto  
**Then** el OrderForm en sessionStorage debe estar vacío

### CP4: Validar que el valor total del carrito es correcto
**Given** un usuario navega a la página de listado de productos  
**When** el usuario acepta las cookies  
**And** agrega 3 productos al carrito desde PLP  
**And** va al mini carrito  
**And** navega a la página del carrito  
**Then** el valor total debe ser igual a la suma de los precios de los productos

### CP5: Validar que el OrderForm persiste después de recargar la página
**Given** un usuario navega a la página de detalle de un producto  
**When** el usuario agrega el producto al carrito  
**And** selecciona "Seguir comprando"  
**And** recarga la página  
**And** acepta las cookies  
**And** va al mini carrito  
**And** navega a la página del carrito  
**Then** el OrderForm en sessionStorage debe contener elementos

### CP6: Validar que múltiples productos de diferentes categorías se agregan correctamente
**Given** un usuario tiene una lista de productos de diferentes categorías  
**When** el usuario agrega cada producto al carrito  
**And** acepta las cookies  
**And** va al mini carrito  
**And** navega a la página del carrito  
**And** confirma la bolsa  
**Then** todos los productos deben aparecer en el resumen con las cantidades correctas

## Tecnologías Utilizadas

- [Playwright](https://playwright.dev/): Framework de automatización de pruebas
- TypeScript: Lenguaje de programación
- Page Object Model: Patrón de diseño para estructurar las pruebas

## Instalación

1. Clona este repositorio
2. Instala las dependencias:
```bash
npm install
