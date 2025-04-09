import { useLanguage } from '../../context/LanguageContext';

const Blog = () => {
  const { t } = useLanguage();
  
  const blogPosts = [
    {
      id: 1,
      title: t('blog.post.1.title'),
      excerpt: t('blog.post.1.excerpt'),
      category: t('blog.post.1.category'),
      date: t('blog.post.1.date'),
      readTime: t('blog.post.1.readTime'),
      image: "/blog/habits.jpg"
    },
    {
      id: 2,
      title: t('blog.post.2.title'),
      excerpt: t('blog.post.2.excerpt'),
      category: t('blog.post.2.category'),
      date: t('blog.post.2.date'),
      readTime: t('blog.post.2.readTime'),
      image: "/blog/nutrition.jpg"
    },
    {
      id: 3,
      title: t('blog.post.3.title'),
      excerpt: t('blog.post.3.excerpt'),
      category: t('blog.post.3.category'),
      date: t('blog.post.3.date'),
      readTime: t('blog.post.3.readTime'),
      image: "/blog/mindset.jpg"
    }
  ];

  const resources = [
    {
      id: 1,
      title: t('blog.resource.1.title'),
      description: t('blog.resource.1.description'),
      type: t('blog.resource.1.type'),
      downloadUrl: "#"
    },
    {
      id: 2,
      title: t('blog.resource.2.title'),
      description: t('blog.resource.2.description'),
      type: t('blog.resource.2.type'),
      downloadUrl: "#"
    },
    {
      id: 3,
      title: t('blog.resource.3.title'),
      description: t('blog.resource.3.description'),
      type: t('blog.resource.3.type'),
      downloadUrl: "#"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">{t('blog.title')}</h2>
        <p className="text-gray-400 text-center mb-12">{t('blog.subtitle')}</p>

        {/* Blog Posts */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-white mb-8">{t('blog.articles')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <span>{post.category}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">{post.title}</h4>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <a
                    href="#"
                    className="text-primary hover:text-red-400 transition-colors duration-300"
                  >
                    {t('blog.readmore')}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-8">{t('blog.resources')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="bg-gray-800 rounded-lg p-6 flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="ml-2 text-sm text-gray-400">{resource.type}</span>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{resource.title}</h4>
                <p className="text-gray-400 mb-4 flex-grow">{resource.description}</p>
                <a
                  href={resource.downloadUrl}
                  className="inline-flex items-center text-primary hover:text-red-400 transition-colors duration-300"
                >
                  {t('blog.download')}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog; 