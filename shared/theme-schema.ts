
import { Type } from "@sinclair/typebox";

export const ThemeSchema = Type.Object({
  variant: Type.Union([
    Type.Literal("default"),
    Type.Literal("destructive"),
    Type.Literal("outline"),
    Type.Literal("secondary")
  ]),
  primary: Type.String(),
  appearance: Type.String(),
  radius: Type.Number()
});
