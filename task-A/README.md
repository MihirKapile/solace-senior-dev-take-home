# Task A – Enclave-Style Decryption Service

## Setup

- Install Node, Python, AWS CLI, Terraform
- Run `terraform apply` in `infra/`
- Note the Lambda URL
- Upload encrypted blob using `encrypt-upload.py`
- Run `decrypt_test.sh`

## Lambda Endpoint

```bash
curl -X POST https://your-lambda-url.amazonaws.com/ \
  -H "Content-Type: application/json" \
  -d '{"blobKey": "sample-blob"}'