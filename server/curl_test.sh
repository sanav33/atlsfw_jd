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
#      -d '{ "hashed_email": "testCat8", "hashed_password": "tested", "encrypted_email": "catTest", "first_name": "cat", "last_name": "x", "account_type": 3, "username": "catUser", "birthday": "aha", "gender": "who knows", "subscribed_to_news": false }' \
#      $URL/signup


# curl -X POST \
#      -H "Content-Type: application/json" \
#      -d '{ "hashed_email": "testCat6" }' \
#      $URL/vendor

# curl -X POST \
#      -H "Content-Type: application/json" \
#      -d '{ "hashed_email": "testCat6", "hashed_password": "tested" }' \
#      $URL

curl -X POST \
     -H "Content-Type: application/json" \
     -d '{ "brand_name": "Reformation", "shop_now_link": "https://www.thereformation.com/", "title": "Winter Weddings", "intro": "Reformation began by selling vintage clothing out of a small Los Angeles storefront in 2009. We quickly expanded into making our own stuff, with a focus on sustainability. Today, we make effortless silhouettes that celebrate the feminine figure and pioneer sustainable practices, focusing on people and progress each step of the way." }' \
     $URL/discover/create/652d9bde94287b3889bfe1f0

curl $URL/discover/652d9bde94287b3889bfe1f0

# Send GET request
# curl -X POST \
#      -H "Content-Type: application/json" \
#      -d '{"article_title":"Vogue’s ultimate guide to sustainable fashion","article_preview_image":"https://assets.vogue.in/photos/60741d6e0b2bcf72ead1c129/2:3/w_2240,c_limit/Vogue-Sustainability-Guide-credit-Justin-Polkey.jpg","article_link":"https://www.vogue.in/fashion/content/vogues-ultimate-guide-to-sustainable-fashion","author_id": 20,"author_name":"Emily Chan","author_pfp_link":"https://images.unsplash.com/photo-1501594907352-04cda38ebc29?fit=crop&w=700&q=60","tags":["innovation","environment"]}' \
#      "$URL/posts/create"