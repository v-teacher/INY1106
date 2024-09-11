### **Proyecto Serverless de aplicación general: "Image Metadata API"**

El objetivo de este proyecto es crear una API REST simple que permita subir imágenes a un almacenamiento de objetos, almacenar los metadatos de las imágenes en una base de datos serverless, y recuperar esos metadatos mediante una API. Este proyecto es aplicable a AWS, Azure y Google Cloud Platform (GCP), utilizando solo dos funciones en Python, sin embargo el código de ejemplo es compatible para [AWS](./2_image_metadata_api_aws.md).

### **Arquitectura General:**

1. **API REST**: Gestionada por un servicio serverless de funciones (AWS Lambda, Azure Functions, Google Cloud Functions).
2. **Base de Datos Serverless**: DynamoDB en AWS, Cosmos DB en Azure, Firestore en GCP.
3. **Almacenamiento de Objetos**: S3 en AWS, Blob Storage en Azure, Cloud Storage en GCP.

### **Componentes del Proyecto:**

**Función 1: `upload_image`**
Permite subir una imagen al almacenamiento de objetos y guarda los metadatos de la imagen (nombre, tamaño, URL) en la base de datos serverless.

**Función 2: `get_image_metadata`**
Recupera los metadatos de una imagen específica desde la base de datos usando el identificador (nombre).

### **Código de las Funciones en Python:**

#### **1. `upload_image` - Subir Imagen y Guardar Metadatos**


#### **2. `get_image_metadata` - Obtener Metadatos de la Imagen**

### **Variables de Entorno:**

- **`BUCKET_NAME`**: Nombre del bucket (S3, Blob Storage, Cloud Storage).
- **`TABLE_NAME`**: Nombre de la base de datos (DynamoDB, CosmosDB, Firestore).

### **Configuración por Proveedor de Nube:**

1. **AWS (Lambda, S3, DynamoDB)**:
   - Crear un bucket S3 y configurar permisos.
   - Crear una tabla DynamoDB con la clave primaria `image_id`.
   - Implementar las funciones en AWS Lambda y conectar con API Gateway.

2. **Azure (Functions, Blob Storage, Cosmos DB)**:
   - Crear un contenedor en Azure Blob Storage.
   - Configurar Cosmos DB con una colección de documentos que almacenen los metadatos.
   - Implementar las funciones en Azure Functions.

3. **GCP (Cloud Functions, Cloud Storage, Firestore)**:
   - Crear un bucket en Google Cloud Storage.
   - Configurar Firestore en modo nativo para almacenar los metadatos.
   - Implementar las funciones en Google Cloud Functions.

### **Conclusión:**

Este proyecto proporciona una forma sencilla de demostrar cómo se puede construir una infraestructura serverless aplicable a los tres principales proveedores de nube: AWS, Azure y GCP. Se enfoca en la gestión de archivos (imágenes), el almacenamiento de objetos, y el uso de bases de datos serverless para manejar metadatos, mostrando un enfoque unificado que puede adaptarse a diferentes entornos de nube.