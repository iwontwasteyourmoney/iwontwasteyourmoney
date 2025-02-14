import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CloudSun, Smile } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function NewPost() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError('You must be signed in to create a post');
      setLoading(false);
      return;
    }

    const { error: postError } = await supabase
      .from('posts')
      .insert({
        author_id: user.id,
        title: formData.get('title'),
        content: formData.get('content'),
        location: formData.get('location'),
        mood: formData.get('mood'),
        weather: formData.get('weather'),
      });

    if (postError) {
      setError(postError.message);
      setLoading(false);
      return;
    }

    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">New Journal Entry</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={8}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>Location</span>
              </div>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="mood" className="block text-sm font-medium text-gray-700">
              <div className="flex items-center space-x-1">
                <Smile size={16} />
                <span>Mood</span>
              </div>
            </label>
            <input
              type="text"
              id="mood"
              name="mood"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="weather" className="block text-sm font-medium text-gray-700">
              <div className="flex items-center space-x-1">
                <CloudSun size={16} />
                <span>Weather</span>
              </div>
            </label>
            <input
              type="text"
              id="weather"
              name="weather"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Publishing...' : 'Publish Entry'}
        </button>
      </form>
    </div>
  );
}