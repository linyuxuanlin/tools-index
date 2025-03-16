import { useState, useEffect } from 'react';
import { Tool, User } from '../types';
import ToolCard from '../components/ToolCard';
import { getTools, getFavorites } from '../api/tools';

interface HomePageProps {
  user: User | null;
}

const HomePage = ({ user }: HomePageProps) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [favorites, setFavorites] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const toolsData = await getTools();
        setTools(toolsData);

        if (user) {
          const favoritesData = await getFavorites();
          setFavorites(favoritesData);
        }
      } catch (err) {
        setError('获取数据失败，请稍后再试');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleFavoriteChange = (toolId: string, isFavorite: boolean) => {
    if (isFavorite) {
      const tool = tools.find((t) => t.id === toolId);
      if (tool && !favorites.some((f) => f.id === toolId)) {
        setFavorites([...favorites, tool]);
      }
    } else {
      setFavorites(favorites.filter((f) => f.id !== toolId));
    }
  };

  const isFavorite = (toolId: string) => {
    return user ? favorites.some((f) => f.id === toolId) : false;
  };

  // 获取所有分类
  const categories = [...new Set(tools.map((tool) => tool.category))];

  // 过滤工具
  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? tool.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // 分离收藏的工具和其他工具
  const favoriteTools = filteredTools.filter((tool) => isFavorite(tool.id));
  const otherTools = filteredTools.filter((tool) => !isFavorite(tool.id));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">工具导航</h1>
        <p className="text-gray-600">发现和收藏实用的在线工具，提高工作效率</p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="搜索工具..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">所有分类</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
      ) : (
        <div>
          {user && favoriteTools.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">我的收藏</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    user={user}
                    isFavorite={true}
                    onFavoriteChange={handleFavoriteChange}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">所有工具</h2>
            {otherTools.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                没有找到匹配的工具
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    user={user}
                    isFavorite={false}
                    onFavoriteChange={handleFavoriteChange}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage; 