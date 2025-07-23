import { Users, GitFork, Star } from 'lucide-react';

interface ProfileHeaderProps {
  user: {
    avatar_url: string;
    name: string;
    login: string;
    bio?: string;
    public_repos: number;
    followers: number;
    following: number;
  };
  isOwner?: boolean;
}

export const GithubProfileHeader = ({ user, isOwner = false }: ProfileHeaderProps) => {
  return (
    <div className="bg-profile-card border border-profile-border rounded-xl p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={user.avatar_url}
            alt={`${user.name || user.login}'s avatar`}
            className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover ring-2 ring-profile-border"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-profile-text-primary mb-2">
              {user.name || user.login}
            </h1>
            <p className="text-lg text-profile-text-secondary">@{user.login}</p>
          </div>

          {user.bio && (
            <p className="text-profile-text-secondary mb-6 leading-relaxed">
              {user.bio}
            </p>
          )}

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-profile-hover rounded-lg transition-colors">
              <Users className="w-4 h-4 text-profile-accent" />
              <span className="text-sm text-profile-text-secondary">
                <span className="font-semibold text-profile-text-primary">{user.followers}</span> followers
              </span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-2 bg-profile-hover rounded-lg transition-colors">
              <GitFork className="w-4 h-4 text-profile-accent" />
              <span className="text-sm text-profile-text-secondary">
                <span className="font-semibold text-profile-text-primary">{user.following}</span> following
              </span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-2 bg-profile-hover rounded-lg transition-colors">
              <Star className="w-4 h-4 text-profile-accent" />
              <span className="text-sm text-profile-text-secondary">
                <span className="font-semibold text-profile-text-primary">{user.public_repos}</span> repos
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};