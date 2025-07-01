import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from 'emailjs-com';
import contactlogo from '../assets/contact.svg';
import emailIcon from '../assets/email.svg';
import locationlogo from '../assets/location.svg';
import Particles from '../particles';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    toast.promise(
      emailjs.sendForm(
        'service_nhwc2um',
        'template_gfvnjn9',
        form.current,
        'kbcjoXlncAcEsc2EC'
      ),
      {
        loading: 'Sending...',
        success: () => {
          form.current.reset();
          return 'Message sent successfully!';
        },
        error: 'Failed to send message. Try again.',
      }
    );
  };

  return (
    <section className='bg-black-400 text-white relative overflow-hidden py-16 px-6 md:px-12'>
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#d8b4fe', '#c084fc']} // light purple bubbles
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Toast notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start relative z-10">
        {/* Info Block */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-indigo-700 leading-tight">
            Let’s Build Something <br className="hidden md:block" />
            Amazing Together
          </h1>
          <p className="text-gray-600 text-lg">
            Ready to start your next project? Get in touch and let's bring your vision to life.
          </p>

          <div className="space-y-4 text-gray-800 text-base">
            <div className="flex items-center gap-3">
              <img src={emailIcon} alt="Email" className="w-5 h-5" />
              <span>vibhugupta022@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <img src={locationlogo} alt="Location" className="w-5 h-5" />
              <span>Lucknow, India</span>
            </div>
            <div className="flex items-center gap-3">
              <img src={contactlogo} alt="Phone" className="w-5 h-5" />
              <span>+91 9044429919</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-200"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Your Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Enter your name"
                className="w-full mt-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Your Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Enter your email"
                className="w-full mt-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Your Message</label>
              <textarea
                name="message"
                placeholder="Type your message here..."
                rows="5"
                className="w-full mt-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
