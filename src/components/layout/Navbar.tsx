import { Home, User, Briefcase, FolderOpen, Wrench, Mail } from 'lucide-react';
import { NavBar } from '@/components/ui/tube-light-navbar';

export function Navbar() {
  const navItems = [
    { name: 'Home', url: '#hero', icon: Home },
    { name: 'About', url: '#about', icon: User },
    { name: 'Experience', url: '#experience', icon: Briefcase },
    { name: 'Projects', url: '#projects', icon: FolderOpen },
    { name: 'Skills', url: '#skills', icon: Wrench },
    { name: 'Contact', url: '#contact', icon: Mail },
  ];
  return <NavBar items={navItems} />;
}
