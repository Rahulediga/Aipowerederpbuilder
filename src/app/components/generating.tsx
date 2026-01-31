import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Sparkles, Database, LineChart, Users, Package, Settings, CheckCircle2 } from 'lucide-react';

const stages = [
  { icon: Database, label: 'Analyzing requirements', color: '#6366f1' },
  { icon: LineChart, label: 'Designing database schema', color: '#10b981' },
  { icon: Users, label: 'Creating user modules', color: '#f59e0b' },
  { icon: Package, label: 'Building workflows', color: '#ec4899' },
  { icon: Settings, label: 'Configuring settings', color: '#8b5cf6' },
  { icon: CheckCircle2, label: 'Finalizing your ERP', color: '#6366f1' },
];

export function Generating() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const { businessName, industry, colorScheme, customColors } = location.state || {};

  useEffect(() => {
    // Redirect if no data
    if (!businessName || !industry || !colorScheme) {
      navigate('/');
      return;
    }

    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev >= stages.length - 1) {
          clearInterval(interval);
          setTimeout(() => navigate('/preview', { state: { businessName, industry, colorScheme, customColors } }), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [navigate, businessName, industry, colorScheme, customColors]);

  const CurrentIcon = stages[currentStage].icon;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        {/* Main Icon Animation */}
        <motion.div
          key={currentStage}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 mx-auto mb-8 rounded-3xl flex items-center justify-center"
          style={{ backgroundColor: `${stages[currentStage].color}15` }}
        >
          <CurrentIcon
            className="w-12 h-12"
            style={{ color: stages[currentStage].color }}
          />
        </motion.div>

        {/* Status Text */}
        <motion.div
          key={`text-${currentStage}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-semibold mb-3">
            {stages[currentStage].label}
          </h2>
          <p className="text-muted-foreground">
            Creating <span className="text-foreground font-medium">{businessName}</span>'s {industry} ERP with <span className="text-foreground font-medium">{colorScheme}</span> branding
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between mt-3 text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(((currentStage + 1) / stages.length) * 100)}%</span>
          </div>
        </div>

        {/* Stage List */}
        <div className="space-y-3">
          {stages.map((stage, index) => {
            const StageIcon = stage.icon;
            const isComplete = index < currentStage;
            const isCurrent = index === currentStage;
            const isPending = index > currentStage;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-primary/5 border-primary'
                    : isComplete
                    ? 'bg-card border-border'
                    : 'bg-card/50 border-border/50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-primary text-primary-foreground'
                      : isComplete
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <StageIcon className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`${isCurrent ? 'text-foreground font-medium' : isPending ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {stage.label}
                  </p>
                </div>
                {isCurrent && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5 text-primary" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}