import { z } from "zod";

export const emailSchema = z.email("Please enter valid email address");
