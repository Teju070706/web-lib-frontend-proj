import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { useToast } from '@/hooks/use-toast';

const AuthPage = ({ mode }: { mode: 'login' | 'register' }) => {
  const { role } = useParams<{ role: string }>();
  const userRole = (role === 'admin' ? 'admin' : 'user') as UserRole;
  const isAdmin = userRole === 'admin';
  const isLogin = mode === 'login';
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password, userRole);
    } else {
      register(name, email, password, userRole);
    }
    toast({ title: `Welcome${isLogin ? ' back' : ''}!`, description: `Logged in as ${userRole}.` });
    navigate(isAdmin ? '/admin' : '/dashboard');
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ['', 'bg-destructive', 'bg-amber', 'bg-emerald'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className={`hidden lg:flex flex-col justify-center items-center w-1/2 p-12 ${isAdmin ? 'bg-foreground' : 'gradient-primary'}`}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-card/20 backdrop-blur flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
            {isAdmin ? 'Admin Portal' : 'Welcome to EduVault'}
          </h2>
          <p className="text-primary-foreground/70">
            {isAdmin
              ? 'Manage resources, monitor analytics, and control user access from your admin dashboard.'
              : 'Access thousands of educational resources, track your learning, and connect with peers.'}
          </p>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">EduVault</span>
          </Link>

          <div className="mb-6">
            <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-3 ${isAdmin ? 'bg-foreground/10 text-foreground' : 'bg-primary/10 text-primary'}`}>
              {isAdmin ? '🔒 Admin' : '👤 Student / Educator'}
            </div>
            <h1 className="font-display text-2xl font-bold mb-1">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <Link to={`/${isLogin ? 'register' : 'login'}/${userRole}`} className="text-primary font-medium hover:underline">
                {isLogin ? 'Sign up' : 'Sign in'}
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="name" placeholder="John Doe" className="pl-10" value={name} onChange={e => setName(e.target.value)} required />
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder={isAdmin ? 'admin@example.com' : 'student@example.com'} className="pl-10" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type={showPw ? 'text' : 'password'} placeholder="••••••••" className="pl-10 pr-10" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {!isLogin && password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map(level => (
                      <div key={level} className={`h-1 flex-1 rounded-full ${strength >= level ? strengthColors[strength] : 'bg-muted'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{strengthLabels[strength]}</span>
                </div>
              )}
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0 shadow-glow">
              {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              {isAdmin ? (
                <Link to={`/${mode}/user`} className="text-primary hover:underline">Switch to User Portal →</Link>
              ) : (
                <Link to={`/${mode}/admin`} className="text-primary hover:underline">Switch to Admin Portal →</Link>
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
