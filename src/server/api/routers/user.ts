import axios from "axios";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const SchemaRegister = z.object({
	username: z.string(),
	email: z.string().email(),
	password: z.string(),
});
const SchemaLogin = z.object({
	username: z.string(),
	password: z.string(),
});
const SchemaResponseToken = z.object({
	token: z.string(),
});

const ResponseEntitySchema = z.string();

export const userRouter = createTRPCRouter({
	registerUser: publicProcedure
		.input(SchemaRegister)
		.output(ResponseEntitySchema)
		.mutation(async ({ input }) => {
			const response = await axios.post("http://localhost:8080/auth/register", input);
			return response.data;
		}),
	loginUser: publicProcedure
		.input(SchemaLogin)
		.output(SchemaResponseToken)
		.mutation(async ({ input }) => {
			const response = await axios.post("http://localhost:8080/auth/login", input);
			return response.data;
		}),
});
