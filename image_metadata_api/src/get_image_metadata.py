import os
import json
import boto3
from decimal import Decimal

# Variables de entorno
TABLE_NAME = os.getenv('TABLE_NAME')

# Cliente de DynamoDB
dynamodb_client = boto3.resource('dynamodb')
table = dynamodb_client.Table(TABLE_NAME)

# Función para convertir Decimals a tipos serializables por JSON
def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError

def get_image_metadata(event, context):
    try:
        # Extraer el image_id desde los parámetros de la ruta
        image_id = event.get('pathParameters', {}).get('image_id')
        print(f"Received image_id: {image_id}")

        if not image_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Image ID is required'})
            }

        # Consultar DynamoDB para obtener los metadatos de la imagen
        response = table.get_item(Key={'image_id': image_id})

        # Verificar si el item fue encontrado
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Image not found'})
            }

        # Convertir el resultado a un formato JSON serializable
        item = response['Item']
        return {
            'statusCode': 200,
            'body': json.dumps(item, default=decimal_default)
        }

    except Exception as e:
        # Log del error para diagnosticar
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
