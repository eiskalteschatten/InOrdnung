import {
  Column,
  AllowNull,
  Default,
  Table,
  Unique,
  DataType,
} from 'sequelize-typescript';

import AbstractModel from './AbstractModel';

export type Theme = 'light' | 'dark';

@Table({
  modelName: 'window',
})
export default class Window extends AbstractModel {
  @Unique
  @Column({
    type: DataType.STRING,
  })
  windowId: string;

  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
  })
  windowWidth?: number;

  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
  })
  windowHeight?: number;

  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
  })
  windowX?: number;

  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
  })
  windowY?: number;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  windowIsMaximized: boolean;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  windowIsFullScreen: boolean;
}
