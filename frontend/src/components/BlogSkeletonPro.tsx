export const BlogSkeletonPro = () => {
  return (
    <div className="bg-profile-card border border-profile-border rounded-xl p-6 animate-pulse">
      <div className="mb-4">
        {/* Title skeleton */}
        <div className="h-6 bg-profile-hover rounded mb-3"></div>
        <div className="h-4 bg-profile-hover rounded w-3/4 mb-3"></div>
        
        {/* Preview skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-profile-hover rounded"></div>
          <div className="h-4 bg-profile-hover rounded"></div>
          <div className="h-4 bg-profile-hover rounded w-2/3"></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Date skeleton */}
        <div className="flex items-center gap-4">
          <div className="h-4 bg-profile-hover rounded w-20"></div>
          <div className="h-4 bg-profile-hover rounded w-16"></div>
        </div>

        {/* Button skeleton */}
        <div className="h-8 bg-profile-hover rounded w-24"></div>
      </div>
    </div>
  );
};