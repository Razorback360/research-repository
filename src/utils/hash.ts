import bcrypt from "bcrypt"
import { env } from "@app/utils/env"

const saltRounds = 14 //parseInt(env.SALT_ROUNDS as string)

export async function hash(password: string) {
	const hashedPass = await bcrypt.hash(password, saltRounds)
	return hashedPass
}

export async function compare(plainPass: string, hashedPass: string) {
	const status = await bcrypt.compare(plainPass, hashedPass)
	return status
}
