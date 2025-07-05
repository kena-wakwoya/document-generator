import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";

@Table
export class Document extends Model {

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    title!: string

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    content!: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    ownerID: number;

    @BelongsTo(() => User)
    user: User;

}