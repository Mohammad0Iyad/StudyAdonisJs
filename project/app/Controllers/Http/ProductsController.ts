import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Product from 'App/Models/Product';

export default class ProductsController {

  public async getById(ctx: HttpContextContract) {
    var id = ctx.params.id;
    var result = await Product.findOrFail(id);
    return result;

  }
  public async getAll(ctx: HttpContextContract) {
    
    var result = await Product.all();
    return result;

  }
  public async create(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate();

    const newSchema = schema.create({
      name: schema.string(),
      image: schema.string(),
      price:schema.number(),
      currentQty:schema.number(),
      description:schema.string(),


    });
    const fields = await ctx.request.validate({ schema: newSchema })

    var product = new Product();
    product.name = fields.name;
    product.image = fields.image;
    product.price = fields.price;
    product.currentQty = fields.currentQty;
    product.description = fields.description;
 
    var result = await product.save();
    return result;


  }
  public async update(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate();
    var fields = ctx.request.all();
    var id = fields.id;
    var product = await Product.findOrFail(id);
    product.name = fields.name;
    product.image = fields.image;
    product.price = fields.price;
    product.currentQty = fields.currentQty;
    product.description = fields.description;
    var result = await product.save();
    return result;
  }
  public async destroy(ctx: HttpContextContract) {
    var id = ctx.params.id;
    var product = await Product.findOrFail(id);
    await product.delete();
    return { message: "The product has been deleted!" };
  }
}