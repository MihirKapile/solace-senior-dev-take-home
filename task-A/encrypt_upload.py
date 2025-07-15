import boto3

kms = boto3.client('kms', region_name='us-west-2')
s3 = boto3.client('s3', region_name='us-west-2')

plaintext = b'Hello, Mihir! Encrypted for Task A!'
response = kms.encrypt(
    KeyId='alias/solace/decrypt',
    Plaintext=plaintext
)

s3.put_object(
    Bucket='solace-task-a-blob',
    Key='sample-blob',
    Body=response['CiphertextBlob']
)