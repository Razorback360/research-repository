import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient().$extends({
  result:{
    dataset:{
      type:{
        compute(){
          return "dataset";
        }
      }
    },
    paper:{
      type:{
        compute(){
          return "paper";
        }
      }
    }
  }
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { prisma };