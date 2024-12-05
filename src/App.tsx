import { React, useState } from 'react';
import { Technology, Course, UserPreferences } from './types';
import { technologies } from './data/technologies';
import TechnologyCard from './components/TechnologyCard';
import CourseViewer from './components/CourseViewer';
import SearchBar from './components/SearchBar';
import PreferencesModal from './components/PreferencesModal';
import Header from './components/Header';
import WelcomeCard from './components/WelcomeCard';
import ResourceLibrary from './features/resources/ResourceLibrary';
import ReflectionJournal from './features/reflection/ReflectionJournal';
import FocusTimer from './features/gamification/components/FocusTimer';
import { useTheme } from './context/ThemeContext';
import { useCourseGeneration } from './hooks/useCourseGeneration';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const { darkMode } = useTheme();
  const [course, setCourse] = useState<Course | null>(null);
  const { generateCourseContent, isGenerating, error } = useCourseGeneration();
  const [showPreferences, setShowPreferences] = useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'resources' | 'reflect' | 'focus'>('learn');
  const [preferences, setPreferences] = useState<UserPreferences>({
    weeklyHours: 5,
    darkMode,
    difficulty: 'beginner',
    interests: [],
    learningGoals: []
  });

  const handleSearch = async (query: string) => {
    const generatedCourse = await generateCourseContent(query);
    if (generatedCourse) {
      setCourse(generatedCourse);
    }
  };

  const handleBack = () => {
    setCourse(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {course ? (
          <CourseViewer course={course} preferences={preferences} onBack={handleBack} />
        ) : (
          <>
            <div className="mb-8">
              <div className="flex gap-4 border-b dark:border-gray-700">
                <button
                  onClick={() => setActiveTab('learn')}
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'learn'
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Learn
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'resources'
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Resources
                </button>
                <button
                  onClick={() => setActiveTab('reflect')}
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'reflect'
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Reflect
                </button>
                <button
                  onClick={() => setActiveTab('focus')}
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'focus'
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Focus
                </button>
              </div>
            </div>

            {activeTab === 'learn' && (
              <>
                <WelcomeCard />
                <div className="mb-12">
                  <SearchBar onSearch={handleSearch} isLoading={isGenerating} />
                  {error && (
                    <div className="mt-4 text-center text-red-500 dark:text-red-400">
                      {error}
                    </div>
                  )}
                  {isGenerating && (
                    <div className="mt-8 text-center">
                      <LoadingSpinner />
                      <p className="mt-4 text-gray-600 dark:text-gray-400">
                        Generating your course content...
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {technologies.map((tech) => (
                    <TechnologyCard
                      key={tech.id}
                      technology={tech}
                      onSelect={() => handleSearch(tech.name)}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === 'resources' && <ResourceLibrary />}
            {activeTab === 'reflect' && <ReflectionJournal />}
            {activeTab === 'focus' && <FocusTimer />}
          </>
        )}
      </main>

      {showPreferences && (
        <PreferencesModal
          preferences={preferences}
          onSave={setPreferences}
          onClose={() => setShowPreferences(false)}
        />
      )}
    </div>
  );
}

export default App;