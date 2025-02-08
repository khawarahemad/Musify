import React from "react";

const BrowsePodcastsView = ({ closeFullscreen }) => {
  return (
    <div className="browsPodCas w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Browse Podcasts</h1>
      <p className="mb-4">Discover new podcasts to follow:</p>
      <div className="w-full bg-[#242424] p-4 rounded-lg mb-4">
        <p className="text-gray-400">Podcast suggestions will appear here.</p>
      </div>
      
    </div>
  );
};

export default BrowsePodcastsView;