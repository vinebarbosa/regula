import { z } from "zod";

export const quadroClinicoSchema = z.object({
  teste: z.string().nonempty("teu cu cucuu")
})
