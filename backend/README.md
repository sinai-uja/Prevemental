# PREVEMENTAL

## Guía de instalación
1. Configuración:
   1. Renombrar `config_example.yaml` a `config.yaml`
   2. Generar una nueva `secret_key` con el comando `openssl rand -hex 32` en la terminal y copiarlo en el campo correspondiente en `config.yaml`
   3. Generar un par de claves pública/privada con `ssh-keygen -t rsa -b 4096` y actualizar las rutas del fichero `config.yaml` con las rutas a las claves generadas
2. Crear un entorno virtual: `python3 -m venv /path/to/new/virtual/environment`
3. Activar el entorno virtual: `source /path/to/environment/bin/activate`
4. Instalar las bibliotecas necesarias: `pip install -r /path/to/requirements.txt`
5. Lanzar el servicio: `uvicorn app.main:app --host <HOST> --port <PORT>`
6. Probar que funciona en http://localhost:8000/docs 
