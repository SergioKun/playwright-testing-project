# Casos de prueba para HU 1

## CP1

**Given** el usuario esta en el PDP de un producto de no alimentos Televisor SAMSUNG 60 pulgadas LED Uhd4K Smart TV UN60DU7000KXZL
**When**  cuando agrego 1 al carrito
**And**   Viaja hasta el checkout
**Then**  La cantidad que se ve en el summary es igual a la que se ve en el OrderForm

## CP2

**Given** el usuario esta en el PLP
**And** no tiene items agregados al carrito
**When** cuando viaje hasta el summary del checkout
**Then** No debe visualizarse nada en el orderForm en el arreglo de items

## CP3

**Given** el usuario esta en el PLP
**And** el usuario tiene un producto en el minicart
**When** lo elimina desde la vista del minicart
**And** Viaja hasta el checkout
**Then** El producto no debe estar en el summary
**And** El producto no debe estar en el arreglo de items en el orderForm
