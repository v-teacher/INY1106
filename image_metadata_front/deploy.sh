#!/bin/bash

# Variables de configuración obtenidas de las variables de entorno de GitHub Actions
DOCKER_USERNAME=${DOCKER_USERNAME}
IMAGE_NAME=${IMAGE_NAME}
TAG=${TAG}
EKS_CLUSTER_NAME=${EKS_CLUSTER_NAME}
AWS_REGION=${AWS_REGION}
DEPLOYMENT_FILE=${DEPLOYMENT_FILE}

# Iniciar sesión en Docker usando credenciales proporcionadas por GitHub Actions
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Construir la imagen Docker
echo "Construyendo la imagen Docker..."
docker build -t $DOCKER_USERNAME/$IMAGE_NAME:$TAG .

# Subir la imagen al registro de contenedores
echo "Subiendo la imagen al registro de contenedores..."
docker push $DOCKER_USERNAME/$IMAGE_NAME:$TAG

# Configurar kubectl para conectarse al clúster de EKS
echo "Configurando kubectl para conectarse al clúster de EKS..."
aws eks update-kubeconfig --region $AWS_REGION --name $EKS_CLUSTER_NAME

# Desplegar la aplicación en EKS
echo "Desplegando la aplicación en EKS..."
kubectl apply -f $DEPLOYMENT_FILE

echo "Despliegue completado."
