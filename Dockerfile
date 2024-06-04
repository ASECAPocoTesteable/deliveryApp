# Usar una imagen base oficial de Node.js
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Instalar Expo CLI globalmente
RUN npm install -g expo-cli

# Copiar el resto del código de la aplicación
COPY . .

# Ejecutar npm install de nuevo para asegurarse de que todas las dependencias estén instaladas
RUN npm install

# Exponer el puerto 3008 (puerto configurado para Expo)
EXPOSE 3008

# Comando para iniciar la aplicación y configurar el puerto 3008
CMD ["expo", "start", "--tunnel", "--port", "3008"]
