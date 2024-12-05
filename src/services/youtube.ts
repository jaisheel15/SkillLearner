import axios from 'axios';
import { Course, Video } from '../types';

const YOUTUBE_API_KEY = 'AIzaSyAAN0Gvap-YavSXlRHe5cCf-R6cjIXoCdI'; // In production, use environment variables
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export async function searchPlaylists(
  technology: string
): Promise<Course | null> {
  try {
    // Search for playlists
    const playlistResponse = await axios.get(`${YOUTUBE_API_URL}/search`, {
      params: {
        part: 'snippet',
        q: `${technology} tutorial playlist`,
        type: 'playlist',
        maxResults: 1,
        key: YOUTUBE_API_KEY,
      },
    });

    if (!playlistResponse.data.items?.length) {
      return null;
    }

    const playlist = playlistResponse.data.items[0];
    const playlistId = playlist.id.playlistId;

    // Get playlist items
    const videosResponse = await axios.get(`${YOUTUBE_API_URL}/playlistItems`, {
      params: {
        part: 'snippet',
        playlistId,
        maxResults: 50,
        key: YOUTUBE_API_KEY,
      },
    });

    const videos: Video[] = videosResponse.data.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      completed: false,
    }));

    return {
      id: playlistId,
      title: playlist.snippet.title,
      description: playlist.snippet.description,
      thumbnail: playlist.snippet.thumbnails.high.url,
      videos,
    };
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return null;
  }
}
