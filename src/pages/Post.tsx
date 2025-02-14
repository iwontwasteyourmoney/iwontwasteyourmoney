import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { MapPin, CloudSun, Smile, ArrowLeft } from 'lucide-react';
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

export function Post() {
  const { id } = useParams();
  const [post, setPost] = React.useState<Post | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    async function fetchPost() {
      if (!id) return;

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError('Post not found');
        setLoading(false);
        return;
      }

      setPost(data);
      setLoading(false);
    }

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h2>
        <p className="text-gray-600 mb-8">The post you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </Link>

      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-500">
              {format(new Date(post.created_at), 'MMMM d, yyyy')}
            </p>
          </div>

          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center space-x-6 text-gray-500 mb-8">
            {post.location && (
              <div className="flex items-center space-x-2">
                <MapPin size={18} />
                <span>{post.location}</span>
              </div>
            )}
            {post.weather && (
              <div className="flex items-center space-x-2">
                <CloudSun size={18} />
                <span>{post.weather}</span>
              </div>
            )}
            {post.mood && (
              <div className="flex items-center space-x-2">
                <Smile size={18} />
                <span>{post.mood}</span>
              </div>
            )}
          </div>

          <div className="prose max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}