#!/bin/bash

# Variables
FUNCTION_NAME="get_image_metadata"
STATEMENT_ID="apigateway-access"
ACTION="lambda:InvokeFunction"
PRINCIPAL="apigateway.amazonaws.com"
REGION="us-east-1"
ACCOUNT_ID=""     # Agrega tu cuenta AWS
API_GW_ID=""      # Agregatu API Gateway ID
METHOD="GET"
RESOURCE="/metadata/*"

# Comando para añadir los permisos
aws lambda add-permission \
  --function-name $FUNCTION_NAME \
  --statement-id $STATEMENT_ID \
  --action $ACTION \
  --principal $PRINCIPAL \
  --source-arn arn:aws:execute-api:$REGION:$ACCOUNT_ID:$API_GW_ID/*/$METHOD$RESOURCE
