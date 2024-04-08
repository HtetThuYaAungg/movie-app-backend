import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength, } from "class-validator";


export class CreateUserDto {
    
    @ApiProperty()
    @IsEmail({},{message: "Email is invalid"})
    @IsNotEmpty({message : "Email is required."})
    email : string;

    @ApiProperty()
    @IsNotEmpty({message: "User name is required."})
    @IsString()
    name : string;

    @ApiProperty()
    @IsNotEmpty({message: "Password is required."})
    @MinLength(8,{message: "Password must be at least 8 characters."})
    password : string;

}

export class LoginUserDto {
    
    @ApiProperty()
    @IsEmail({},{message: "Email is invalid"})
    @IsNotEmpty({message : "Email is required."})
    email : string;

    @ApiProperty()
    @IsNotEmpty({message: "Password is required."})
    @MinLength(8,{message: "Password must be at least 8 characters."})
    password : string;

}

export class CheckUserEmailDto {
    
    @ApiProperty()
    @IsEmail({},{message: "Email is invalid"})
    @IsNotEmpty({message : "Email is required."})
    email : string;

}


