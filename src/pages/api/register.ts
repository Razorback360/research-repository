import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "@app/utils/hash";
import { prisma } from "@db/index"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "POST"){
    const {email, pass, username} = req.body;
    console.log(email, username, pass)
    // Check there is not a user with the same email.
    const check = await prisma.user.findFirst({
      where: {
        email: email
      }
    })

    if(!check){
      const hashedPass = await hash(pass)
      const user = await prisma.user.create({
        data:{
          name: username,
          email: email,
          passHash: hashedPass
        }
      })

      await prisma.permission.create({
        data: {
          userId: user.id
        }
      })

      return res.status(200).json("Sign up sucessful.")
    }
    return res.status(404).json("User with provided email already exists.")
  }
}
