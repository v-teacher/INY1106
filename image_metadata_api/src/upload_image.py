import os
import json
import boto3
from uuid import uuid4
import re

# Variables de entorno
BUCKET_NAME = os.getenv('BUCKET_NAME')
TABLE_NAME = os.getenv('TABLE_NAME')

# Clientes AWS
s3_client = boto3.client('s3')
dynamodb_client = boto3.resource('dynamodb')
table = dynamodb_client.Table(TABLE_NAME)

def upload_image(event, context):
    try:
        # Obtener imagen desde la solicitud (puede ser base64 si es API Gateway)
        image_data = event.get('body')
        if not image_data:
            raise ValueError("No image data received")
        
        # Generar un nombre único para la imagen sin puntos ni guiones
        image_id = re.sub(r'[^a-zA-Z0-9]', '', str(uuid4()))  # Eliminar caracteres no alfanuméricos
        image_name = f"{image_id}.jpg"

        # Subir la imagen al bucket S3
        s3_client.put_object(Bucket=BUCKET_NAME, Key=image_name, Body=image_data)

        # Crear URL pública de la imagen
        image_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{image_name}"

        # Guardar metadatos de la imagen en DynamoDB
        table.put_item(Item={
            'image_id': image_id,  # Guardar el ID limpio sin guiones ni puntos
            'url': image_url,
            'size': len(image_data.encode('utf-8')),  # Reemplaza si el dato no es string
        })

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Image uploaded successfully!', 'url': image_url})
        }

    except Exception as e:
        # Log del error para diagnosticar
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
