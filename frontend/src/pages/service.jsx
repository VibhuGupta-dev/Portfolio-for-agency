import React from 'react';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image-2.jpg';
import image3 from '../assets/image-3.jpg';
import { motion } from 'framer-motion';
import Ballpit from '../ballpit';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, type: 'spring' },
  },
};

const ServiceCard = ({ image, title, description, features }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ scale: 1.05, rotate: -1 }}
    whileTap={{ scale: 0.97 }}
    className="w-72 min-h-[400px] bg-white border rounded-xl shadow-md p-4 flex flex-col justify-start hover:shadow-2xl transition-all duration-300 cursor-pointer dark:bg-gray-900 dark:border-gray-700"
  >
    <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <h2 className="text-2xl font-bold text-center mb-2 text-purple-600">{title}</h2>
    <p className="text-sm text-center text-gray-700 dark:text-gray-300 mb-3 px-1">{description}</p>
    <ul className="text-sm font-semibold text-gray-800 dark:text-gray-200 list-disc ml-6 space-y-1">
      {features.map((feature, i) => (
        <li key={i}>{feature}</li>
      ))}
    </ul>
  </motion.div>
);

function ServicePage() {
  const services = [
    {
      image: image1,
      title: 'Web Development',
      description:
        'Custom websites built with modern technologies and best practices for optimal performance.',
      features: ['React & Next.js', 'Node.js Backend', 'Database Integration'],
    },
    {
      image: image2,
      title: 'UI/UX Design',
      description:
        'Beautiful, intuitive designs that convert visitors into customers and enhance user engagement.',
      features: ['User Research', 'Wireframing', 'Prototyping'],
    },
    {
      image: image3,
      title: 'Admin Dashboards',
      description:
        'Admin panels to manage users, content, inventory, orders, etc. with role-based access control.',
      features: ['React & Next.js', 'Node.js Backend', 'Database Integration'],
    },
  ];

  return (
    <div>
      {/* Ballpit Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Ballpit count={200} gravity={0.7} friction={0.8} wallBounce={0.95} followCursor={true} />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 px-4 py-20"
      >
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center mb-4 text-purple-700"
        >
          Our Services
        </motion.h1>

        <motion.h4
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl font-semibold text-gray-800 dark:text-gray-800 text-center mb-10"
        >
          Comprehensive web development solutions for modern businesses
        </motion.h4>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ServicePage;
