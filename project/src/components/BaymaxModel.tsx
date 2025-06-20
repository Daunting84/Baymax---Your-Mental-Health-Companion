import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const BaymaxModel: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Baymax is here for you</h3>
        
        {/* Placeholder for 3D Model - Replace with Spline embed */}
        <div className="relative w-full h-64 bg-gradient-to-br from-red-50 to-blue-50 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-gray-200">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <p className="text-gray-600 text-sm mb-2">3D Baymax Model</p>
            <p className="text-xs text-gray-500">
              Replace this div with Spline 3D model iframe
            </p>
          </div>
        </div>

        {/* Baymax Status */}
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Ready to help</span>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-sm">
              "I am Baymax, your personal healthcare companion. I will always do my best to take care of you."
            </p>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-4 text-left">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Today's Wellness Tip</h4>
          <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
            Taking just 5 minutes for deep breathing can significantly reduce stress and improve your mood. Try it now!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BaymaxModel;