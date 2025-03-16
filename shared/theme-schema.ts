
import { Type } from "@sinclair/typebox";

export const ThemeSchema = Type.Object({
  type: Type.Union([
    Type.Literal("light"),
    Type.Literal("dark"),
    Type.Literal("system")
  ]),
  primary: Type.String(),
  appearance: Type.String(),
  radius: Type.Number()
});
