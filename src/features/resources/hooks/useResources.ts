import { create } from 'zustand';
import { Resource } from '../../../types';

interface ResourceStore {
  resources: Resource[];
  addResource: (resource: Resource) => void;
  upvoteResource: (id: string) => void;
}

export const useResources = create<ResourceStore>((set) => ({
  resources: [],
  addResource: (resource) => 
    set((state) => ({ resources: [resource, ...state.resources] })),
  upvoteResource: (id) => 
    set((state) => ({
      resources: state.resources.map((resource) =>
        resource.id === id
          ? { ...resource, upvotes: resource.upvotes + 1 }
          : resource
      ),
    })),
}));