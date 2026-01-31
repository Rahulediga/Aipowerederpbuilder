import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  Home,
  Package,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Download,
  Share2,
  X,
  Check,
  FileText,
  ShoppingCart,
  DollarSign,
  Calendar,
  Truck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PRESET_COLORS = [
  { name: 'Ocean Blue', primary: '#0ea5e9', secondary: '#06b6d4' },
  { name: 'Forest Green', primary: '#10b981', secondary: '#059669' },
  { name: 'Royal Purple', primary: '#8b5cf6', secondary: '#7c3aed' },
  { name: 'Sunset Orange', primary: '#f97316', secondary: '#ea580c' },
  { name: 'Cherry Red', primary: '#ef4444', secondary: '#dc2626' },
  { name: 'Indigo Night', primary: '#6366f1', secondary: '#4f46e5' },
];

const INDUSTRY_DATA: Record<string, any> = {
  'Manufacturing': {
    icon: Package,
    modules: [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'production', icon: Settings, label: 'Production' },
      { id: 'inventory', icon: Package, label: 'Inventory' },
      { id: 'quality', icon: BarChart3, label: 'Quality Control' },
      { id: 'suppliers', icon: Truck, label: 'Suppliers' },
    ],
    stats: [
      { label: 'Production Output', value: '12,450', unit: 'units', change: '+12.5%', trend: 'up' },
      { label: 'Active Orders', value: '284', unit: '', change: '+8.2%', trend: 'up' },
      { label: 'Inventory Items', value: '3,847', unit: '', change: '-2.3%', trend: 'down' },
      { label: 'Efficiency Rate', value: '94.2', unit: '%', change: '+3.1%', trend: 'up' },
    ],
  },
  'Retail & E-commerce': {
    icon: ShoppingCart,
    modules: [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'orders', icon: ShoppingCart, label: 'Orders' },
      { id: 'products', icon: Package, label: 'Products' },
      { id: 'customers', icon: Users, label: 'Customers' },
      { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    ],
    stats: [
      { label: 'Total Sales', value: '$284,392', unit: '', change: '+18.2%', trend: 'up' },
      { label: 'Active Orders', value: '1,847', unit: '', change: '+12.5%', trend: 'up' },
      { label: 'Total Customers', value: '8,492', unit: '', change: '+24.7%', trend: 'up' },
      { label: 'Conversion Rate', value: '3.8', unit: '%', change: '+0.4%', trend: 'up' },
    ],
  },
  'Healthcare': {
    icon: Users,
    modules: [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'patients', icon: Users, label: 'Patients' },
      { id: 'appointments', icon: Calendar, label: 'Appointments' },
      { id: 'records', icon: FileText, label: 'Records' },
      { id: 'billing', icon: DollarSign, label: 'Billing' },
    ],
    stats: [
      { label: 'Total Patients', value: '2,847', unit: '', change: '+5.2%', trend: 'up' },
      { label: 'Today\'s Appointments', value: '124', unit: '', change: '+8.3%', trend: 'up' },
      { label: 'Pending Records', value: '89', unit: '', change: '-12.1%', trend: 'down' },
      { label: 'Billing Processed', value: '$184K', unit: '', change: '+15.4%', trend: 'up' },
    ],
  },
  'Construction': {
    icon: Settings,
    modules: [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'projects', icon: FileText, label: 'Projects' },
      { id: 'equipment', icon: Package, label: 'Equipment' },
      { id: 'workforce', icon: Users, label: 'Workforce' },
      { id: 'materials', icon: Truck, label: 'Materials' },
    ],
    stats: [
      { label: 'Active Projects', value: '18', unit: '', change: '+2', trend: 'up' },
      { label: 'Total Workforce', value: '542', unit: '', change: '+12.5%', trend: 'up' },
      { label: 'Equipment Active', value: '94', unit: '', change: '+5.6%', trend: 'up' },
      { label: 'Project Value', value: '$4.2M', unit: '', change: '+18.7%', trend: 'up' },
    ],
  },
  'Technology & Software': {
    icon: Settings,
    modules: [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'projects', icon: FileText, label: 'Projects' },
      { id: 'team', icon: Users, label: 'Team' },
      { id: 'clients', icon: Users, label: 'Clients' },
      { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    ],
    stats: [
      { label: 'Active Projects', value: '24', unit: '', change: '+6', trend: 'up' },
      { label: 'Team Members', value: '142', unit: '', change: '+8.2%', trend: 'up' },
      { label: 'Client Satisfaction', value: '96', unit: '%', change: '+2.3%', trend: 'up' },
      { label: 'Revenue', value: '$847K', unit: '', change: '+22.1%', trend: 'up' },
    ],
  },
  'Food & Beverage': {
    icon: Package,
    modules: [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'orders', icon: ShoppingCart, label: 'Orders' },
      { id: 'inventory', icon: Package, label: 'Inventory' },
      { id: 'suppliers', icon: Truck, label: 'Suppliers' },
      { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    ],
    stats: [
      { label: 'Daily Orders', value: '847', unit: '', change: '+15.3%', trend: 'up' },
      { label: 'Inventory Items', value: '1,284', unit: '', change: '+6.2%', trend: 'up' },
      { label: 'Active Suppliers', value: '42', unit: '', change: '+3', trend: 'up' },
      { label: 'Revenue', value: '$124K', unit: '', change: '+18.7%', trend: 'up' },
    ],
  },
  'Logistics & Transportation': {
    icon: Truck,
    modules: [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'shipments', icon: Package, label: 'Shipments' },
      { id: 'fleet', icon: Truck, label: 'Fleet' },
      { id: 'drivers', icon: Users, label: 'Drivers' },
      { id: 'routes', icon: BarChart3, label: 'Routes' },
    ],
    stats: [
      { label: 'Active Shipments', value: '384', unit: '', change: '+12.8%', trend: 'up' },
      { label: 'Fleet Vehicles', value: '124', unit: '', change: '+5', trend: 'up' },
      { label: 'On-Time Delivery', value: '96.4', unit: '%', change: '+2.1%', trend: 'up' },
      { label: 'Total Drivers', value: '247', unit: '', change: '+8.4%', trend: 'up' },
    ],
  },
  'Real Estate': {
    icon: Home,
    modules: [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'properties', icon: Package, label: 'Properties' },
      { id: 'clients', icon: Users, label: 'Clients' },
      { id: 'transactions', icon: DollarSign, label: 'Transactions' },
      { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    ],
    stats: [
      { label: 'Active Listings', value: '142', unit: '', change: '+8', trend: 'up' },
      { label: 'Total Clients', value: '684', unit: '', change: '+12.5%', trend: 'up' },
      { label: 'Transactions', value: '47', unit: '', change: '+18.2%', trend: 'up' },
      { label: 'Total Value', value: '$8.4M', unit: '', change: '+24.1%', trend: 'up' },
    ],
  },
  'Finance & Banking': {
    icon: DollarSign,
    modules: [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'accounts', icon: Users, label: 'Accounts' },
      { id: 'transactions', icon: BarChart3, label: 'Transactions' },
      { id: 'reports', icon: FileText, label: 'Reports' },
      { id: 'compliance', icon: Settings, label: 'Compliance' },
    ],
    stats: [
      { label: 'Total Accounts', value: '4,247', unit: '', change: '+7.2%', trend: 'up' },
      { label: 'Daily Transactions', value: '1,847', unit: '', change: '+12.8%', trend: 'up' },
      { label: 'Assets Under Management', value: '$42.8M', unit: '', change: '+15.4%', trend: 'up' },
      { label: 'Customer Satisfaction', value: '94.2', unit: '%', change: '+2.3%', trend: 'up' },
    ],
  },
  'Education': {
    icon: FileText,
    modules: [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'students', icon: Users, label: 'Students' },
      { id: 'courses', icon: FileText, label: 'Courses' },
      { id: 'faculty', icon: Users, label: 'Faculty' },
      { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    ],
    stats: [
      { label: 'Total Students', value: '2,847', unit: '', change: '+8.2%', trend: 'up' },
      { label: 'Active Courses', value: '124', unit: '', change: '+6', trend: 'up' },
      { label: 'Faculty Members', value: '184', unit: '', change: '+3.5%', trend: 'up' },
      { label: 'Completion Rate', value: '87.4', unit: '%', change: '+4.2%', trend: 'up' },
    ],
  },
  'Hospitality': {
    icon: Home,
    modules: [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'bookings', icon: Calendar, label: 'Bookings' },
      { id: 'guests', icon: Users, label: 'Guests' },
      { id: 'rooms', icon: Package, label: 'Rooms' },
      { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    ],
    stats: [
      { label: 'Occupancy Rate', value: '84.2', unit: '%', change: '+6.3%', trend: 'up' },
      { label: 'Active Bookings', value: '247', unit: '', change: '+12.5%', trend: 'up' },
      { label: 'Guest Satisfaction', value: '4.6', unit: '/5', change: '+0.2', trend: 'up' },
      { label: 'Revenue', value: '$184K', unit: '', change: '+18.7%', trend: 'up' },
    ],
  },
  'Agriculture': {
    icon: Settings,
    modules: [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'crops', icon: Package, label: 'Crops' },
      { id: 'equipment', icon: Settings, label: 'Equipment' },
      { id: 'workforce', icon: Users, label: 'Workforce' },
      { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    ],
    stats: [
      { label: 'Active Fields', value: '47', unit: '', change: '+3', trend: 'up' },
      { label: 'Total Yield', value: '284', unit: 'tons', change: '+15.2%', trend: 'up' },
      { label: 'Equipment Active', value: '42', unit: '', change: '+5', trend: 'up' },
      { label: 'Workforce', value: '124', unit: '', change: '+8.3%', trend: 'up' },
    ],
  },
};

