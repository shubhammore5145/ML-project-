import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Utensils, 
  LineChart, 
  PackageSearch, 
  BarChart3, 
  Recycle, 
  FileText, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '../lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Food Items', href: '/food-items', icon: Utensils },
  { name: 'Demand Prediction', href: '/prediction', icon: LineChart },
  { name: 'Inventory', href: '/inventory', icon: PackageSearch },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Waste Reduction', href: '/waste-reduction', icon: Recycle },
  { name: 'Reports', href: '/reports', icon: FileText },
];

export function Sidebar() {
  return (
    <div className="flex flex-col w-64 glass-card h-[calc(100vh-2rem)] m-4 border-r border-slate-700/50 sticky top-4 overflow-hidden">
      <div className="flex h-20 shrink-0 items-center px-6 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="bg-accent/20 p-2 rounded-lg">
            <Utensils className="h-6 w-6 text-accent" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-accent to-accentBlue bg-clip-text text-transparent">
            SmartCanteen AI
          </span>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col overflow-y-auto pt-6 px-4 pb-4">
        <nav className="flex-1 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-accent/15 text-accent shadow-sm'
                      : 'text-textMuted hover:bg-slate-800/50 hover:text-text'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={cn("h-5 w-5", isActive ? "text-accent" : "text-textMuted group-hover:text-text")} />
                    {item.name}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
        
        <div className="mt-8 space-y-2">
          <button className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-textMuted hover:bg-slate-800/50 hover:text-text transition-all">
            <Settings className="h-5 w-5 text-textMuted group-hover:text-text" />
            Settings
          </button>
          <button className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-all">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
