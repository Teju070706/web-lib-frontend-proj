import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Upload, Users, BarChart3, FileText, Trash2, Edit2, LogOut, Plus, Search, Download, Star, Eye, ChevronDown, Settings, Shield, TrendingUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import { mockResources, mockUsers, subjects_list, gradeLevels_list } from '@/data/mockData';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const typeLabels: Record<string, string> = {
  textbook: 'Textbook', research_paper: 'Research Paper', study_guide: 'Study Guide', video: 'Video', article: 'Article',
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [resourceSearch, setResourceSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const filteredResources = mockResources.filter(r =>
    r.title.toLowerCase().includes(resourceSearch.toLowerCase()) ||
    r.subject.toLowerCase().includes(resourceSearch.toLowerCase())
  );

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const analyticsData = {
    totalResources: mockResources.length,
    totalUsers: 45230,
    totalDownloads: 2_100_000,
    avgRating: 4.7,
    monthlyGrowth: 12.5,
    topSubject: 'Computer Science',
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border shrink-0 hidden lg:flex flex-col">
        <div className="p-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">EduVault</span>
          </Link>
          <Badge className="mt-2 bg-foreground/10 text-foreground border-0 text-xs">
            <Shield className="w-3 h-3 mr-1" /> Admin Panel
          </Badge>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {[
            { id: 'overview', icon: BarChart3, label: 'Overview' },
            { id: 'resources', icon: FileText, label: 'Resources' },
            { id: 'users', icon: Users, label: 'Users' },
            { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <item.icon className="w-4 h-4" /> {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
              <span className="text-xs font-bold text-background">A</span>
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{user?.name || 'Admin'}</div>
              <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="flex-1 justify-start text-muted-foreground" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar for mobile */}
        <header className="lg:hidden sticky top-0 z-40 glass border-b border-border/50 px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold">EduVault Admin</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={handleLogout}><LogOut className="w-4 h-4" /></Button>
        </header>

        <div className="p-6 md:p-8">
          {/* Overview */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-display text-2xl font-bold mb-6">Dashboard Overview</h1>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Resources', value: analyticsData.totalResources, icon: FileText, color: 'text-primary', change: '+8' },
                  { label: 'Total Users', value: '45.2K', icon: Users, color: 'text-ocean', change: '+12.5%' },
                  { label: 'Downloads', value: '2.1M', icon: Download, color: 'text-emerald', change: '+18%' },
                  { label: 'Avg Rating', value: analyticsData.avgRating, icon: Star, color: 'text-amber', change: '+0.2' },
                ].map(s => (
                  <div key={s.label} className="glass rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <s.icon className={`w-5 h-5 ${s.color}`} />
                      <span className="text-xs text-emerald font-medium">↑ {s.change}</span>
                    </div>
                    <div className="font-display text-2xl font-bold">{s.value}</div>
                    <div className="text-sm text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent resources */}
              <h2 className="font-display text-lg font-semibold mb-4">Recent Uploads</h2>
              <div className="glass rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-medium text-muted-foreground">Title</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">Subject</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">Downloads</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockResources.slice(0, 5).map(r => (
                        <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                          <td className="p-3 font-medium">{r.title}</td>
                          <td className="p-3 text-muted-foreground">{r.subject}</td>
                          <td className="p-3"><Badge variant="secondary" className="text-xs">{typeLabels[r.type]}</Badge></td>
                          <td className="p-3 text-muted-foreground">{r.downloads.toLocaleString()}</td>
                          <td className="p-3"><span className="flex items-center gap-1"><Star className="w-3 h-3 fill-accent text-accent" /> {r.rating}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Resources Management */}
          {activeTab === 'resources' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-display text-2xl font-bold">Resources</h1>
                <Dialog open={showUpload} onOpenChange={setShowUpload}>
                  <DialogTrigger asChild>
                    <Button className="gradient-primary text-primary-foreground border-0">
                      <Plus className="w-4 h-4 mr-2" /> Upload Resource
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="font-display">Upload New Resource</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                      <div>
                        <Label>Title</Label>
                        <Input placeholder="Resource title" className="mt-1" />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea placeholder="Brief description..." className="mt-1" rows={3} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Subject</Label>
                          <Select>
                            <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              {subjects_list.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Type</Label>
                          <Select>
                            <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              {Object.entries(typeLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Grade Level</Label>
                        <Select>
                          <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            {gradeLevels_list.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Drag & drop files here or click to browse</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, PPTX, MP4 up to 100MB</p>
                      </div>
                      <Button className="w-full gradient-primary text-primary-foreground border-0" onClick={() => { setShowUpload(false); toast({ title: 'Resource uploaded!', description: 'It will be available shortly.' }); }}>
                        Upload Resource
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search resources..." className="pl-10" value={resourceSearch} onChange={e => setResourceSearch(e.target.value)} />
                </div>
              </div>

              <div className="glass rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-medium text-muted-foreground">Title</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">Subject</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">Downloads</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResources.map(r => (
                        <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                          <td className="p-3 font-medium">{r.title}</td>
                          <td className="p-3 text-muted-foreground">{r.subject}</td>
                          <td className="p-3"><Badge variant="secondary" className="text-xs">{typeLabels[r.type]}</Badge></td>
                          <td className="p-3 text-muted-foreground">{r.downloads.toLocaleString()}</td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Users Management */}
          {activeTab === 'users' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-display text-2xl font-bold mb-6">User Management</h1>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-10" value={userSearch} onChange={e => setUserSearch(e.target.value)} />
                </div>
              </div>
              <div className="glass rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">Email</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">Role</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">Joined</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(u => (
                        <tr key={u.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                          <td className="p-3 font-medium">{u.name}</td>
                          <td className="p-3 text-muted-foreground">{u.email}</td>
                          <td className="p-3"><Badge variant={u.role === 'admin' ? 'default' : 'secondary'} className="text-xs capitalize">{u.role}</Badge></td>
                          <td className="p-3 text-muted-foreground">{new Date(u.joinedAt).toLocaleDateString()}</td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Analytics */}
          {activeTab === 'analytics' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-display text-2xl font-bold mb-6">Analytics</h1>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Monthly Growth', value: '+12.5%', sub: 'User registrations' },
                  { label: 'Top Subject', value: 'Computer Science', sub: '2,100 resources' },
                  { label: 'Engagement Rate', value: '78%', sub: 'Active users this month' },
                  { label: 'Avg Session', value: '24 min', sub: 'Time per visit' },
                  { label: 'Upload Rate', value: '32/week', sub: 'New resources' },
                  { label: 'Satisfaction', value: '4.7/5', sub: 'User feedback score' },
                ].map(a => (
                  <div key={a.label} className="glass rounded-xl p-5">
                    <div className="text-sm text-muted-foreground mb-1">{a.label}</div>
                    <div className="font-display text-2xl font-bold mb-1">{a.value}</div>
                    <div className="text-xs text-muted-foreground">{a.sub}</div>
                  </div>
                ))}
              </div>

              {/* Popular Resources */}
              <h2 className="font-display text-lg font-semibold mb-4">Most Downloaded Resources</h2>
              <div className="space-y-3">
                {mockResources.sort((a, b) => b.downloads - a.downloads).slice(0, 5).map((r, i) => (
                  <div key={r.id} className="glass rounded-xl p-4 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">{i + 1}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{r.title}</div>
                      <div className="text-xs text-muted-foreground">{r.subject} · {typeLabels[r.type]}</div>
                    </div>
                    <div className="text-sm font-medium">{r.downloads.toLocaleString()} downloads</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
