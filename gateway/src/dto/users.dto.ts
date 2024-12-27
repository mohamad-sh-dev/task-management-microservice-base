import { ApiProperty, OmitType } from "@nestjs/swagger";

export class SignupDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    email: string

    @ApiProperty()
    password: string

}
export class LoginDto extends OmitType(SignupDto , ['name']){} ;