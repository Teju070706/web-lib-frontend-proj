import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Search, Users, Download, Star, ArrowRight, GraduationCap, FileText, Beaker, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

const stats = [
  { label: 'Resources', value: '12,000+', icon: BookOpen },
  { label: 'Active Users', value: '45,000+', icon: Users },
  { label: 'Downloads', value: '2.1M+', icon: Download },
  { label: 'Avg Rating', value: '4.7★', icon: Star },
];

const categories = [
  { name: 'Mathematics', icon: '📐', count: 1240, color: 'bg-primary/10 text-primary' },
  { name: 'Computer Science', icon: '💻', count: 2100, color: 'bg-ocean/10 text-ocean' },
  { name: 'Physics', icon: '⚡', count: 890, color: 'bg-amber/10 text-amber' },
  { name: 'Biology', icon: '🧬', count: 760, color: 'bg-emerald/10 text-emerald' },
  { name: 'Chemistry', icon: '🧪', count: 650, color: 'bg-violet/10 text-violet' },
  { name: 'Literature', icon: '📚', count: 540, color: 'bg-rose/10 text-rose' },
  { name: 'History', icon: '🏛️', count: 430, color: 'bg-amber/10 text-amber' },
  { name: 'Economics', icon: '📈', count: 380, color: 'bg-primary/10 text-primary' },
];

const features = [
  { icon: Search, title: 'Smart Search', desc: 'Find exactly what you need with AI-powered search and filters.' },
  { icon: GraduationCap, title: 'Curated Content', desc: 'Expert-reviewed materials organized by subject and level.' },
  { icon: FileText, title: 'Multiple Formats', desc: 'Textbooks, papers, guides, videos, and articles.' },
  { icon: Beaker, title: 'AI Assistant', desc: 'Get personalized recommendations and study guidance.' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'CS Student', text: 'EduVault transformed how I study. The search is incredibly fast and the recommendations are spot-on!' },
  { name: 'Marcus Chen', role: 'Professor', text: 'As an educator, I love how easy it is to upload and organize materials for my students.' },
  { name: 'Sofia Rodriguez', role: 'Graduate Researcher', text: 'The citation generator and annotation tools save me hours every week.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">EduVault</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Categories</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login/user">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register/user">
              <Button size="sm" className="gradient-primary text-primary-foreground border-0 shadow-glow">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 gradient-hero overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 -left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Globe className="w-4 h-4" /> Trusted by 45,000+ learners worldwide
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Your Gateway to
              <span className="gradient-text block">Knowledge</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover, download, and learn from thousands of curated educational resources. Textbooks, research papers, study guides — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register/user">
                <Button size="lg" className="gradient-primary text-primary-foreground border-0 shadow-glow px-8 text-base">
                  Start Learning <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login/admin">
                <Button size="lg" variant="outline" className="px-8 text-base">
                  Admin Portal
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-xl p-4 text-center">
                <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="font-display font-bold text-2xl">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Excel</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Powerful tools designed for modern learners and educators.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-hover rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Browse by Subject</h2>
            <p className="text-muted-foreground">Explore resources across 8+ academic disciplines.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((c, i) => (
              <motion.div
                key={c.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-hover rounded-xl p-5 cursor-pointer group"
              >
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-display font-semibold mb-1 group-hover:text-primary transition-colors">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.count.toLocaleString()} resources</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Loved by Learners</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass rounded-xl p-6"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm mb-4 text-muted-foreground">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="gradient-primary rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-50" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Start Learning?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">Join thousands of students and educators already using EduVault.</p>
              <Link to="/register/user">
                <Button size="lg" className="bg-card text-foreground hover:bg-card/90 px-8 text-base font-semibold">
                  Create Free Account <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold">EduVault</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 EduVault. Empowering learners everywhere.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
