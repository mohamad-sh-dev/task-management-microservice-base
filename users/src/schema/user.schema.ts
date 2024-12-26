import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class User {
    @Prop({ required: true })
    name: string
    @Prop({ required: true })
    email: string
    @Prop({ required: true, unique: true })
    password: string
}

export type UserDocument = HydratedDocument<User>
// HydratedDocument that represents a document with all the methods and properties of a Mongoose document,
//  but typed with the User class/interface
export const UserSchema = SchemaFactory.createForClass(User)
//generates a Mongoose schema based on the User class definition