# Fase de producción: Usar una imagen más ligera de Nginx
FROM nginx:alpine

# Copia los archivos de la página web a la ubicación donde NGINX los servirá
COPY ./app_web.html /usr/share/nginx/html

# Exponer el puerto 80 para acceder al servicio
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
