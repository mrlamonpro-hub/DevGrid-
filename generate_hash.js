import bcrypt from 'bcryptjs';
const password = 'ManasAnas';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);
console.log(hash);
