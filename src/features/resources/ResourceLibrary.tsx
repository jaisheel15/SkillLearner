import React, { useState } from 'react';
import { Search, BookOpen, ThumbsUp, Share2 } from 'lucide-react';
import ResourceCard from './components/ResourceCard';
import ResourceSubmissionForm from './components/ResourceSubmissionForm';
import { useResources } from './hooks/useResources';
import { Resource } from '../../types';

export default function ResourceLibrary() {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { resources, addResource, upvoteResource } = useResources();

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Learning Resources</h2>
        </div>
        <button
          onClick={() => setShowSubmissionForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Share Resource
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search resources by title, description, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onUpvote={() => upvoteResource(resource.id)}
          />
        ))}
      </div>

      {showSubmissionForm && (
        <ResourceSubmissionForm
          onSubmit={(resource: Resource) => {
            addResource(resource);
            setShowSubmissionForm(false);
          }}
          onClose={() => setShowSubmissionForm(false)}
        />
      )}
    </div>
  );
}