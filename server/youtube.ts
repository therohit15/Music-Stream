const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'YOUR_API_KEY';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeSearchResult {
  id: string;
  title: string;
  artist: string;
  thumbnailUrl: string;
}

export async function searchYouTube(query: string): Promise<YouTubeSearchResult[]> {
  if (!process.env.YOUTUBE_API_KEY) {
    throw new Error("YouTube API key is not configured");
  }

  const params = new URLSearchParams({
    part: 'snippet',
    maxResults: '10',
    q: query,
    type: 'video',
    key: process.env.YOUTUBE_API_KEY,
  });

  try {
    const response = await fetch(`${YOUTUBE_API_URL}/search?${params}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('YouTube API error:', errorText);
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      console.error('Unexpected YouTube API response:', data);
      throw new Error('Invalid YouTube API response format');
    }

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
    }));
  } catch (error) {
    console.error('YouTube search error:', error);
    throw new Error('Failed to search YouTube');
  }
}