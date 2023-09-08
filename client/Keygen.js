import RSA from 'react-native-rsa-native'

async function generateKeyPair() {
    try {
        const keys = await RSA.generate();

        console.log('Private Key:', keys.private);
        console.log('Public Key:', keys.public);

        return keys;
    } catch (error) {
        console.error('Error generating keys:', error);
    }
}

export async function encryptData(data, publicKey) {
    try {
        const encryptedData = await RSA.encrypt(data, publicKey);
        return encryptedData;
    } catch (error) {
        console.error('Error encrypting data:', error);
    }
}

export const keys = await generateKeyPair();