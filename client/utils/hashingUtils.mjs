import * as bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    const saltRounds = 10; // This value can be adjusted. Higher means more secure but slower.
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

export default hashPassword;
/*
 * An example to call the function
const password = "yourPlainTextPassword";
hashPassword(password)
    .then(hashed => {
        console.log(password)
        console.log("Hashed password:", hashed);
    })
    .catch(error => {
        console.error("Error hashing password:", error);
    });
 */

