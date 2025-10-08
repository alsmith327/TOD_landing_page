import { Mail, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { supabase } from './lib/supabase';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('email_signups')
        .insert([{ email }]);

      if (submitError) {
        if (submitError.code === '23505') {
          setError('This email is already registered!');
        } else {
          setError('Something went wrong. Please try again.');
        }
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="/logo-clean.png"
              alt="Therapy On Demand"
              className="h-32 w-auto"
            />
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-full text-red-700 text-sm font-medium">
              <Clock className="w-4 h-4" />
              <span>Coming Soon</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight">
              Professional Massage,
              <br />
              <span className="text-red-700">Wherever You Are</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Book licensed massage therapists who come to you.
              Relax at home, work, or wherever you need relief.
            </p>
          </div>

          {/* Email Signup Form */}
          <div className="max-w-md mx-auto mt-12">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-red-700 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-200 text-slate-900 placeholder-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {isLoading ? 'Saving...' : 'Notify Me'}
                  {!isLoading && <ArrowRight className="w-5 h-5" />}
                </button>
              </div>

              {isSubmitted && (
                <div className="text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm font-medium animate-fade-in">
                  Thanks! We'll notify you when we launch.
                </div>
              )}

              {error && (
                <div className="text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm font-medium animate-fade-in">
                  {error}
                </div>
              )}
            </form>

            <p className="text-sm text-slate-500 mt-4">
              Be the first to know when we launch. No spam, ever.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">We Come to You</h3>
              <p className="text-sm text-slate-600">Book a massage at your home, office, or hotel</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Licensed Therapists</h3>
              <p className="text-sm text-slate-600">Certified professionals with verified credentials</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Book in Minutes</h3>
              <p className="text-sm text-slate-600">Easy scheduling with same-day availability</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
