
import { Type } from "@sinclair/typebox";

export const ThemeSchema = Type.Object({
  variant: Type.Union([
    Type.Literal("default"),
    Type.Literal("destructive"),
    Type.Literal("outline"),
    Type.Literal("secondary"),
    Type.Literal("ghost"),
    Type.Literal("link")
  ]),
  type: Type.Union([
    Type.Literal("light"),
    Type.Literal("dark"),
    Type.Literal("system")
  ]),
  primary: Type.String(),
  appearance: Type.String(),
  radius: Type.Number()
});
