import { useEffect, useState } from 'react';
import { Mail, Clock, Check, Trash2, Eye } from 'lucide-react';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  company: string | null;
  service: string;
  message: string;
  status: string;
  notes: string | null;
  created_at: string;
}

export default function InquiriesManager() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      setInquiries(data);
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string, notes?: string) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      });
      fetchInquiries();
    } catch (error) {
      console.error('Failed to update inquiry:', error);
    }
  };

  const deleteInquiry = async (id: number) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      fetchInquiries();
      setSelectedInquiry(null);
    } catch (error) {
      console.error('Failed to delete inquiry:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading inquiries...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
        <div className="text-sm text-gray-600">{inquiries.length} total</div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Inquiries List */}
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              onClick={() => setSelectedInquiry(inquiry)}
              className={`bg-white rounded-xl p-6 border cursor-pointer transition-all ${
                selectedInquiry?.id === inquiry.id
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{inquiry.name}</h3>
                  <p className="text-sm text-gray-600">{inquiry.email}</p>
                  {inquiry.company && (
                    <p className="text-sm text-gray-500">{inquiry.company}</p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(inquiry.status)}`}>
                  {inquiry.status.replace('_', ' ')}
                </span>
              </div>
              
              <div className="mb-3">
                <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                  {inquiry.service}
                </span>
              </div>
              
              <p className="text-sm text-gray-700 line-clamp-2 mb-3">{inquiry.message}</p>
              
              <div className="flex items-center text-xs text-gray-500">
                <Clock size={14} className="mr-1" />
                {new Date(inquiry.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}

          {inquiries.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No inquiries yet</p>
            </div>
          )}
        </div>

        {/* Inquiry Detail */}
        <div className="lg:sticky lg:top-24 h-fit">
          {selectedInquiry ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedInquiry.name}</h2>
                  <p className="text-gray-600">{selectedInquiry.email}</p>
                  {selectedInquiry.company && (
                    <p className="text-gray-500 mt-1">{selectedInquiry.company}</p>
                  )}
                </div>
                <button
                  onClick={() => deleteInquiry(selectedInquiry.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Service Interested</label>
                  <p className="mt-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg inline-block">
                    {selectedInquiry.service}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Message</label>
                  <p className="mt-1 text-gray-700 whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Received</label>
                  <p className="mt-1 text-gray-600">
                    {new Date(selectedInquiry.created_at).toLocaleString()}
                  </p>
                </div>

                {selectedInquiry.notes && (
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Notes</label>
                    <p className="mt-1 text-gray-600">{selectedInquiry.notes}</p>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <label className="text-sm font-semibold text-gray-700 block mb-3">Update Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateStatus(selectedInquiry.id, 'in_progress')}
                    className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors text-sm font-medium"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => updateStatus(selectedInquiry.id, 'completed')}
                    className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                  >
                    <Check size={16} className="inline mr-1" />
                    Completed
                  </button>
                  <button
                    onClick={() => updateStatus(selectedInquiry.id, 'archived')}
                    className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                  >
                    Archive
                  </button>
                  <button
                    onClick={() => updateStatus(selectedInquiry.id, 'new')}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    Mark as New
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Eye className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Select an inquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
