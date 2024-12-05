import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, ThumbsUp } from 'lucide-react';

interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: Comment[];
}

interface Props {
  courseId: string;
  videoId: string;
}

export default function DiscussionBoard({ courseId, videoId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const savedComments = localStorage.getItem(`comments-${courseId}-${videoId}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [courseId, videoId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      userId: 'user-1', // In a real app, this would come from auth
      username: 'Student', // In a real app, this would come from auth
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      replies: [],
    };

    const updatedComments = [comment, ...comments];
    localStorage.setItem(
      `comments-${courseId}-${videoId}`,
      JSON.stringify(updatedComments)
    );
    setComments(updatedComments);
    setNewComment('');
  };

  const handleLike = (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });
    setComments(updatedComments);
    localStorage.setItem(
      `comments-${courseId}-${videoId}`,
      JSON.stringify(updatedComments)
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold dark:text-white">Discussion Board</h3>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts or ask a question..."
            className="flex-1 px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-medium dark:text-white">{comment.username}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {new Date(comment.timestamp).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => handleLike(comment.id)}
                className="flex items-center gap-1 text-gray-500 hover:text-blue-500 dark:text-gray-400"
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{comment.likes}</span>
              </button>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}