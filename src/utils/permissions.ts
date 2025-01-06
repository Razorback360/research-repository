import {prisma} from "@db/index";
import { Permission } from "@prisma/client";

export const checkPermission = async (userId: string, permission: keyof Permission) => {
    const check = await prisma.permission.findFirst({
        where: {
            userId: userId,
        }
    })

    if (check && check[permission]) {
        return true;
    }
    return false;
}

export const checkMultiplePermissions = async (userId: string, permissions: Array<keyof Permission>) => {
    const check = await prisma.permission.findFirst({
        where: {
            userId: userId,
        }
    })

    if (check) {
        for (const permission of permissions) {
            if (!check[permission]) {
                return false;
            }
        }
        return true;
    }
    return false;
}

export const addPermission = async (userId: string, permission: keyof Permission) => {
    const check = await prisma.permission.findFirst({
        where: {
            userId: userId,
        }
    })

    if (check) {
        await prisma.permission.update({
            where: {
                userId: check.userId
            },
            data: {
                [permission]: true
            }
        })
    } else {
        await prisma.permission.create({
            data: {
                userId: userId,
                [permission]: true
            }
        })
    }
}

export const removePermission = async (userId: string, permission: keyof Permission) => {
    const check = await prisma.permission.findFirst({
        where: {
            userId: userId,
        }
    })

    if (check) {
        await prisma.permission.update({
            where: {
                userId: check.userId
            },
            data: {
                [permission]: false
            }
        })
    }
}