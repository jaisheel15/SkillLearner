import React, { useState, useEffect } from 'react';
import { Users, Video, MessageCircle } from 'lucide-react';

interface StudySession {
  id: string;
  title: string;
  participants: string[];
  startTime: Date;
  videoId: string;
}

interface Props {
  courseId: string;
  videoId: string;
}

export default function StudyGroup({ courseId, videoId }: Props) {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    startTime: new Date().toISOString().slice(0, 16),
  });

  useEffect(() => {
    const savedSessions = localStorage.getItem(`study-sessions-${courseId}`);
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, [courseId]);

  const handleCreateSession = () => {
    if (!newSession.title) return;

    const session: StudySession = {
      id: Date.now().toString(),
      title: newSession.title,
      participants: ['user-1'], // In a real app, this would be the current user
      startTime: new Date(newSession.startTime),
      videoId,
    };

    const updatedSessions = [session, ...sessions];
    localStorage.setItem(
      `study-sessions-${courseId}`,
      JSON.stringify(updatedSessions)
    );
    setSessions(updatedSessions);
    setShowCreateSession(false);
    setNewSession({ title: '', startTime: new Date().toISOString().slice(0, 16) });
  };

  const joinSession = (sessionId: string) => {
    const updatedSessions = sessions.map(session => {
      if (session.id === sessionId && !session.participants.includes('user-1')) {
        return {
          ...session,
          participants: [...session.participants, 'user-1'],
        };
      }
      return session;
    });
    setSessions(updatedSessions);
    localStorage.setItem(
      `study-sessions-${courseId}`,
      JSON.stringify(updatedSessions)
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold dark:text-white">Study Groups</h3>
        </div>
        <button
          onClick={() => setShowCreateSession(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Create Session
        </button>
      </div>

      {showCreateSession && (
        <div className="mb-6 p-4 border rounded-lg dark:border-gray-700">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Session Title
              </label>
              <input
                type="text"
                value={newSession.title}
                onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter session title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Time
              </label>
              <input
                type="datetime-local"
                value={newSession.startTime}
                onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCreateSession(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSession}
                disabled={!newSession.title}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium dark:text-white">{session.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(session.startTime).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  {session.participants.length}
                </span>
                {!session.participants.includes('user-1') && (
                  <button
                    onClick={() => joinSession(session.id)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Join
                  </button>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">
                <Video className="w-4 h-4" />
                Join Video
              </button>
              <button className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">
                <MessageCircle className="w-4 h-4" />
                Chat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}