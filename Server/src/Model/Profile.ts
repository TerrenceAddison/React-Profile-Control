import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { WorkExperience } from "./WorkExperience";

@Table({
    tableName: Profile.PROFILE_TABLE_NAME,
})
export class Profile extends Model {
    public static PROFILE_TABLE_NAME = "profile";
    public static PROFILE_ID = "id";
    public static PROFILE_NAME = "name";
    public static PROFILE_AGE = "age";
    public static PROFILE_PROFILE_PIC = "profile_pic";

  @Column({
    field: Profile.PROFILE_ID,
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    field: Profile.PROFILE_NAME,
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    field: Profile.PROFILE_AGE,
    type: DataType.INTEGER,
    allowNull: false,
  })
  age!: number;

  @Column({
    field: Profile.PROFILE_PROFILE_PIC,
    type: DataType.STRING(500000),
    allowNull: false,
  })
  profile_pic!: string;

  @HasMany(() => WorkExperience, { foreignKey: "user_id" })
  work_experiences!: WorkExperience[];


}
