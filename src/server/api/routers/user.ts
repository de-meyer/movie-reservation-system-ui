import axios from "axios";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const SchemaUser = z.object({
	id: z.number(),
	name: z.string(),
	email: z.string().email(),
});
type User = z.infer<typeof SchemaUser>;

export const userRouter = createTRPCRouter({

	registerUser: publicProcedure
		.input(SchemaUser.omit({ id: true }))
		.output(SchemaUser)
		.mutation(async ({ input }) => {
			const response = await axios.post("http://localhost:8080/api/users/registration", input);
			return response.data 
		}),
});
