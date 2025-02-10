import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo
  } from 'sequelize-typescript';
    import { Country } from './Country';
  
  @Table({ tableName: 'projects' })
  export class Project extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number = 1;
  
    @Column({ type: DataType.STRING(255), allowNull: false })
    name!: string;
  
    @ForeignKey(() => Country)
    @Column({ type: DataType.INTEGER, allowNull: false })
    country_id!: number;
  
    @BelongsTo(() => Country)
    country!: Country;
  
    @Column({ type: DataType.TEXT, allowNull: true })
    image_url?: string;
  
    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    price_per_ton!: number;
  
    @Column({ type: DataType.INTEGER, allowNull: false, validate: { min: 0 } })
    available_tons!: number;
  
    @Column({ type: DataType.DECIMAL(4, 2), allowNull: false, validate: { min: 0.01, max: 1 } })
    distribution_weight!: number;
  
    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    created_at!: Date;
  
    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    updated_at!: Date;
  }
  