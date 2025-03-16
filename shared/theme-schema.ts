
import { Type } from "@sinclair/typebox";

export const ThemeSchema = Type.Object({
  variant: Type.Union([
    Type.Literal("light"),
    Type.Literal("dark"),
    Type.Literal("default")
  ]),
  primary: Type.String(),
  appearance: Type.String(),
  radius: Type.Number()
});
