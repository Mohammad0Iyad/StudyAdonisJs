import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';

export default class UsersController {

    public async getAll(ctx: HttpContextContract) {
        await ctx.auth.authenticate();
        const users = await User.all()
        return users
    }

    // public async getById(ctx: HttpContextContract) {
    //     await ctx.auth.authenticate();
    //     const id = ctx.params.id
    //     const user = await User.findOrFail(id)
    //     return user
    // }
    public async getByAuth(ctx: HttpContextContract) {
        await ctx.auth.authenticate();
        const user = ctx.auth.user!;

        return user;
    }
    public async login(ctx: HttpContextContract) {
        const { email, password } = ctx.request.all();
        const result = await ctx.auth.attempt(email, password);
        return result;
    }

    public async logout(ctx: HttpContextContract) {
        await ctx.auth.authenticate();
        await ctx.auth.logout();
        return { message: "Logout" }
    }

    public async create(ctx: HttpContextContract) {
        const newSchema = schema.create({
            username: schema.string({}, [
                rules.unique({
                    table: 'users',
                    column: 'username',
                })
            ]),
            email: schema.string({}, [
                rules.email(),
                rules.unique({
                    table: 'users',
                    column: 'email',
                })
            ]),
            password: schema.string(),
        });
        const fields = await ctx.request.validate({ schema: newSchema });
        const user = new User();
        user.username = fields.username;
        user.email = fields.email;
        user.password = fields.password;
        await user.save();
        return user;
    }

    public async update(ctx: HttpContextContract) {
        await ctx.auth.authenticate();
        const user = ctx.auth.user!;
        const { username, email, password } = ctx.request.all();
        user.username = username;
        user.email = email;
        user.password = password;
        await user.save();
        return user;
    }

    public async destroy(ctx: HttpContextContract) {
        await ctx.auth.authenticate();
        const id = ctx.params.id;
        const user = await User.findOrFail(id);
        await user.delete();
        return { message: "The user has been deleted!" };
    }
}
