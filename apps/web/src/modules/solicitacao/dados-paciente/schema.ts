import { z } from "zod";

export const dadosPacienteSchema = z.object({
  nome: z.string().nonempty("teu cu")
})
