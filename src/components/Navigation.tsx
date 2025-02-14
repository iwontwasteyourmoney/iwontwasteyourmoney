import React from 'react';
import { Link } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Navigation() {
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Only set admin if the user's email matches the blog owner
      setIsAdmin(session?.user?.email === import.meta.env.VITE_ADMIN_EMAIL);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(session?.user?.email === import.meta.env.VITE_ADMIN_EMAIL);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">Street Chronicles</Link>
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Link
                to="/new"
                className="flex items-center space-x-1 hover:text-gray-300"
              >
                <PenLine size={20} />
                <span>New Entry</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}