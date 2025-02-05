import React from 'react';
import { AlertTriangle, Volume2 } from 'lucide-react';

const NotificationBar = () => {
  return (
    <div className="bg-blue-600 text-white py-2 px-4   flex items-center">
      <div className="flex items-center mr-4">
        <AlertTriangle size={20} className="text-yellow-300 mr-2" />
        <span className="font-medium">Updates:</span>
      </div>
      
      <marquee 
        behavior="scroll" 
        direction="left" 
        className="flex-grow text-sm"
      >
        🎉 New Courses Added: Check out our latest programming and design programs! | 
        📚 Scholarship Alert: Apply now for our annual education grant! | 
        🌐 Career Fair Coming Soon: Connect with top employers on March 15th | 
        💻 Free Webinar: Career Guidance for 2024 Graduates
      </marquee>
      
      <button className="ml-4 hover:bg-blue-700 p-1 rounded">
        <Volume2 size={18} />
      </button>
    </div>
  );
};

export default NotificationBar;