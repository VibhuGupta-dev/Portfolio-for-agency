import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: 'spring', stiffness: 100 },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: 'spring' },
  },
};

function QuotePage() {
  const [formData, setFormData] = useState({
    projectType: '',
    name: '',
    email: '',
    companyName: '',
    phone: '',
    ProductBudget: '',
    productTimeline: '',
    productDescription: '',
    additionalServices: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'projectType',
      'name',
      'email',
      'companyName',
      'phone',
      'ProductBudget',
      'productTimeline',
      'productDescription',
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    if (formData.email && !/.+\@.+\..+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be numeric';
    }

    if (formData.ProductBudget && isNaN(formData.ProductBudget)) {
      newErrors.ProductBudget = 'Budget must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', type: '' });

    if (!validateForm()) {
      setStatus({ loading: false, message: 'Please fill out all required fields correctly', type: 'error' });
      return;
    }

    try {
      console.log('Sending:', {
        ...formData,
        phone: Number(formData.phone),
        ProductBudget: Number(formData.ProductBudget),
      });
      const response = await fetch('http://localhost:3000/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: Number(formData.phone),
          ProductBudget: Number(formData.ProductBudget),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quote');
      }

      setStatus({ loading: false, message: data.message || 'Quote submitted successfully!', type: 'success' });
      setFormData({
        projectType: '',
        name: '',
        email: '',
        companyName: '',
        phone: '',
        ProductBudget: '',
        productTimeline: '',
        productDescription: '',
        additionalServices: '',
      });
    } catch (error) {
      setStatus({ loading: false, message: error.message, type: 'error' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="w-full h-full opacity-5 animate-pulse-slow"
          viewBox="0 0 1440 800"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 800C0 800 300 600 720 600C1140 600 1440 800 1440 800V0H0V800Z"
            fill="url(#gradient)"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#4b5563', stopOpacity: 0.3 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-gray-900 text-center mb-4 sticky top-0 bg-gradient-to-b from-white/90 to-transparent py-4"
        >
          Get Your Project Quote
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl text-gray-600 text-center mb-12"
        >
          Tell us about your project, and we’ll provide a detailed quote within 24 hours. No hidden fees, just transparent pricing.
        </motion.p>

        {/* Form Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-gray-100"
        >
          <motion.h2
            variants={fieldVariants}
            className="text-3xl font-semibold text-gray-800 mb-4"
          >
            Project Details
          </motion.h2>
          <motion.p
            variants={fieldVariants}
            className="text-gray-600 mb-6"
          >
            Fill out the form below to get started
          </motion.p>

          {/* Status Message */}
          {status.message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 mb-6 rounded-md ${
                status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
              role="alert"
            >
              {status.message}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={fieldVariants}>
              <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">
                Project Type <span className="text-red-500">*</span>
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className={`mt-1 block w-full p-3 border ${
                  errors.projectType ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-300`}
                required
                aria-describedby={errors.projectType ? 'projectType-error' : undefined}
              >
                <option value="">Select Project Type</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="E-commerce Solutions">E-commerce Solutions</option>
                <option value="Custom Software Development">Custom Software Development</option>
              </select>
              {errors.projectType && (
                <p id="projectType-error" className="mt-1 text-sm text-red-500">
                  {errors.projectType}
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={`mt-1 block w-full p-3 border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-300`}
                required
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-500">
                  {errors.name}
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className={`mt-1 block w-full p-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-300`}
                required
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                className={`mt-1 block w-full p-3 border ${
                  errors.companyName ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-300`}
                required
                aria-describedby={errors.companyName ? 'companyName-error' : undefined}
              />
              {errors.companyName && (
                <p id="companyName-error" className="mt-1 text-sm text-red-500">
                  {errors.companyName}
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className={`mt-1 block w-full p-3 border ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-300`}
                required
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-500">
                  {errors.phone}
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label htmlFor="ProductBudget" className="block text-sm font-medium text-gray-700">
                Product Budget (USD) <span className="text-red-500">*</span>
              </label>
              <input
                id="ProductBudget"
                name="ProductBudget"
                type="number"
                value={formData.ProductBudget}
                onChange={handleChange}
                placeholder="Product Budget (USD)"
                className={`mt-1 block w-full p-3 border ${
                  errors.ProductBudget ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-300`}
                required
                aria-describedby={errors.ProductBudget ? 'ProductBudget-error' : undefined}
              />
              {errors.ProductBudget && (
                <p id="ProductBudget-error" className="mt-1 text-sm text-red-500">
                  {errors.ProductBudget}
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="md:col-span-2">
              <label htmlFor="productTimeline" className="block text-sm font-medium text-gray-700">
                Project Timeline <span className="text-red-500">*</span>
              </label>
              <input
                id="productTimeline"
                name="productTimeline"
                type="text"
                value={formData.productTimeline}
                onChange={handleChange}
                placeholder="Project Timeline (e.g., 3 months)"
                className={`mt-1 block w-full p-3 border ${
                  errors.productTimeline ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-300`}
                required
                aria-describedby={errors.productTimeline ? 'productTimeline-error' : undefined}
              />
              {errors.productTimeline && (
                <p id="productTimeline-error" className="mt-1 text-sm text-red-500">
                  {errors.productTimeline}
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="md:col-span-2">
              <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
                Project Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="productDescription"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
                placeholder="Project Description"
                className={`mt-1 block w-full p-3 border ${
                  errors.productDescription ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white h-32 transition-all duration-300`}
                required
                aria-describedby={errors.productDescription ? 'productDescription-error' : undefined}
              ></textarea>
              {errors.productDescription && (
                <p id="productDescription-error" className="mt-1 text-sm text-red-500">
                  {errors.productDescription}
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="md:col-span-2">
              <label htmlFor="additionalServices" className="block text-sm font-medium text-gray-700">
                Additional Services (Optional)
              </label>
              <textarea
                id="additionalServices"
                name="additionalServices"
                value={formData.additionalServices}
                onChange={handleChange}
                placeholder="Additional Services (if any)"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white h-32 transition-all duration-300"
              ></textarea>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:col-span-2"
            >
              <button
                type="submit"
                disabled={status.loading}
                className={`w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center ${
                  status.loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-busy={status.loading}
              >
                {status.loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Get Quote'
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* CSS for slow pulse animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
      `}</style>
    </motion.div>
  );
}

export default QuotePage;