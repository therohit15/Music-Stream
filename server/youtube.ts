const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeSearchResult {
  id: string;
  title: string;
  artist: string;
  thumbnailUrl: string;
}

export async function searchYouTube(query: string): Promise<YouTubeSearchResult[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  console.log('Checking YouTube API key:', apiKey ? 'Present' : 'Missing');

  if (!apiKey) {
    throw new Error("YouTube API key is not configured");
  }

  const params = new URLSearchParams({
    part: 'snippet',
    maxResults: '10',
    q: query,
    type: 'video',
    key: apiKey,
  });

  try {
    const url = `${YOUTUBE_API_URL}/search?${params}`;
    console.log('Making request to YouTube API:', url.replace(apiKey, '[REDACTED]'));

    const response = await fetch(url);
    console.log('YouTube API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('YouTube API error response:', errorText);
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('YouTube API response data structure:', 
      Object.keys(data),
      data.items ? `Found ${data.items.length} items` : 'No items found'
    );

    if (!data.items || !Array.isArray(data.items)) {
      console.error('Unexpected YouTube API response:', JSON.stringify(data, null, 2));
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
    throw error;
  }
}