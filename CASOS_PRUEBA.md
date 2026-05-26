# Casos de prueba

| Caso | Entrada | Salida esperada | Resultado obtenido |
| --- | --- | --- | --- |
| 1. Agregar ingreso | Tipo: ingreso, monto: 1500000, categoria: Salario, fecha valida, descripcion: Salario | La transaccion aparece en verde y aumenta ingresos y balance | Funciona |
| 2. Agregar gasto | Tipo: gasto, monto: 300000, categoria: Comida, fecha valida, descripcion: Mercado | La transaccion aparece en rojo y aumenta gastos | Funciona |
| 3. Validar monto incorrecto | Monto: 0 o negativo | El sistema muestra mensaje de error y no guarda | Funciona |
| 4. Editar transaccion | Cambiar monto o descripcion de una transaccion existente | La tarjeta se actualiza y los totales se recalculan | Funciona |
| 5. Eliminar transaccion | Presionar X y confirmar eliminacion | La transaccion desaparece y los totales se recalculan | Funciona |
| 6. Filtrar transacciones | Elegir tipo, categoria, mes o escribir descripcion | Solo aparecen las transacciones que coinciden con el filtro | Funciona |

Pendiente para una version futura: guardar las transacciones en localStorage para que no se borren al recargar la pagina.
