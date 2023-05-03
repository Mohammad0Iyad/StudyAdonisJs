import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo,hasOne, HasOne, HasMany, hasMany,manyToMany, ManyToMany, column } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'
export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: "name", })
  public name: string

  @column({ serializeAs: "image", })
  public image: string

  @column({ serializeAs: "price", })
  public price: number

  @column({ serializeAs: "current_qty", })
  public currentQty: number

  @column({ serializeAs: "description", })
  public description: string
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Order, {
    pivotTable: 'order_products',
    pivotForeignKey: 'product_id',
    pivotRelatedForeignKey: 'order_id',
    localKey: 'id',
    relatedKey: 'id',
  })
  public orders: ManyToMany<typeof Order>
}
