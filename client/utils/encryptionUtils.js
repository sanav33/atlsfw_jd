import publicKeyPem from "../pki.js";
import forge from 'node-forge';

/*
 * This function accepts a string and returns an encrypted string
 */
function encryptWithPublicKey(message) {
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

