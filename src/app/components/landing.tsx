import { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Zap, Shield, Layers, Plus, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';

const PRESET_COLORS = [
  { name: 'Ocean Blue', primary: '#0ea5e9', secondary: '#06b6d4' },
  { name: 'Forest Green', primary: '#10b981', secondary: '#059669' },
  { name: 'Royal Purple', primary: '#8b5cf6', secondary: '#7c3aed' },
  { name: 'Sunset Orange', primary: '#f97316', secondary: '#ea580c' },
  { name: 'Cherry Red', primary: '#ef4444', secondary: '#dc2626' },
  { name: 'Indigo Night', primary: '#6366f1', secondary: '#4f46e5' },
];

const INDUSTRIES = [
  'Manufacturing',
  'Retail & E-commerce',
  'Healthcare',
  'Construction',
  'Technology & Software',
  'Food & Beverage',
  'Logistics & Transportation',
  'Real Estate',
  'Finance & Banking',
  'Education',
  'Hospitality',
  'Agriculture',
];

export function Landing() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [selectedColorScheme, setSelectedColorScheme] = useState('');
  const [customColors, setCustomColors] = useState<{ name: string; primary: string; secondary: string }[]>([]);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showAddColorForm, setShowAddColorForm] = useState(false);
  const [newColorName, setNewColorName] = useState('');
  const [newPrimaryColor, setNewPrimaryColor] = useState('#6366f1');
  const [newSecondaryColor, setNewSecondaryColor] = useState('#4f46e5');
  const navigate = useNavigate();

  const colorDropdownRef = useRef<HTMLDivElement>(null);
  const industryDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorDropdownRef.current && !colorDropdownRef.current.contains(event.target as Node)) {
        setShowColorDropdown(false);
        setShowAddColorForm(false);
      }
      if (industryDropdownRef.current && !industryDropdownRef.current.contains(event.target as Node)) {
        setShowIndustryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGenerate = () => {
    if (businessName.trim() && industry && selectedColorScheme) {
      navigate('/generate', { 
        state: { 
          businessName,
          industry,
          colorScheme: selectedColorScheme,
          customColors, // Pass custom colors
        } 
      });
    }
  };

  const handleAddCustomColor = () => {
    if (newColorName.trim()) {
      const newScheme = {
        name: newColorName,
        primary: newPrimaryColor,
        secondary: newSecondaryColor,
      };
      setCustomColors([...customColors, newScheme]);
      setSelectedColorScheme(newColorName);
      setShowAddColorForm(false);
      setNewColorName('');
      setNewPrimaryColor('#6366f1');
      setNewSecondaryColor('#4f46e5');
    }
  };

  const allColorSchemes = [...PRESET_COLORS, ...customColors];
  const isFormValid = businessName.trim() && industry && selectedColorScheme;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">ERPify</span>
          </div>
          <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6">
        <div className="pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground mb-8">
            <Zap className="w-4 h-4" />
            <span className="text-sm">AI-Powered ERP Generation</span>
          </div>

          <h1 className="text-6xl font-bold mb-6 tracking-tight">
            Build Your ERP Software
            <br />
            <span className="text-primary">In Seconds</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Enter your business details and let our AI create a fully customized ERP system tailored to your industry.
          </p>

          {/* Input Form */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-card border border-border rounded-3xl p-8 space-y-6">
              {/* Business Name */}
              <div className="text-left">
                <label className="block text-sm font-medium mb-2">Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g., Acme Manufacturing"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Industry */}
              <div className="text-left relative">
                <label className="block text-sm font-medium mb-2">Industry</label>
                <button
                  onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:outline-none transition-colors flex items-center justify-between text-left"
                >
                  <span className={industry ? 'text-foreground' : 'text-muted-foreground'}>
                    {industry || 'Select your industry'}
                  </span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </button>
                {showIndustryDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg max-h-64 overflow-y-auto z-10" ref={industryDropdownRef}>
                    {INDUSTRIES.map((ind) => (
                      <button
                        key={ind}
                        onClick={() => {
                          setIndustry(ind);
                          setShowIndustryDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors"
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Branding Colors */}
              <div className="text-left relative">
                <label className="block text-sm font-medium mb-2">Branding Colors</label>
                <button
                  onClick={() => setShowColorDropdown(!showColorDropdown)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:outline-none transition-colors flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    {selectedColorScheme && allColorSchemes.find(c => c.name === selectedColorScheme) ? (
                      <>
                        <div className="flex gap-1">
                          <div
                            className="w-6 h-6 rounded-md"
                            style={{ backgroundColor: allColorSchemes.find(c => c.name === selectedColorScheme)?.primary }}
                          />
                          <div
                            className="w-6 h-6 rounded-md"
                            style={{ backgroundColor: allColorSchemes.find(c => c.name === selectedColorScheme)?.secondary }}
                          />
                        </div>
                        <span className="text-foreground">{selectedColorScheme}</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">Select color scheme</span>
                    )}
                  </div>
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </button>
                
                {showColorDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg max-h-80 overflow-y-auto z-10" ref={colorDropdownRef}>
                    {allColorSchemes.map((scheme) => (
                      <button
                        key={scheme.name}
                        onClick={() => {
                          setSelectedColorScheme(scheme.name);
                          setShowColorDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-center gap-3"
                      >
                        <div className="flex gap-1">
                          <div
                            className="w-6 h-6 rounded-md"
                            style={{ backgroundColor: scheme.primary }}
                          />
                          <div
                            className="w-6 h-6 rounded-md"
                            style={{ backgroundColor: scheme.secondary }}
                          />
                        </div>
                        <span>{scheme.name}</span>
                      </button>
                    ))}
                    
                    <div className="border-t border-border p-3">
                      {!showAddColorForm ? (
                        <button
                          onClick={() => setShowAddColorForm(true)}
                          className="w-full px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Custom Colors
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={newColorName}
                            onChange={(e) => setNewColorName(e.target.value)}
                            placeholder="Color scheme name"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:border-primary focus:outline-none"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-muted-foreground mb-1">Primary</label>
                              <input
                                type="color"
                                value={newPrimaryColor}
                                onChange={(e) => setNewPrimaryColor(e.target.value)}
                                className="w-full h-10 rounded-lg cursor-pointer"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-muted-foreground mb-1">Secondary</label>
                              <input
                                type="color"
                                value={newSecondaryColor}
                                onChange={(e) => setNewSecondaryColor(e.target.value)}
                                className="w-full h-10 rounded-lg cursor-pointer"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddCustomColor();
                              }}
                              className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                            >
                              Add
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowAddColorForm(false);
                              }}
                              className="px-3 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!isFormValid}
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2 mt-8"
              >
                Generate ERP System
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">
                Advanced AI understands your business requirements and generates the perfect ERP solution.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Layers className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fully Customizable</h3>
              <p className="text-muted-foreground">
                Every module is tailored to your specific workflows, processes, and industry needs.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 bg-chart-3/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-chart-3" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Enterprise Ready</h3>
              <p className="text-muted-foreground">
                Built with security, scalability, and compliance in mind from day one.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}