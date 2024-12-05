import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { Course, Video, UserPreferences } from '../types';
import { CheckCircle, Circle, ArrowLeft, BookOpen, BrainCircuit, MessageSquare, Users, Bot } from 'lucide-react';
import WeeklyPlanner from './WeeklyPlanner';
import WeeklyProgress from '../features/weekly-commitment/WeeklyProgress';
import FlashCardDeck from '../features/flashcards/FlashCardDeck';
import QuizGenerator from '../features/quiz/QuizGenerator';
import AIChatPanel from '../features/ai-chat/AIChatPanel';
import FocusMode from '../features/focus-mode/FocusMode';
import DiscussionBoard from '../features/community/DiscussionBoard';
import StudyGroup from '../features/community/StudyGroup';

interface Props {
  course: Course;
  preferences: UserPreferences;
  onBack: () => void;
}

export default function CourseViewer({ course, preferences, onBack }: Props) {
  const [currentVideo, setCurrentVideo] = useState<Video>(course.videos[0]);
  const [completedVideos, setCompletedVideos] = useState<Set<string>>(new Set());
  const [showAiChat, setShowAiChat] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'flashcards' | 'quiz' | 'discussion' | 'study' | 'ai'>('video');

  // Rest of the component remains the same until the tabs section

  const tabs = [
    { id: 'video', label: 'Video', icon: BookOpen },
    { id: 'flashcards', label: 'Flashcards', icon: BrainCircuit },
    { id: 'quiz', label: 'Quiz', icon: MessageSquare },
    { id: 'discussion', label: 'Discussion', icon: Users },
    { id: 'study', label: 'Study Groups', icon: Users },
    { id: 'ai', label: 'AI Help', icon: Bot }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <FocusMode>
        <button
          onClick={onBack}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Search
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex gap-4 border-b dark:border-gray-700 overflow-x-auto">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as typeof activeTab)}
                  className={`px-4 py-2 font-medium whitespace-nowrap flex items-center gap-2 ${
                    activeTab === id
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {activeTab === 'video' && (
              <>
                <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                  <YouTube
                    videoId={currentVideo.id}
                    className="w-full h-full"
                    opts={{
                      width: '100%',
                      height: '100%',
                      playerVars: {
                        autoplay: 1,
                        modestbranding: 1,
                        rel: 0,
                      },
                    }}
                    onEnd={() => {
                      const newCompleted = new Set(completedVideos);
                      newCompleted.add(currentVideo.id);
                      setCompletedVideos(newCompleted);
                    }}
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-bold mb-2 dark:text-white">
                    {currentVideo.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentVideo.description}
                  </p>
                </div>
              </>
            )}

            {activeTab === 'flashcards' && (
              <FlashCardDeck content={currentVideo.transcript || ''} />
            )}

            {activeTab === 'quiz' && (
              <QuizGenerator content={currentVideo.transcript || ''} />
            )}

            {activeTab === 'discussion' && (
              <DiscussionBoard
                courseId={course.id}
                videoId={currentVideo.id}
              />
            )}

            {activeTab === 'study' && (
              <StudyGroup
                courseId={course.id}
                videoId={currentVideo.id}
              />
            )}

            {activeTab === 'ai' && (
              <AIChatPanel videoId={currentVideo.id} />
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 dark:text-white">Course Content</h2>
              <div className="space-y-4">
                {course.videos.map((video) => (
                  <div
                    key={video.id}
                    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      currentVideo.id === video.id
                        ? 'bg-blue-50 dark:bg-blue-900'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setCurrentVideo(video)}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const newCompleted = new Set(completedVideos);
                        if (newCompleted.has(video.id)) {
                          newCompleted.delete(video.id);
                        } else {
                          newCompleted.add(video.id);
                        }
                        setCompletedVideos(newCompleted);
                      }}
                    >
                      {completedVideos.has(video.id) ? (
                        <CheckCircle className="text-green-500 w-5 h-5" />
                      ) : (
                        <Circle className="text-gray-400 w-5 h-5" />
                      )}
                    </button>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {video.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <WeeklyProgress
              targetHours={preferences.weeklyHours}
              completedHours={Math.round(
                (completedVideos.size * course.totalDuration) /
                  (60 * course.videos.length)
              )}
              weekNumber={1}
            />
          </div>
        </div>
      </FocusMode>
    </div>
  );
}