import { z } from "zod";

// Campos compartidos
const parcelFieldsSchema = z.object({
  terreno_name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(120),

  country: z.string().trim().min(2, "Selecciona un país").max(100),

  state: z.string().trim().min(2, "Selecciona un estado").max(100),

  municipality: z.string().trim().min(2, "Selecciona un municipio").max(120),
  area_hectares: z
    .number({
      error: "La superficie debe ser un número",
    })
    .min(1, "La superficie mínima es 1 hectárea")
    .max(10000, "La superficie máxima es 10,000 hectáreas"),

  target_crop: z
    .string()
    .trim()
    .min(2, "Ingresa el cultivo principal")
    .max(100),

  latitude: z.number().min(-90).max(90),

  longitude: z.number().min(-180).max(180),
});

// Crear terreno: todos los campos son obligatorios
export const createParcelSchema = parcelFieldsSchema;

// Actualizar terreno: todos los campos son opcionales
export const updateParcelSchema = parcelFieldsSchema
  .partial()
  .superRefine((data, ctx) => {
    // Si se actualiza una coordenada,
    // también debe enviarse la otra.
    if ((data.latitude === undefined) !== (data.longitude === undefined)) {
      ctx.addIssue({
        code: "custom",
        message: "Debes proporcionar ambas coordenadas",
        path: ["latitude"],
      });
    }

    if (Object.keys(data).length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Debes proporcionar al menos un campo",
      });
    }
  });

// Tipos TypeScript
export type CreateParcelForm = z.infer<typeof createParcelSchema>;

export type UpdateParcelForm = z.infer<typeof updateParcelSchema>;
