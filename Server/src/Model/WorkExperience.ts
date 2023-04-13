import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Profile } from "./Profile";

@Table({
    tableName: WorkExperience.EXPERIENCE_TABLE_NAME,
})
export class WorkExperience extends Model {
    public static EXPERIENCE_TABLE_NAME = "work_experience";
    public static EXPERIENCE_ID = "id";
    public static EXPERIENCE_USER_ID = "user_id";
    public static EXPERIENCE_START_DATE = "start_date";
    public static EXPERIENCE_END_DATE = "end_date";
    public static EXPERIENCE_JOB_TITLE = "job_title";
    public static EXPERIENCE_COMPANY = "company";
    public static EXPERIENCE_COMPANY_LOGO = "company_logo";
    public static EXPERIENCE_DESCRIPTION = "description";

    @Column({
        field: WorkExperience.EXPERIENCE_ID,
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @Column({
        field: WorkExperience.EXPERIENCE_USER_ID,
        type: DataType.INTEGER,
        allowNull: false,
    })
    user_id!: number;

    @Column({
        field: WorkExperience.EXPERIENCE_START_DATE,
        type: DataType.DATE,
        allowNull: false,
    })
    start_date!: Date;

    @Column({
        field: WorkExperience.EXPERIENCE_END_DATE,
        type: DataType.DATE,
        allowNull: false,
    })
    end_date!: Date;

    @Column({
        field: WorkExperience.EXPERIENCE_JOB_TITLE,
        type: DataType.STRING,
        allowNull: false,
    })
    job_title!: string;

    @Column({
        field: WorkExperience.EXPERIENCE_COMPANY,
        type: DataType.STRING,
        allowNull: false,
    })
    company!: string;

    @Column({
        field: WorkExperience.EXPERIENCE_COMPANY_LOGO,
        type: DataType.STRING,
        allowNull: false,
    })
    company_logo!: string;

    @Column({
        field: WorkExperience.EXPERIENCE_DESCRIPTION,
        type: DataType.TEXT,
        allowNull: false,
    })
    description!: string;

    @BelongsTo(() => Profile, { foreignKey: WorkExperience.EXPERIENCE_USER_ID })
    profile!: Profile;
}
