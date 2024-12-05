import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Resource } from '../../../types';

interface Props {
  onSubmit: (resource: Resource) => void;
  onClose: () => void;
}

export default function ResourceSubmissionForm({ onSubmit, onClose }: Props) {
  const [resource, setResource] = useState({
    title: '',
    description: '',
    url: '',
    tags: [] as string[],
    currentTag: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resource.title && resource.url) {
      onSubmit({
        id: Date.now().toString(),
        title: resource.title,
        description: resource.description,
        url: resource.url,
        tags: resource.tags,
        author: 'Anonymous', // In a real app, this would come from auth
        upvotes: 0,
        dateAdded: new Date()
      });
    }
  };

  const addTag = () => {
    if (resource.currentTag && !resource.tags.includes(resource.currentTag)) {
      setResource({
        ...resource,
        tags: [...resource.tags, resource.currentTag],
        currentTag: ''
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold dark:text-white">Share a Resource</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={resource.title}
              onChange={(e) => setResource({ ...resource, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              placeholder="Resource title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={resource.description}
              onChange={(e) => setResource({ ...resource, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              rows={3}
              placeholder="Brief description of the resource"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="url"
              value={resource.url}
              onChange={(e) => setResource({ ...resource, url: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={resource.currentTag}
                onChange={(e) => setResource({ ...resource, currentTag: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                placeholder="Add tags"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Share Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}