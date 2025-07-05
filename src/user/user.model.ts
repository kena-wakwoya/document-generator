import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Document } from "src/document/document.model";


export enum UserRole {
    ADMIN = 'ADMIN',
    REGULAR = 'USER'
}
@Table
export class User extends Model{
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    fullName!:string

    @Column({
        type:DataType.STRING,unique:true,
        allowNull:false
    })
    email!:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    password!:string

    @Column({
        type:DataType.ENUM(...Object.values(UserRole)),
        allowNull:false,
        defaultValue:UserRole.REGULAR
    })
    role!:UserRole

    //relations with module
    @HasMany(()=>Document)
    documents:Document[]


}