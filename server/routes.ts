import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchYouTube } from "./youtube";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/search", async (req, res) => {
    try {
      console.log('Search request received:', {
        query: req.query,
        params: req.params,
        url: req.url
      });

      const { q } = req.query;

      if (!q || typeof q !== "string") {
        console.log('Invalid query parameter:', q);
        return res.status(400).json({ message: "Query parameter required" });
      }

      if (q.length < 2) {
        console.log('Query too short:', q);
        return res.status(400).json({ message: "Search query too short" });
      }

      console.log('Making YouTube API request for:', q);
      const results = await searchYouTube(q);
      console.log('Search results received:', results.length, 'items');
      res.json(results);
    } catch (error) {
      console.error("Search error:", error);
      const message = error instanceof Error ? error.message : "Failed to search YouTube";
      res.status(500).json({ message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}