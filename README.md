<<<<<<< HEAD
# Purr Pixel ฅ(^•ܫ•^)ฅ

El proyecto consistirá en una aplicación web para entretenimiento y ocio ,y se llamará Purr Pixel.

El usuario deberá de registrarse utilizando principalmente un nombre de usuario y contraseña.

Una vez el usuario esté registrado se podrá adquirir una mascota, que en este caso serán gatos.  No se podrá elegir el tipo de gato, este será adquirido de forma aleatoria. Cada gato tendrá características propias, dependiendo de su color, que afectará dentro de los minijuegos y estado de salud.

La interacción con la mascota se basará en su cuidado. La mayor parte de sus cuidados se basará en la alimentación, aseo y salud de nuestra mascota. Para todo ello necesitaremos ciertos objetos que podremos obtener en la tienda y adquirirlos mediante el intercambio de “purr points”.

El juego contará con una interfaz amigable, variedad de interacciones y una base de datos para gestionar la información del estado de las mascotas y sus correspondientes usuarios.

## Objetivos
- Crear una aplicación interactiva que permita la crianza virtual de una mascota.
- Implementar una base de datos para almacenar el progreso de cada usuario dentro del juego.
- Diseñar una interfaz amigable, atractiva y fácil de usar.
- Integrar diversas funcionalidades como alimentación, cuidado y compras dentro del juego.
- Minijuegos para hacerlo más interactivo.
- Tutoriales de funcionalidad.

## Posibles mejoras
- Notificaciones y recordatorios vía email.
- Inserción de mascota especial, tendrá una característica con efectos “curativos” evitando de esta forma adquirir medicaciones a nuestras mascotas.
- Bonus especiales de objetos o purr points.
- Inserción de accesorios y atuendos.
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
>>>>>>> 0edf991 (Primer commit Proyecto FINAL de Drive)
