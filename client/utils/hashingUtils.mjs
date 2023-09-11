import bcrypt from 'bcryptjs';

export const hashString = (password) => {
    const saltRounds = bcrypt.genSaltSync(10); // This value can be adjusted. Higher means more secure but slower.
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

export default hashString;
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

