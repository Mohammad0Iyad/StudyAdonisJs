import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Order from 'App/Models/Order';
import Product from 'App/Models/Product';

interface OrderProduct {
    id: number;
    qty: number;
    price: number;
  }
export default class OrdersController {


    public async getById(ctx: HttpContextContract) {      
      const orderId = ctx.params.id
      if (!orderId) {
        return ctx.response.status(400).json({ message: 'Invalid order ID' })
      }
      
      const order = await Order.query()
        .where('id', orderId)
        .preload('products')
        .firstOrFail()

        return order
  }


    
    
    public async getByAuth(ctx: HttpContextContract) {
        try {
            const user = await ctx.auth.authenticate()

            // Retrieve orders by the authenticated user
            const orders = await Order.query().where('user_id', user.id)

            return ctx.response.ok({ data: orders })
        } catch (error) {
            return ctx.response.status(500).send({ error: 'Failed to retrieve orders' })
        }
    }
    // public async createOrder(ctx: HttpContextContract) {
    //     try {
    //       // Get user ID from authenticated user
    //       const user = await ctx.auth.authenticate()
      
    //       // Create a new order
    //       const order = new Order()
    //       order.userId = user.id
    //       const newSchema = schema.create({
    //                 total: schema.number(),
    //                 address: schema.string(),
    //                 status_id : schema.number(),
                    
        
    //             });
    //       const fields = await ctx.request.validate({ schema: newSchema })

    //       order.address =fields.address;
    //       order.total =fields.total;
    //       order.statusId =fields.status_id;

    //       await order.save()
       
          
    //       const productIds = ctx.request.input('productIds') 

    //        await order.related('products').attach(productIds)
    //       return order
    //     } catch (error) {
    //       return ctx.response.status(500).send({ error: 'Failed to create order' })
    //     }
    //   }   
      public async createOrder(ctx: HttpContextContract) {
        try {
          // Get user ID from authenticated user
          const user = await ctx.auth.authenticate()
      
          // Create a new order
          const order = new Order()
          order.userId = user.id
      
          const newSchema = schema.create({
            total: schema.number(),
            address: schema.string(),
            status_id: schema.number(),
            productIds: schema.array().members(schema.number()) // Add validation for productIds as an array of numbers
          });
      
          const fields = await ctx.request.validate({ schema: newSchema })
      
          order.address = fields.address;
          order.total = fields.total;
          order.statusId = fields.status_id;
      
          await order.save()
          
      
          const productIds = fields.productIds;
      
          // Fetch products based on productIds
          const products = await Product.query().whereIn('id', productIds)
      
          // Calculate total price based on product prices and quantities
          let totalPrice = 0;
          products.forEach(product => {
            const productId = product.id;
            const quantity = productIds.filter(id => id === productId).length;
            totalPrice += product.price * quantity;
        });
        //     // Insert product_id, quantity, and price into order_products table
        //     await Database.table('order_products').insert({
        //       order_id: order.id,
        //       product_id: productId,
        //       qty: quantity,
        //       price: product.price
        //     });
        //   });
      
        //   order.total = totalPrice;
          await order.save();
      
          return order;
        } catch (error) {
          return ctx.response.status(500).send({ error: 'Failed to create order' })
        }
      }
      
    
}

    // public async create(ctx: HttpContextContract) {
    //     var object = await ctx.auth.authenticate();
    //     const newSchema = schema.create({
    //         user_id: schema.number(),
    //         total: schema.number(),
    //         address: schema.string(),
    //         status_id : schema.number(),
            

    //     });
    //     const fields = await ctx.request.validate({ schema: newSchema })

    //     var Order = new Order();
    //     Order.userId = fields.user_id;
    //     Order.total = fields.total;
    //     Order.address = fields.address;
    //     Order.statusId = fields.status_id;

    //     var result = await Order.save();
    //     return result;


    //  }
    // public async update(ctx: HttpContextContract) {
    //     var object = await ctx.auth.authenticate();
    //     var fields = ctx.request.all();
    //     var id = fields.id;
    //     var Order = await Order.findOrFail(id);
    //     Order.userId = fields.user_id;
    //     Order.total = fields.total;
    //     Order.address = fields.address;
    //     Order.statusId = fields.status_id;

    //     var result = await Order.save();
    //     return result;
    // }
    // public async destroy(ctx: HttpContextContract) {
    //     var id = ctx.params.id;
    //     var Order = await Order.findOrFail(id);
    //     await Order.delete();
    //     return { message: "The Order has been deleted!" };
    // }
