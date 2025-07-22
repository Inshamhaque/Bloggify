import GitHubNavbar from "../components/Navbar";
import { useState } from 'react';
import { ProfilePage } from '../components/ProfilePage';
import { Eye, User, RotateCcw } from 'lucide-react';

export default function Profile(){
    const [viewMode, setViewMode] = useState<'owner' | 'visitor' | 'loading'>('owner');

    const handleViewModeChange = (mode: 'owner' | 'visitor' | 'loading') => {
        setViewMode(mode);
    };
    return (
        <div>
            <GitHubNavbar />
            <div>
                <div className="min-h-screen bg-black text-white">
                {/* View Mode Switcher */}
                    <div className="bg-profile-card border-b border-profile-border sticky top-0 z-50">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            {/* <div className="flex items-center justify-between py-4">
                                <div>
                                    <h1 className="text-xl font-bold text-profile-text-primary">Developer Profile Demo</h1>
                                    <p className="text-sm text-profile-text-secondary">Modern blogging platform UI</p>
                                </div>
                                
                                <div className="flex items-center gap-2 bg-profile-hover rounded-lg p-1">
                                <button
                                    onClick={() => handleViewModeChange('owner')}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    viewMode === 'owner' 
                                        ? 'bg-profile-accent text-profile-accent-foreground' 
                                        : 'text-profile-text-secondary hover:text-profile-text-primary'
                                    }`}
                                >
                                    <User className="w-4 h-4" />
                                    Owner View
                                </button>
                                
                                <button
                                    onClick={() => handleViewModeChange('visitor')}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    viewMode === 'visitor' 
                                        ? 'bg-profile-accent text-profile-accent-foreground' 
                                        : 'text-profile-text-secondary hover:text-profile-text-primary'
                                    }`}
                                >
                                    <Eye className="w-4 h-4" />
                                    Visitor View
                                </button>
                                
                                <button
                                    onClick={() => handleViewModeChange('loading')}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    viewMode === 'loading' 
                                        ? 'bg-profile-accent text-profile-accent-foreground' 
                                        : 'text-profile-text-secondary hover:text-profile-text-primary'
                                    }`}
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Loading State
                                </button>
                                </div>
                            </div> */}
                        </div>
                    </div>

                {/* Profile Content */}
                <ProfilePage 
                    isOwner={viewMode === 'owner'} 
                    isLoading={viewMode === 'loading'}
                />
                </div>
            </div>
        </div>
    )
}

