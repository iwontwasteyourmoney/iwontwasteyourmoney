import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { MapPin, CloudSun, Smile } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Post {
  id: string;
  title: string;
  content: string;
  location: string;
  weather: string;
  mood: string;
  created_at: string;
}

export function Home() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) {
        setPosts(data);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Street Chronicles</h1>
        <p className="text-gray-600">
          A raw and honest documentation of life on the streets, sharing daily experiences,
          challenges, and moments of hope.
        </p>
      </div>

      <div className="grid gap-8 max-w-3xl mx-auto">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                  {format(new Date(post.created_at), 'MMM d, yyyy')}
                </p>
                <div className="flex items-center space-x-4 text-gray-500">
                  {post.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span className="text-sm">{post.location}</span>
                    </div>
                  )}
                  {post.weather && (
                    <div className="flex items-center space-x-1">
                      <CloudSun size={16} />
                      <span className="text-sm">{post.weather}</span>
                    </div>
                  )}
                  {post.mood && (
                    <div className="flex items-center space-x-1">
                      <Smile size={16} />
                      <span className="text-sm">{post.mood}</span>
                    </div>
                  )}
                </div>
              </div>

              <Link to={`/post/${post.id}`}>
                <h2 className="text-2xl font-bold mb-3 hover:text-gray-600">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {post.content}
                </p>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}