
import { Expose } from "class-transformer"
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"
const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;



export class UserDtoRegister {
    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsStrongPassword()
    @IsNotEmpty()
    password: string
}

export class UserDtoProfile extends UserDtoRegister {
    @Expose()
    id: String

    @Expose()
    role: string

    @Expose()
    createdAt: Date;
    @Expose()
    updatedAt: Date;

    deletedAt: Date;

}