const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'YOUR_API_KEY';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeSearchResult {
  id: string;
  title: string;
  artist: string;
  thumbnailUrl: string;
}

export async function searchYouTube(query: string): Promise<YouTubeSearchResult[]> {
  const params = new URLSearchParams({
    part: 'snippet',
    maxResults: '10',
    q: query,
    type: 'video',
    key: YOUTUBE_API_KEY,
  });

  const response = await fetch(`${YOUTUBE_API_URL}/search?${params}`);
  
  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.statusText}`);
  }

  const data = await response.json();

  return data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    artist: item.snippet.channelTitle,
    thumbnailUrl: item.snippet.thumbnails.medium.url,
  }));
}
