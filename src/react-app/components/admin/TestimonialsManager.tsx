import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  client_name: string;
  client_title: string | null;
  client_company: string | null;
  client_image: string | null;
  testimonial: string;
  rating: number;
  project_type: string | null;
  is_featured: number;
  display_order: number;
}

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials/admin/all');
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      client_name: formData.get('client_name'),
      client_title: formData.get('client_title'),
      client_company: formData.get('client_company'),
      client_image: formData.get('client_image'),
      testimonial: formData.get('testimonial'),
      rating: Number(formData.get('rating')),
      project_type: formData.get('project_type'),
      is_featured: formData.get('is_featured') === 'on',
      display_order: Number(formData.get('display_order'))
    };

    try {
      if (editing) {
        await fetch(`/api/testimonials/${editing.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } else {
        await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
      
      fetchTestimonials();
      setShowForm(false);
      setEditing(null);
    } catch (error) {
      console.error('Failed to save testimonial:', error);
    }
  };

  const deleteTestimonial = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      fetchTestimonials();
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {editing ? 'Edit Testimonial' : 'New Testimonial'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Client Name*</label>
                <input
                  type="text"
                  name="client_name"
                  defaultValue={editing?.client_name}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Client Title</label>
                <input
                  type="text"
                  name="client_title"
                  defaultValue={editing?.client_title || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  name="client_company"
                  defaultValue={editing?.client_company || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Project Type</label>
                <input
                  type="text"
                  name="project_type"
                  defaultValue={editing?.project_type || ''}
                  placeholder="Full Stack Development"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Client Image URL</label>
              <input
                type="url"
                name="client_image"
                defaultValue={editing?.client_image || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Testimonial*</label>
              <textarea
                name="testimonial"
                defaultValue={editing?.testimonial}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Rating</label>
                <select
                  name="rating"
                  defaultValue={editing?.rating || 5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Display Order</label>
                <input
                  type="number"
                  name="display_order"
                  defaultValue={editing?.display_order || 0}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_featured"
                id="is_featured"
                defaultChecked={editing?.is_featured === 1}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="is_featured" className="ml-2 text-sm font-medium text-gray-700">
                Feature on homepage
              </label>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editing ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              {testimonial.is_featured === 1 && (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">
                  Featured
                </span>
              )}
            </div>

            <p className="text-gray-700 mb-4 line-clamp-3">"{testimonial.testimonial}"</p>

            <div className="flex items-center space-x-3 mb-4">
              {testimonial.client_image && (
                <img 
                  src={testimonial.client_image} 
                  alt={testimonial.client_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <h4 className="font-bold text-gray-900">{testimonial.client_name}</h4>
                {testimonial.client_title && (
                  <p className="text-sm text-gray-600">{testimonial.client_title}</p>
                )}
                {testimonial.client_company && (
                  <p className="text-sm text-blue-600">{testimonial.client_company}</p>
                )}
              </div>
            </div>

            {testimonial.project_type && (
              <div className="mb-4">
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {testimonial.project_type}
                </span>
              </div>
            )}

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setEditing(testimonial);
                  setShowForm(true);
                }}
                className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm flex items-center justify-center space-x-1"
              >
                <Edit2 size={14} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => deleteTestimonial(testimonial.id)}
                className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-600">No testimonials yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
