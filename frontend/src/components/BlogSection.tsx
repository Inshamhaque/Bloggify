import { FileText, Plus } from 'lucide-react';
import { BlogCardPro } from './BlogCardPro';
import { BlogSkeletonPro } from './BlogSkeletonPro';

interface Blog {
  id: string;
  title: string;
  subtitle: string;
  createdAt: string;
  readTime?: string;
}

interface BlogSectionProps {
  blogs: Blog[];
  isLoading?: boolean;
  isOwner?: boolean;
  onReadMore: (id: string) => void;
  onCreateNew?: () => void;
}

export const BlogSection = ({ 
  blogs, 
  isLoading = false, 
  isOwner = false, 
  onReadMore, 
  onCreateNew 
}: BlogSectionProps) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-profile-text-primary">Blog Posts</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <BlogSkeletonPro key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-profile-text-primary">Blog Posts</h2>
        {isOwner && (
          <button
            onClick={onCreateNew}
            className="flex items-center gap-2 px-4 py-2 bg-profile-accent text-profile-accent-foreground rounded-lg hover:bg-profile-accent-hover transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            New Post
          </button>
        )}
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-profile-hover rounded-full mb-4">
            <FileText className="w-8 h-8 text-profile-text-muted" />
          </div>
          <h3 className="text-xl font-semibold text-profile-text-primary mb-2">
            {isOwner ? "Start writing your first blog post" : "No blogs published yet"}
          </h3>
          <p className="text-profile-text-secondary max-w-md mx-auto">
            {isOwner 
              ? "Share your thoughts, experiences, and insights with the developer community."
              : "This user hasn't published any blog posts yet. Check back later!"
            }
          </p>
          {isOwner && (
            <button
              onClick={onCreateNew}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-profile-accent text-profile-accent-foreground rounded-lg hover:bg-profile-accent-hover transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Create Your First Post
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCardPro 
              key={blog.id} 
              blog={blog} 
              onReadMore={onReadMore}
            />
          ))}
        </div>
      )}
    </div>
  );
};