import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema()
export class Token {
  @Prop({required : true})
  token : string 
  @Prop({required : true , ref : 'User' , type : Types.ObjectId})
  userId : string // why not "Types.ObjectId" here ?  
  // TypeScript does not have a built-in type for MongoDB's ObjectId.
  // Using string is a common practice to avoid type errors and ensure compatibility
} 

export type TokenDocument = HydratedDocument<Token> ;

export const TokenSchema = SchemaFactory.createForClass(Token)