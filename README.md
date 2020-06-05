# Implementar una aplicación simple que:

Tenga el bundling montado con webpack.
Muestre un logo (por ejemplo el de lemoncode u otro que queráis).
Este montada con Typescript.
Tengo el texto de "hola mundo" estilado con SASS.

## Opcional
Que muestre un hola mundo desarrollado con React.
Que tenga una versión de build de producción.
Que tenga variables de entorno para desarrollo producción.
Que tengamos una forma de medir cuanto ocupa cada librería y nuestro código en el bundle.
Montar lo mismo con parcel.

## Bonus points
Alternativamente o como puntos adicionales podéis plantear desarrollar algunos de los desafíos propuestos en clase, o proponer vosotros alguno que véais interesantes, por ejemplo: introducir la optimización de imágenes en el proceso de build, definir alias para ciertas carpetas, ...

## Pasos a seguir para crear desde cero

### Prerequisitos
node

Creación del proyecto:
```bash
npm init -y
```
Crea el fichero package.json. La opción `-y` es para que no pregunte nada y cree todo directamente.

Posteriormente instalamos webpack y webpack-cli:
```bash
npm install webpack webpack-cli --save-dev
```
La opción `--save-dev`es para que la instalación sea solo para desarrollo. De esta manera en el package.json se establece:
```json
  "devDependencies": {
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.11"
  }
```
