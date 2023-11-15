import encryptWithPublicKey from "./utils/encryptionUtils.mjs"
import decryptWithPrivateKey from "./utils/decryptionUtils.mjs"

var testStr = encryptWithPublicKey('ello');
console.log(testStr);
console.log('--------------------------------');
console.log(decryptWithPrivateKey(testStr));