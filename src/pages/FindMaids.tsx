import React from 'react';

const FindMaids: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">Find Maids Near You</h2>
      <div className="bg-blue-50 border border-blue-200 rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <span className="text-5xl mb-4">🧹</span>
        <p className="text-lg sm:text-xl text-gray-700 font-medium mb-2">Coming Soon!</p>
        <p className="text-sm text-gray-500">We are working hard to bring you this feature. Soon you will be able to find trusted maids near your location.</p>
      </div>
    </div>
  );
};

export default FindMaids;
