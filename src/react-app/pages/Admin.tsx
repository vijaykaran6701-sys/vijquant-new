import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@getmocha/users-service/react';
import { 
  LogOut, 
  Mail, 
  FolderOpen, 
  FileText, 
  MessageSquare,
  BarChart3,
  Menu,
  X
} from 'lucide-react';
import InquiriesManager from '../components/admin/InquiriesManager';
import PortfolioManager from '../components/admin/PortfolioManager';
import BlogManager from '../components/admin/BlogManager';
import TestimonialsManager from '../components/admin/TestimonialsManager';

type Tab = 'dashboard' | 'inquiries' | 'portfolio' | 'blog' | 'testimonials';

export default function Admin() {
  const { user, logout, isPending } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    inquiries: 0,
    portfolio: 0,
    blog: 0,
    testimonials: 0
  });

  useEffect(() => {
    if (!isPending && !user) {
      navigate('/admin/login');
    }
  }, [user, isPending, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [inquiries, portfolio, blog, testimonials] = await Promise.all([
          fetch('/api/inquiries').then(r => r.json()),
          fetch('/api/portfolio').then(r => r.json()),
          fetch('/api/blog').then(r => r.json()),
          fetch('/api/testimonials').then(r => r.json())
        ]);
        
        setStats({
          inquiries: inquiries.length || 0,
          portfolio: portfolio.length || 0,
          blog: blog.length || 0,
          testimonials: testimonials.length || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: BarChart3 },
    { id: 'inquiries' as Tab, label: 'Inquiries', icon: Mail, count: stats.inquiries },
    { id: 'portfolio' as Tab, label: 'Portfolio', icon: FolderOpen, count: stats.portfolio },
    { id: 'blog' as Tab, label: 'Blog', icon: FileText, count: stats.blog },
    { id: 'testimonials' as Tab, label: 'Testimonials', icon: MessageSquare, count: stats.testimonials }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <div>
                  <div className="text-gray-900 font-bold">VijQuant Admin</div>
                  <div className="text-xs text-gray-500">Management Portal</div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg">
                <img 
                  src={user.google_user_data.picture || ''} 
                  alt={user.google_user_data.name || 'User'}
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{user.google_user_data.name}</div>
                  <div className="text-gray-500">{user.email}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <tab.icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen sticky top-16">
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <tab.icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <Mail className="text-blue-600" size={24} />
                    <span className="text-2xl font-bold text-gray-900">{stats.inquiries}</span>
                  </div>
                  <div className="text-gray-600 font-medium">Inquiries</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <FolderOpen className="text-purple-600" size={24} />
                    <span className="text-2xl font-bold text-gray-900">{stats.portfolio}</span>
                  </div>
                  <div className="text-gray-600 font-medium">Portfolio Items</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <FileText className="text-green-600" size={24} />
                    <span className="text-2xl font-bold text-gray-900">{stats.blog}</span>
                  </div>
                  <div className="text-gray-600 font-medium">Blog Posts</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <MessageSquare className="text-orange-600" size={24} />
                    <span className="text-2xl font-bold text-gray-900">{stats.testimonials}</span>
                  </div>
                  <div className="text-gray-600 font-medium">Testimonials</div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'inquiries' && <InquiriesManager />}
          {activeTab === 'portfolio' && <PortfolioManager />}
          {activeTab === 'blog' && <BlogManager />}
          {activeTab === 'testimonials' && <TestimonialsManager />}
        </main>
      </div>
    </div>
  );
}
