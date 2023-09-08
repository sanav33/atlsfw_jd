import publicKeyPem from "../pki.js";
const forge = require('node-forge');

function encryptWithPublicKey(publicKeyPem, message) {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encrypted = publicKey.encrypt(message, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha1.create()
        }
    });
    return forge.util.encode64(encrypted);
}

export default encryptWithPublicKey;
const encryptedMessage = encryptWithPublicKey(publicKeyPem, "Hello, Server!");
console.log(encryptedMessage);
