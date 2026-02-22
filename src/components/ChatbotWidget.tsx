import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatMessage } from '@/types';

const quickQuestions = [
  'Find calculus textbooks',
  'Best ML resources',
  'Study tips for exams',
  'How to cite sources?',
];

const botResponses: Record<string, string> = {
  'default': "I'm EduBot, your learning assistant! I can help you find resources, create study plans, and answer questions about our library. What would you like to explore?",
  'calculus': "Great choice! We have several calculus resources:\n\n📘 **Introduction to Linear Algebra** - Covers vectors and matrices\n📝 **Calculus Study Guide** - Step-by-step problem solving\n\nWould you like me to find more specific topics?",
  'ml': "Machine Learning is one of our most popular subjects! Here are top picks:\n\n🤖 **Machine Learning Fundamentals** (4.9★) - Comprehensive textbook\n📄 **Quantum Computing: A Primer** - Includes ML applications\n\nShall I filter by difficulty level?",
  'study': "Here are some proven study tips:\n\n1. 📅 **Spaced Repetition** - Review material at increasing intervals\n2. 🎯 **Active Recall** - Test yourself instead of re-reading\n3. ⏰ **Pomodoro Technique** - 25 min focus, 5 min break\n4. 📝 **Teach Others** - Explain concepts to solidify understanding\n\nWant me to create a study schedule?",
  'cite': "I can help with citations! Common formats:\n\n**APA:** Author, A. A. (Year). *Title*. Publisher.\n**MLA:** Author. *Title*. Publisher, Year.\n**Chicago:** Author. *Title*. Place: Publisher, Year.\n\nWhich format do you need?",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes('calculus') || lower.includes('math')) return botResponses['calculus'];
  if (lower.includes('ml') || lower.includes('machine') || lower.includes('learning')) return botResponses['ml'];
  if (lower.includes('study') || lower.includes('tips') || lower.includes('exam')) return botResponses['study'];
  if (lower.includes('cite') || lower.includes('citation') || lower.includes('reference')) return botResponses['cite'];
  return "That's a great question! I'd recommend checking our search page for relevant resources. You can also filter by subject and difficulty level. Would you like help with anything specific?";
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'assistant', content: botResponses['default'], timestamp: new Date().toISOString() },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: getResponse(text), timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary shadow-lg shadow-primary/30 flex items-center justify-center text-primary-foreground"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
            style={{ maxHeight: '70vh' }}
          >
            {/* Header */}
            <div className="gradient-primary p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-card/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-primary-foreground">EduBot</h3>
                <p className="text-xs text-primary-foreground/70">Your learning assistant</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px]">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'gradient-primary text-primary-foreground rounded-br-sm'
                      : 'bg-secondary rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickQuestions.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border">
              <form
                onSubmit={e => { e.preventDefault(); sendMessage(input); }}
                className="flex gap-2"
              >
                <Input
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="text-sm"
                />
                <Button type="submit" size="icon" className="gradient-primary text-primary-foreground border-0 shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
