import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    Unique,
    HasMany
  } from 'sequelize-typescript';
  import { Project } from './Project';
  
  @Table({ tableName: 'countries' })
  export class Country extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number = 1;
  
    @Unique
    @Column({ type: DataType.STRING(100), allowNull: false })
    name!: string;

    @HasMany(() => Project)
    projects!: Project[];
  
  }
  