# Usar una imagen base oficial de Node.js
FROM node:14

# Instalar Expo CLI y @expo/ngrok globalmente
RUN npm install -g expo-cli @expo/ngrok

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install


# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto 3008 (puerto configurado para Expo)
EXPOSE 3008

# Comando para iniciar la aplicación y configurar el puerto 3008
CMD ["expo", "start", "--lan", "--port", "3008"]
