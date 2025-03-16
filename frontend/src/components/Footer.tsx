const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-6 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {currentYear} 工具导航. 保留所有权利.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              关于我们
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              联系我们
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              隐私政策
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 