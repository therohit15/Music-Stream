import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchYouTube } from "./youtube";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ message: "Query parameter required" });
      }
      const results = await searchYouTube(q);
      res.json(results);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ message: "Failed to search YouTube" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
