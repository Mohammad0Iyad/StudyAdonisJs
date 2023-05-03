import { DateTime } from 'luxon'
import User from './User'
import { BaseModel, BelongsTo, belongsTo,hasOne, HasOne, HasMany, hasMany,ManyToMany,manyToMany, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: "user_id", })
  public userId: number

  @column({ serializeAs: "total", })
  public total: number

  @column({ serializeAs: "address", })
  public address: string

  @column({ serializeAs: "status_id", })
  public statusId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @manyToMany(() => Product, {
    pivotTable: 'order_products',
    pivotForeignKey: 'order_id',
    pivotRelatedForeignKey: 'product_id',
    localKey: 'id',
    relatedKey: 'id',
  })
  public products: ManyToMany<typeof Product>
  
}