export function Preview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { businessName, industry, colorScheme } = location.state || {};
  
  const [activeModule, setActiveModule] = useState('dashboard');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Redirect if no data
  useEffect(() => {
    if (!businessName || !industry || !colorScheme) {
      navigate('/');
    }
  }, [businessName, industry, colorScheme, navigate]);

  if (!businessName || !industry || !colorScheme) {
    return null;
  }

  // Get color scheme
  const colors = PRESET_COLORS.find(c => c.name === colorScheme) || PRESET_COLORS[0];
  
  // Get industry data or fallback
  const industryData = INDUSTRY_DATA[industry] || INDUSTRY_DATA['Manufacturing'];
  const modules = industryData.modules;
  const stats = industryData.stats;
  const IndustryIcon = industryData.icon;

  const handleExport = () => {
    setExportSuccess(true);
    setTimeout(() => {
      setExportSuccess(false);
      setShowExportModal(false);
    }, 2000);
  };

  const handleShare = () => {
    setShareSuccess(true);
    setTimeout(() => {
      setShareSuccess(false);
      setShowShareModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: colors.primary }}
            >
              <IndustryIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">{businessName}</h3>
              <p className="text-xs text-muted-foreground">{industry}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {modules.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeModule === item.id
                    ? 'text-white'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
                style={activeModule === item.id ? { backgroundColor: colors.primary } : {}}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="bg-secondary rounded-xl p-4">
            <p className="text-sm font-medium mb-1">Ready to deploy?</p>
            <p className="text-xs text-muted-foreground mb-3">
              Export your ERP and start using it
            </p>
            <button 
              onClick={() => setShowExportModal(true)}
              className="w-full px-3 py-2 text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: colors.primary }}
            >
              Export System
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-card border-b border-border px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-secondary rounded-lg transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-semibold truncate">ERP Preview</h1>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  Your custom {industry.toLowerCase()} ERP system
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="relative hidden sm:block">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-secondary rounded-lg border border-transparent focus:border-primary focus:outline-none w-48 lg:w-64"
                />
              </div>
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <button className="hidden sm:flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-lg transition-colors">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                  style={{ backgroundColor: colors.primary }}
                >
                  {businessName.charAt(0).toUpperCase()}
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Action Buttons */}
            <div className="flex items-center gap-3 mb-8">
              <button 
                onClick={() => setShowExportModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-xl hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
              <button 
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-secondary transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-2xl sm:text-3xl font-semibold">
                      {stat.value}
                      {stat.unit && <span className="text-lg text-muted-foreground ml-1">{stat.unit}</span>}
                    </h3>
                    <div
                      className={`flex items-center gap-1 text-sm ${
                        stat.trend === 'up' ? 'text-accent' : 'text-destructive'
                      }`}
                    >
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { title: 'New order received', desc: 'Order #2847 from Acme Corp', time: '5 min ago' },
                    { title: 'Inventory updated', desc: '45 items restocked', time: '1 hour ago' },
                    { title: 'Report generated', desc: 'Monthly performance report', time: '2 hours ago' },
                    { title: 'User added', desc: 'John Doe joined the team', time: '3 hours ago' },
                  ].map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-secondary rounded-xl"
                    >
                      <div 
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: colors.primary }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.desc}</p>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: FileText, label: 'New Report', color: colors.primary },
                    { icon: Users, label: 'Add User', color: colors.secondary },
                    { icon: Package, label: 'Add Item', color: colors.primary },
                    { icon: Settings, label: 'Settings', color: colors.secondary },
                  ].map((action, idx) => {
                    const ActionIcon = action.icon;
                    return (
                      <button
                        key={idx}
                        className="flex flex-col items-center gap-3 p-4 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors"
                      >
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                          style={{ backgroundColor: action.color }}
                        >
                          <ActionIcon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium">{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => !exportSuccess && setShowExportModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-2xl p-6 w-full max-w-md z-50"
            >
              {!exportSuccess ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Export ERP System</h3>
                    <button
                      onClick={() => setShowExportModal(false)}
                      className="p-1 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Download your custom ERP system as a complete package ready for deployment.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                      <Check className="w-5 h-5 text-accent" />
                      <span className="text-sm">Full source code</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                      <Check className="w-5 h-5 text-accent" />
                      <span className="text-sm">Database schema</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                      <Check className="w-5 h-5 text-accent" />
                      <span className="text-sm">Documentation</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                      <Check className="w-5 h-5 text-accent" />
                      <span className="text-sm">Deployment guide</span>
                    </div>
                  </div>
                  <button
                    onClick={handleExport}
                    className="w-full px-4 py-3 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Download className="w-5 h-5" />
                    Download Package
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primary}20` }}
                  >
                    <Check className="w-8 h-8" style={{ color: colors.primary }} />
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2">Export Complete!</h3>
                  <p className="text-muted-foreground">Your ERP system is ready to download.</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => !shareSuccess && setShowShareModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-2xl p-6 w-full max-w-md z-50"
            >
              {!shareSuccess ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Share ERP System</h3>
                    <button
                      onClick={() => setShowShareModal(false)}
                      className="p-1 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Share this preview with your team or stakeholders.
                  </p>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Share Link</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={`https://erpify.app/preview/${Math.random().toString(36).substr(2, 9)}`}
                        readOnly
                        className="flex-1 px-4 py-2 bg-secondary rounded-lg border border-border"
                      />
                      <button
                        onClick={handleShare}
                        className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: colors.primary }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primary}20` }}
                  >
                    <Check className="w-8 h-8" style={{ color: colors.primary }} />
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2">Link Copied!</h3>
                  <p className="text-muted-foreground">Share link copied to clipboard.</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}