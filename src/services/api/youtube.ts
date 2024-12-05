import axios from 'axios';
import { Course, Video, VideoTranscript } from '../../types';
import { YOUTUBE_API_KEY } from '../config';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export async function getVideoTranscript(videoId: string): Promise<VideoTranscript | null> {
  try {
    // First get video details
    const videoResponse = await axios.get(`${YOUTUBE_API_URL}/videos`, {
      params: {
        part: 'snippet',
        id: videoId,
        key: YOUTUBE_API_KEY,
      },
    });

    if (!videoResponse.data.items?.length) {
      return null;
    }

    // For this example, since we can't actually get the transcript from YouTube API,
    // we'll return a structured version of the description as a fallback
    const videoData = videoResponse.data.items[0].snippet;
    
    // Process description into a more transcript-like format
    const processedText = videoData.description
      .split('\n')
      .filter(line => line.trim())
      .join('\n');

    return {
      videoId,
      transcript: processedText,
      language: videoData.defaultLanguage || 'en'
    };
  } catch (error) {
    console.error('Error fetching video details:', error);
    return null;
  }
}

export async function searchPlaylists(technology: string): Promise<Course | null> {
  try {
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

    const videosResponse = await axios.get(`${YOUTUBE_API_URL}/playlistItems`, {
      params: {
        part: 'snippet,contentDetails',
        playlistId,
        maxResults: 50,
        key: YOUTUBE_API_KEY,
      },
    });

    const videos: Video[] = await Promise.all(
      videosResponse.data.items.map(async (item: any) => {
        const videoId = item.contentDetails.videoId;
        const transcript = await getVideoTranscript(videoId);

        return {
          id: videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high.url,
          transcript: transcript?.transcript || null,
          completed: false,
        };
      })
    );

    // Get video durations
    const videoIds = videos.map(v => v.id).join(',');
    const durationsResponse = await axios.get(`${YOUTUBE_API_URL}/videos`, {
      params: {
        part: 'contentDetails',
        id: videoIds,
        key: YOUTUBE_API_KEY,
      },
    });

    let totalDuration = 0;
    durationsResponse.data.items.forEach((item: any) => {
      // Convert ISO 8601 duration to minutes
      const duration = item.contentDetails.duration;
      const minutes = duration.match(/PT(\d+)M/)?.[1] || 0;
      const hours = duration.match(/PT(\d+)H/)?.[1] || 0;
      totalDuration += parseInt(hours) * 60 + parseInt(minutes);
    });

    return {
      id: playlistId,
      title: playlist.snippet.title,
      description: playlist.snippet.description,
      thumbnail: playlist.snippet.thumbnails.high.url,
      videos,
      totalDuration
    };
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return null;
  }
}