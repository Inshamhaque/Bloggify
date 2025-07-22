import { Calendar, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    preview: string;
    createdAt: string;
    readTime?: string;
  };
  onReadMore: (id: string) => void;
}

export const BlogCardPro = ({ blog, onReadMore }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="group bg-profile-card border border-profile-border rounded-xl p-6 hover:border-profile-accent/30 hover:shadow-lg hover:shadow-profile-shadow/20 transition-all duration-300 hover:-translate-y-1 animate-scale-in">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-profile-text-primary mb-3 group-hover:text-profile-accent transition-colors line-clamp-2">
          {blog.title}
        </h3>
        
        <p className="text-profile-text-secondary leading-relaxed mb-4 line-clamp-3">
          {blog.preview}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-profile-text-muted">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          {blog.readTime && (
            <span>{blog.readTime} read</span>
          )}
        </div>

        <button
          onClick={() => onReadMore(blog.id)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-profile-accent hover:text-profile-accent-hover hover:bg-profile-hover rounded-lg transition-all duration-200 group-hover:translate-x-1"
        >
          Read More
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};