import privateKeyPem from '../password.mjs';

export function decryptWithPrivateKey(encryptedMessage) {
    // Convert the PEM-formatted private key to a private key object
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

    // Decode the base64-encoded encrypted message
    const encryptedBuffer = forge.util.decode64(encryptedMessage);

    // Decrypt the buffer using the private key
    const decrypted = privateKey.decrypt(encryptedBuffer, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha1.create()
        }
    });

    return decrypted;
}

export default decryptWithPrivateKey;