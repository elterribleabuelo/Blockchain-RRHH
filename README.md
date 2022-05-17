# BlockDoc: Identificación de certificados académicos usando Blockchain

## Indice

- [1. Motivacion](#1-Motivacion)
- [2. Uso en entorno local](#2-Uso-en-entorno-local)
- [3. Demo](#3-Demo)

---

## 1. Motivación

BlockDoc es una aplicación web descentralizada(DApp) que permite simular el registro de alumnos dentro de un curso-horario en una determinada institución educativa; así como el correcto registro de los certificados que emitan éstas mismas las cuales son registradas dentro de una Blockchain.También permite la búsqueda de estos certificados académicos por parte de terceros(por ejemplo área de RRHH de una empresa) solo con el documento/archivo que emiten dichas instituciones.

---

## 2. Uso en entorno local

Para el uso en entorno local de BlockDoc se requiere tener instalado una version de igual o superior a Python 3.8 , se recomienda tener instalado el IDE **Visual Studio Code** , **git**, **Ganache** y **Metamask**. Se requiere instalar las siguientes librerias.

- Flask==1.1.4
- Pyrebase4==4.5.0
- Ganache==2.5.4

Se recomienda el uso de un entorno virtual usando virtualenv. Así como también la descarga de la Wallet de desarrollo [Metamask](https://metamask.io/).

1. Abrir cmd con permisos de administrador.

2. Ingresa a la ruta donde estara el proyecto.

3. Añadir los siguientes comandos :

   - `python -m venv nombre_de_mi_entorno`
   - `.\nombre_de_mi_entorno\Scripts\activate`
   - `git init`
   - `https://github.com/elterribleabuelo/Blockchain-RRHH.git`

4. Mover los archivos de la carpeta clonada al directorio principal del proyecto.

5. Instalar las librerias con el comando `pip install -r requirements.txt`

6. Abrir Ganache y copiar la dirección de una de las cuentas que ofrece. Ejemplo: `0xE193268f9d05E6e2d173ef374dd222B6a9E16732`.

7. Abrir la ruta `localhost:4000` y abrir Metamask desde ahí. Luego conectarnos a `localhost:7545`, dentro de nuestra Wallet vamos al menú principal y seleccionamos la opción `Importar cuenta`; luego seleccionamos la opcion de `Private Key` y pegamos el valor copiado.

8. Ahora si podemos usar nuestra Dapp en entorno local con el comando `python main.py` , se abrira una ventana en el navegador con el localhost.

9. Vamos a la pestaña Iniciar sesión y creamos nuestra cuenta (La cuenta que se cree se hará con los permisos que se le ofrece al usuario de RRHH).

---

## 3.Demo

<iframe width="560" height="315" src="https://www.youtube.com/watch?v=L9emh3EUuXQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</iframe>
