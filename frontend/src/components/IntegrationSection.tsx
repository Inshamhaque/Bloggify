import { Link, Hash, Check, HelpCircle } from 'lucide-react';

interface Integration {
  platform: 'medium' | 'hashnode';
  connected: boolean;
}

interface IntegrationSectionProps {
  integrations: Integration[];
  onConnect: (platform: 'medium' | 'hashnode') => void;
}

export const IntegrationSection = ({ integrations, onConnect }: IntegrationSectionProps) => {
  const getPlatformInfo = (platform: 'medium' | 'hashnode') => {
    switch (platform) {
      case 'medium':
        return {
          name: 'Medium',
          icon: <Link className="w-5 h-5" />,
          tooltip: 'Link your Medium account to import blogs',
          color: 'text-green-400'
        };
      case 'hashnode':
        return {
          name: 'Hashnode',
          icon: <Hash className="w-5 h-5" />,
          tooltip: 'Connect Hashnode to sync your posts',
          color: 'text-blue-400'
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold text-profile-text-primary">Connect your writing platforms</h2>
        <div className="group relative">
          <HelpCircle className="w-5 h-5 text-profile-text-muted hover:text-profile-text-secondary transition-colors cursor-help" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-profile-hover border border-profile-border rounded-lg text-sm text-profile-text-secondary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            Import and sync your existing blog posts
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {integrations.map((integration) => {
          const platformInfo = getPlatformInfo(integration.platform);
          
          return (
            <div key={integration.platform} className="group relative">
              <button
                onClick={() => onConnect(integration.platform)}
                disabled={integration.connected}
                className={`
                  w-full flex items-center gap-3 p-4 border rounded-xl transition-all duration-200
                  ${integration.connected
                    ? 'bg-profile-hover border-profile-accent/30 cursor-default'
                    : 'bg-profile-card border-profile-border hover:border-profile-accent/50 hover:bg-profile-hover'
                  }
                `}
              >
                <div className={`${platformInfo.color}`}>
                  {integration.connected ? (
                    <Check className="w-5 h-5 text-profile-accent" />
                  ) : (
                    platformInfo.icon
                  )}
                </div>
                
                <div className="flex-1 text-left">
                  <div className="font-medium text-profile-text-primary">
                    {integration.connected ? `${platformInfo.name} Connected` : `Connect ${platformInfo.name}`}
                  </div>
                  <div className="text-sm text-profile-text-secondary">
                    {integration.connected 
                      ? 'Your posts are being synced'
                      : 'Import your existing blog posts'
                    }
                  </div>
                </div>

                {!integration.connected && (
                  <div className="text-profile-accent group-hover:translate-x-1 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </button>

              {/* Tooltip */}
              {!integration.connected && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 bg-profile-hover border border-profile-border rounded-lg text-sm text-profile-text-secondary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {platformInfo.tooltip}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};