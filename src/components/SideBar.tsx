import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Car,LayoutDashboard, Map, BarChart, Menu } from "lucide-react";


// Define navigation items
interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Dashboard", to: "/", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Car models", to: "/cars", icon: <Car className="h-5 w-5" /> },
  { label: "Map", to: "/map", icon: <Map className="h-5 w-5" /> },
  { label: "Data", to: "/data", icon: <BarChart className="h-5 w-5" /> },
];

// Animation variants for sidebar
const sidebarVariants: Variants = {
  collapsed: { width: "64px" },
  expanded: { width: "200px" },
};

// Animation variants for nav items
const itemVariants: Variants = {
  hover: {
    scale: 1.1,
    color: "#3b82f6", // Tailwind's blue-500
    transition: { type: "spring", stiffness: 300 },
  },
};

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-screen bg-white shadow-md z-50 flex flex-col"
      >
        {/* Toggle Button */}
        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)} // Update the prop-controlled state
            className="w-full"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col space-y-2 p-2">
          {navItems.map((item) => (
            <motion.div
            key={item.label}
            variants={itemVariants}
            whileHover="hover"
            className={cn(
              "flex items-center rounded-md text-sm font-medium",
              !isExpanded && "justify-center"
            )}
          >
            <NavLink
              to={item.to}
              end // Ensures exact matching for root path ("/")
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-2 text-gray-700 hover:text-blue-500 p-2 rounded-md w-full",
                  isActive && "text-blue-500 bg-blue-100"
                )
              }
            >
              <span>{item.icon}</span>
              {isExpanded && <span>{item.label}</span>}
            </NavLink>
          </motion.div>
          ))}
        </nav>
      </motion.div>

      {/* Mobile Sidebar (Sheet) */}
      <div className="sm:hidden">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] p-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 p-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;