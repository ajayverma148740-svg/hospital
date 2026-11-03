'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  HeartPulse,
  LayoutDashboard,
  Calendar,
  Users,
  Building2,
  MessageSquare,
  FileText,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Bell
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // If on login page, render children without sidebar shell
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.push('/admin/login');
          return;
        }
        const data = await res.json();
        setCurrentUser(data.user);
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-teal-400">
        <div className="flex flex-col items-center space-y-3">
          <HeartPulse className="w-10 h-10 animate-pulse text-teal-400" />
          <span className="text-sm font-semibold text-slate-300">
            Loading Nexa Hospital Administration...
          </span>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Appointments', href: '/admin/appointments', icon: Calendar },
    { name: 'Doctors', href: '/admin/doctors', icon: Users },
    { name: 'Departments', href: '/admin/departments', icon: Building2 },
    { name: 'Patient Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'Content CMS', href: '/admin/content', icon: FileText },
    { name: 'Staff & Security', href: '/admin/security', icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-navy-950 text-white px-4 py-3 flex items-center justify-between border-b border-navy-800">
        <Link href="/admin" className="flex items-center space-x-2">
          <HeartPulse className="w-6 h-6 text-teal-400" />
          <span className="font-extrabold text-sm tracking-tight">NEXA ADMIN</span>
        </Link>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 rounded-lg text-slate-300 hover:bg-navy-900"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile Slideout */}
      <aside
        className={`${
          mobileSidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-navy-950 text-slate-300 flex-shrink-0 flex flex-col justify-between border-r border-navy-900 z-40`}
      >
        <div>
          {/* Hospital Logo in Sidebar */}
          <div className="p-6 border-b border-navy-900 hidden md:block">
            <Link href="/admin" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-teal-400 flex items-center justify-center text-navy-950 shadow-md">
                <HeartPulse className="w-5 h-5 text-navy-950" />
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="font-black text-white tracking-tight">NEXA</span>
                  <span className="font-light text-teal-400 text-sm">ADMIN</span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase block">
                  Lucknow Campus
                </span>
              </div>
            </Link>
          </div>

          {/* Current Logged In User Pill */}
          {currentUser && (
            <div className="p-4 mx-3 my-4 bg-navy-900/90 rounded-2xl border border-navy-800 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-teal-600/30 text-teal-300 flex items-center justify-center font-bold text-xs uppercase border border-teal-500/30">
                {currentUser.name?.slice(0, 2) || 'AD'}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-white truncate">
                  {currentUser.name}
                </h4>
                <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {currentUser.role}
                </span>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-navy-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: View Public Website & Logout */}
        <div className="p-4 border-t border-navy-900 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-navy-900 transition"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
