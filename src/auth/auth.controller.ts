import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { confirmUserName, registerNewUser, userLogin } from "./auth.service";
import { Context } from "hono";
import { TIAuth, TSAuth } from "../drizzle/schema";
export async function registerUser(c: Context) {
  const newUser = await c.req.json();

  const isUserExist = await confirmUserName(newUser.username);
  //   check if username exist before registering
  if (isUserExist.length === 0) {
    const hashedPass = await bcrypt.hash(newUser.password, 8);
    newUser.password = hashedPass;
    registerNewUser(newUser);
    return c.json({ message: "User succesfully created" });
  }

  return c.json({ message: "The username already exist" }, 403);
}

export async function loginUser(c: Context) {
  const userCredentials = await c.req.json();
  const user = await userLogin(userCredentials);

  if (user === null) {
    return c.json({ message: "User does not exist" }, 403);
  }
  // const { password }: string | null = user;

  const checkPassMatch = await bcrypt.compare(
    userCredentials.password,
    user[0].password
  );
  if (!checkPassMatch) {
    return c.json({ message: "Incorrect password" });
  }
  //   create token if pass is correct
  const { username, role } = user[0];

  console.log(username, role);

  const token: string = jwt.sign(
    { username, role },
    process.env.SECRET as string
  );

  return c.json({ token });
}
