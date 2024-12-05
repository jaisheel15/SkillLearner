import axios from 'axios';
import * as cheerio from 'cheerio';
import { Course, Video } from '../../types';
import { searchPlaylists, getVideoTranscript } from './youtube';
import { generateCourseOutline } from './gemini';

export async function generateCourse(topic: string): Promise<Course | null> {
  try {
    // First try YouTube playlist
    const youtubePlaylist = await searchPlaylists(topic);
    if (youtubePlaylist) {
      return youtubePlaylist;
    }

    // If no YouTube playlist, scrape relevant content and generate a course
    const resources = await scrapeResources(topic);
    const courseOutline = await generateCourseOutline(topic, resources);
    
    // Create videos from the outline
    const videos: Video[] = courseOutline.sections.map((section, index) => ({
      id: `generated-${index}`,
      title: section.title,
      description: section.content,
      thumbnail: `https://source.unsplash.com/800x600/?${encodeURIComponent(section.title)}`,
      transcript: section.content,
      completed: false
    }));

    return {
      id: `generated-${Date.now()}`,
      title: `Complete ${topic} Course`,
      description: courseOutline.description,
      thumbnail: `https://source.unsplash.com/1200x630/?${encodeURIComponent(topic)}`,
      videos,
      totalDuration: videos.length * 30 // Estimate 30 minutes per section
    };
  } catch (error) {
    console.error('Error generating course:', error);
    return null;
  }
}

async function scrapeResources(topic: string): Promise<string[]> {
  const resources: string[] = [];
  
  try {
    // Scrape from multiple sources
    const sources = [
      `https://www.geeksforgeeks.org/search/${encodeURIComponent(topic)}`,
      `https://www.tutorialspoint.com/search.php?search_string=${encodeURIComponent(topic)}`,
      `https://www.programiz.com/search/${encodeURIComponent(topic)}`
    ];

    const results = await Promise.all(
      sources.map(async (url) => {
        try {
          const { data } = await axios.get(url);
          const $ = cheerio.load(data);
          
          // Extract relevant text content
          const content: string[] = [];
          $('article, .tutorial-content, .content-wrapper').each((_, el) => {
            content.push($(el).text().trim());
          });
          
          return content;
        } catch (error) {
          console.warn(`Failed to scrape ${url}:`, error);
          return [];
        }
      })
    );

    resources.push(...results.flat());
  } catch (error) {
    console.error('Error scraping resources:', error);
  }

  return resources;
}