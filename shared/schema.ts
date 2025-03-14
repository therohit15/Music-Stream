import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const songs = pgTable("songs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  youtubeId: text("youtube_id").notNull().unique(),
});

export const playlists = pgTable("playlists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  songs: jsonb("songs").notNull().$type<string[]>(),
});

export const insertSongSchema = createInsertSchema(songs).pick({
  title: true,
  artist: true,
  thumbnailUrl: true,
  youtubeId: true,
});

export const insertPlaylistSchema = createInsertSchema(playlists).pick({
  name: true,
  songs: true,
});

export type Song = typeof songs.$inferSelect;
export type InsertSong = z.infer<typeof insertSongSchema>;
export type Playlist = typeof playlists.$inferSelect;
export type InsertPlaylist = z.infer<typeof insertPlaylistSchema>;
