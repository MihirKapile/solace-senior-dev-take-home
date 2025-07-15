import boto3
import os
import json

s3 = boto3.client('s3')
kms = boto3.client('kms')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    blob_key = body['blobKey']
    bucket_name = os.environ['BLOB_BUCKET']

    s3_object = s3.get_object(Bucket=bucket_name, Key=blob_key)
    encrypted_data = s3_object['Body'].read()

    decrypted = kms.decrypt(CiphertextBlob=encrypted_data)
    plaintext = decrypted['Plaintext'].decode('utf-8')

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps({"plaintext": plaintext})
    }