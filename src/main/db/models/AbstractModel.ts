import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  UpdatedAt,
} from 'sequelize-typescript';

import IAbstractModel from '../../../interfaces/AbstractModel';

export default abstract class AbstractModel extends Model implements IAbstractModel {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  override id!: number;

  @CreatedAt
  override createdAt!: Date;

  @UpdatedAt
  override updatedAt!: Date;
}
