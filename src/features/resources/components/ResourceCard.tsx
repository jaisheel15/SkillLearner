import React from 'react';
import { ThumbsUp, ExternalLink, Tag } from 'lucide-react';
import { Resource } from '../../../types';

interface Props {
  resource: Resource;
  onUpvote: () => void;
}

export default function ResourceCard({ resource, onUpvote }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-transform hover:scale-105">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold dark:text-white">{resource.title}</h3>
        <button
          onClick={onUpvote}
          className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{resource.upvotes}</span>
        </button>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4">{resource.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 text-sm rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Shared by {resource.author}
        </div>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
        >
          <ExternalLink className="w-4 h-4" />
          View Resource
        </a>
      </div>
    </div>
  );
}