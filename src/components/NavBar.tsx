import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

// Define navigation items
interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Map", href: "/map" },
  { label: "About", href: "/about" },
];

// Animation variants for nav links
const linkVariants: Variants = {
  hover: {
    scale: 1.1,
    color: "#3b82f6", // Tailwind's blue-500
    transition: { type: "spring", stiffness: 300 },
  },
};

// Animation variants for mobile menu
const menuVariants: Variants = {
  closed: { opacity: 0, x: "100%" },
  open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-primary"
            >
              MapApp
            </motion.span>
          </div>

          {/* Desktop Links */}
          <div className="hidden sm:flex sm:items-center space-x-4">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                variants={linkVariants}
                whileHover="hover"
                className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </motion.a>
            ))}
            <Button variant="default">Sign In</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <motion.div
                  variants={menuVariants}
                  initial="closed"
                  animate={isOpen ? "open" : "closed"}
                  className="flex flex-col space-y-4 mt-4"
                >
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button variant="default" className="w-full">
                    Sign In
                  </Button>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;