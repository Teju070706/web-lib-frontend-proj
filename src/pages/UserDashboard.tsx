import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Download, Star, Filter, Grid3X3, List, Bookmark, BookmarkCheck, LogOut, User, Bell, ChevronDown, FileText, Video, Newspaper, Beaker, GraduationCap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { mockResources, subjects_list, gradeLevels_list } from '@/data/mockData';
import { Resource } from '@/types';
import { Link, useNavigate } from 'react-router-dom';
import ChatbotWidget from '@/components/ChatbotWidget';
import ThemeToggle from '@/components/ThemeToggle';
import ResourceDetailModal from '@/components/ResourceDetailModal';

const typeIcons: Record<string, React.ReactNode> = {
  textbook: <BookOpen className="w-4 h-4" />,
  research_paper: <FileText className="w-4 h-4" />,
  study_guide: <GraduationCap className="w-4 h-4" />,
  video: <Video className="w-4 h-4" />,
  article: <Newspaper className="w-4 h-4" />,
};

const typeLabels: Record<string, string> = {
  textbook: 'Textbook', research_paper: 'Research Paper', study_guide: 'Study Guide', video: 'Video', article: 'Article',
};

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [bookmarks, setBookmarks] = useState<string[]>(user?.bookmarks || []);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockResources.filter(r => {
    const matchesSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesSubject = subjectFilter === 'all' || r.subject === subjectFilter;
    const matchesType = typeFilter === 'all' || r.type === typeFilter;
    const matchesLevel = levelFilter === 'all' || r.gradeLevel === levelFilter;
    return matchesSearch && matchesSubject && matchesType && matchesLevel;
  });

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">EduVault</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
            </Button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary">
              <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium hidden sm:block">{user?.name || 'User'}</span>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0] || 'Learner'} 👋</h1>
          <p className="text-muted-foreground">Discover new resources and continue your learning journey.</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Bookmarked', value: bookmarks.length, icon: Bookmark, color: 'text-primary' },
            { label: 'Downloads', value: user?.downloadHistory?.length || 0, icon: Download, color: 'text-emerald' },
            { label: 'Resources', value: mockResources.length, icon: BookOpen, color: 'text-ocean' },
            { label: 'Avg Rating', value: '4.7', icon: Star, color: 'text-amber' },
          ].map(s => (
            <div key={s.label} className="glass rounded-xl p-4">
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <div className="font-display font-bold text-2xl">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search resources by title, topic, or keyword..."
                className="pl-11 h-12 text-base"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-12 gap-2" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4" /> Filters {showFilters ? <X className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </Button>
            <div className="hidden sm:flex border rounded-lg overflow-hidden">
              <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" className="h-12 w-12 rounded-none" onClick={() => setViewMode('grid')}>
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" className="h-12 w-12 rounded-none" onClick={() => setViewMode('list')}>
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-secondary/50">
                  <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                    <SelectTrigger className="w-[160px]"><SelectValue placeholder="Subject" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {subjects_list.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[160px]"><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {Object.entries(typeLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="w-[160px]"><SelectValue placeholder="Level" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      {gradeLevels_list.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">{filtered.length} resources found</p>
        </div>

        {/* Resource Grid/List */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-4'}>
          {filtered.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-hover rounded-xl overflow-hidden cursor-pointer ${viewMode === 'list' ? 'flex gap-4 p-4' : ''}`}
              onClick={() => setSelectedResource(r)}
            >
              {/* Thumbnail placeholder */}
              <div className={`gradient-primary flex items-center justify-center ${viewMode === 'list' ? 'w-20 h-20 rounded-lg shrink-0' : 'h-36'}`}>
                <div className="text-primary-foreground/80">{typeIcons[r.type]}</div>
              </div>
              <div className={viewMode === 'list' ? 'flex-1 min-w-0' : 'p-5'}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <Badge variant="secondary" className="text-xs mb-2">{typeLabels[r.type]}</Badge>
                    <h3 className="font-display font-semibold truncate">{r.title}</h3>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(r.id); }}
                    className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {bookmarks.includes(r.id) ? <BookmarkCheck className="w-5 h-5 text-primary" /> : <Bookmark className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{r.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-accent text-accent" /> {r.rating}</span>
                  <span>{r.subject}</span>
                  <span>{r.gradeLevel}</span>
                  <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {r.downloads.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Beaker className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>

      {/* Resource Detail Modal */}
      {selectedResource && (
        <ResourceDetailModal
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
          isBookmarked={bookmarks.includes(selectedResource.id)}
          onToggleBookmark={() => toggleBookmark(selectedResource.id)}
        />
      )}

      <ChatbotWidget />
    </div>
  );
};

export default UserDashboard;
