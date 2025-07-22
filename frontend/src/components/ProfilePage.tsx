import { useState } from 'react';
import { BlogSection } from './BlogSection';
import { IntegrationSection } from './IntegrationSection';

// Mock data types
interface User {
  avatar_url: string;
  name: string;
  login: string;
  bio?: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface Blog {
  id: string;
  title: string;
  preview: string;
  createdAt: string;
  readTime?: string;
}

interface Integration {
  platform: 'medium' | 'hashnode';
  connected: boolean;
}

interface ProfilePageProps {
  isOwner?: boolean;
  isLoading?: boolean;
}

export const ProfilePage = ({ isOwner = false, isLoading = false }: ProfilePageProps) => {
  // Mock user data
  const [user] = useState<User>({
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    name: "Alex Developer",
    login: "alexdev",
    bio: "Full-stack developer passionate about React, TypeScript, and building great user experiences. Open source contributor and tech blogger.",
    public_repos: 42,
    followers: 1337,
    following: 234
  });

  // Mock blogs data
  const [blogs] = useState<Blog[]>([
    {
      id: "1",
      title: "Building Modern React Applications with TypeScript",
      preview: "In this comprehensive guide, we'll explore the best practices for building scalable React applications using TypeScript. We'll cover type safety, component patterns, and performance optimization techniques...",
      createdAt: "2024-01-15",
      readTime: "8 min"
    },
    {
      id: "2", 
      title: "The Future of Web Development: What's Coming in 2024",
      preview: "As we dive into 2024, the web development landscape continues to evolve rapidly. From new frameworks to improved tooling, let's explore what developers should be excited about...",
      createdAt: "2024-01-10",
      readTime: "6 min"
    },
    {
      id: "3",
      title: "Mastering CSS Grid: A Visual Guide",
      preview: "CSS Grid has revolutionized how we approach layout design. In this visual guide, we'll break down complex grid concepts with practical examples and real-world use cases...",
      createdAt: "2024-01-05",
      readTime: "12 min"
    },
    {
      id: "4",
      title: "API Design Best Practices for Modern Applications",
      preview: "Designing robust APIs is crucial for scalable applications. Learn about REST principles, GraphQL benefits, error handling, and documentation strategies...",
      createdAt: "2023-12-28",
      readTime: "10 min"
    },
    {
      id: "5",
      title: "Performance Optimization Techniques for React Apps",
      preview: "Slow React apps can hurt user experience. Discover proven techniques for optimizing performance including code splitting, memoization, and bundle analysis...",
      createdAt: "2023-12-20",
      readTime: "7 min"
    }
  ]);

  // Mock integrations data
  const [integrations, setIntegrations] = useState<Integration[]>([
    { platform: 'medium', connected: false },
    { platform: 'hashnode', connected: true }
  ]);

  const handleReadMore = (blogId: string) => {
    console.log('Reading blog:', blogId);
    // Navigate to blog post
  };

  const handleCreateNew = () => {
    console.log('Creating new blog post');
    // Navigate to create post
  };

  const handleConnect = (platform: 'medium' | 'hashnode') => {
    console.log('Connecting to:', platform);
    setIntegrations(prev => 
      prev.map(integration => 
        integration.platform === platform 
          ? { ...integration, connected: true }
          : integration
      )
    );
  };

  return (
    <div className="min-h-screen bg-profile-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          {/* Profile Header */}
          {/* <ProfileHeader user={user} isOwner={isOwner} /> */}

          {/* Blog Section */}
          <BlogSection 
            blogs={blogs}
            isLoading={isLoading}
            isOwner={isOwner}
            onReadMore={handleReadMore}
            onCreateNew={handleCreateNew}
          />

          {/* Integration Section - Only show for owner */}
          {isOwner && (
            <IntegrationSection 
              integrations={integrations}
              onConnect={handleConnect}
            />
          )}
        </div>
      </div>
    </div>
  );
};