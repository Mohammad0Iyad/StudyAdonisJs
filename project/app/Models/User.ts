import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel,beforeSave, BelongsTo, belongsTo,hasOne, HasOne, HasMany, hasMany, column } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: "username", })
  public username: string

  @column({serializeAs:"email"})
  public email: string

  @column({ serializeAs: "password" })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(()=> Order)
  public order: HasMany<typeof Order>
}
