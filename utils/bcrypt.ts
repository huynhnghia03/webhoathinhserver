import * as bcrypt from 'bcrypt';

export function encodePassword(pw: string) {
    const SALT = bcrypt.genSaltSync()
    return bcrypt.hashSync(pw, SALT)
}
export function comparePassword(pw: string, hashpw: string) {
    return bcrypt.compareSync(pw, hashpw)
}