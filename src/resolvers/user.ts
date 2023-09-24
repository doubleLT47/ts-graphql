import { User } from "../entities/user";
import { InputType, Field, Resolver, Mutation, Arg, ObjectType, Ctx } from "type-graphql";
import bcriptjs from "bcryptjs";
import { MyContext } from "@_types/index";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(@Arg("options") options: UsernamePasswordInput): Promise<UserResponse> {
    try {
      if (options.username.length <= 2) {
        return {
          errors: [
            {
              field: "username",
              message: "length must be greater than 2",
            },
          ],
        };
      }

      if (options.password.length <= 2) {
        return {
          errors: [
            {
              field: "password",
              message: "length must be greater than 2",
            },
          ],
        };
      }

      const hashedPassword = await bcriptjs.hashSync(options.password);
      const user = await User.create({
        username: options.username,
        password: hashedPassword,
      }).save();
      return { user };
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
      return {
        errors: [
          {
            field: "null",
            message: "something went wrong",
          },
        ],
      };
    }
  }
  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    //1
    const user = await User.findOne({ where: { username: options.username } });
    //2
    if (!user) {
      return {
        errors: [{ field: "username", message: "username doesn't exist" }],
      };
    }
    const valid = await bcriptjs.compareSync(options.password, user.password);
    //3
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "that password doesn't exist",
          },
        ],
      };
    }
    //4
    req.session.userId = user.id;
    return { user };
  }
}
