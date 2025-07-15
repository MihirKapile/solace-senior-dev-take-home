@echo off
curl -X POST <YOUR LAMBDA_FUNCTION_URL> ^
  -H "Content-Type: application/json" ^
  -d "{\"blobKey\": \"sample-blob\"}"
pause
