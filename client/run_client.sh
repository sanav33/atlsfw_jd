#!/bin/bash

# Determine the operating system
OS="$(uname)"
MY_LOCAL_IP=""

if [ "$OS" == "Linux" ]; then
    MY_LOCAL_IP=$(hostname -I | awk '{print $1}')
    # Your Linux-specific command here
elif [ "$OS" == "Darwin" ]; then
    MY_LOCAL_IP=$(ifconfig en0 | grep "inet " | awk '{print $2}')
    # Your macOS-specific command here
else
    echo "This operating system is not supported by the script."
    exit 1
fi

echo -e "export const MY_IP_ADDRESS = \"$MY_LOCAL_IP\";\nexport default MY_IP_ADDRESS;" > ./environment_variables.mjs && cat environment_variables.mjs && npx expo start
