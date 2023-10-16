#!/bin/bash

# Get public IP address using icanhazip service (you can use other services as needed)
IP_ADDRESS=$(ifconfig en0 | grep "inet " | awk '{print $2}')

# Port number
PORT=5050

# URL
URL="http://${IP_ADDRESS}:${PORT}" # Replace '/endpoint' with the correct endpoint path if needed

# Send POST request
# curl -X POST \
#      -H "Content-Type: application/json" \
#      -d '{ "hashed_email": "testCat6", "hashed_password": "tested", "encrypted_email": "catTest", "first_name": "cat", "last_name": "x", "account_type": 3, "username": "catUser", "birthday": "aha", "gender": "who knows", "phone_number": "cant have it", "subscribed_to_news": false }' \
#      $URL/signup

curl -X POST \
     -H "Content-Type: application/json" \
     -d '{ "hashed_email": "testCat6", "hashed_password": "tested" }' \
     $URL

# Send GET request
# curl -X POST \
#      -H "Content-Type: application/json" \
#      -d '{ "liked_articles": ["6510a9f588a3b446139ff5ea"] }' \
#      "$URL/posts/64f20d6e41ccc9b6b4c8af65/6510a9f588a3b446139ff5ea/?like=-1"