import { useState } from 'react';
import { Tool, User } from '../types';
import { addFavorite, removeFavorite } from '../api/tools';

interface ToolCardProps {
  tool: Tool;
  user: User | null;
  isFavorite: boolean;
  onFavoriteChange: (toolId: string, isFavorite: boolean) => void;
}

const ToolCard = ({ tool, user, isFavorite, onFavoriteChange }: ToolCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) return;

    if (!tool.id || tool.id === 'undefined') {
      console.error('收藏失败：工具ID无效', tool);
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorite) {
        console.log('取消收藏工具:', tool.id);
        await removeFavorite(tool.id);
        onFavoriteChange(tool.id, false);
      } else {
        console.log('添加收藏工具:', tool.id);
        await addFavorite(tool.id);
        onFavoriteChange(tool.id, true);
      }
    } catch (error) {
      console.error('收藏操作失败', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    window.open(tool.url, '_blank');
  };

  return (
    <div
      className={`card flex items-start p-4 cursor-pointer ${
        isHovered ? 'transform scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="flex-shrink-0 mr-4">
        <div className="w-12 h-12 flex items-center justify-center bg-primary-100 rounded-lg">
          <img
            src={tool.icon}
            alt={tool.title}
            className="w-8 h-8 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-icon.svg';
            }}
          />
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">{tool.title}</h3>
          {user && (
            <button
              onClick={handleFavoriteClick}
              disabled={isLoading}
              className="ml-2 text-gray-400 hover:text-yellow-500 focus:outline-none transition-colors"
            >
              {isLoading ? (
                <span className="animate-spin">⟳</span>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${isFavorite ? 'text-yellow-500 fill-current' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-600">{tool.description}</p>
        <div className="mt-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
            {tool.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ToolCard; 