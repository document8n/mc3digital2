import { motion } from "framer-motion";
import { Code2, Database, Globe2, Layout, Server, Smartphone } from "lucide-react";

const services = [
  { 
    title: "Outsourced CTO", 
    description: "Strategic technology leadership and guidance",
    icon: Globe2
  },
  { 
    title: "Tech Stack Administration", 
    description: "Comprehensive technology infrastructure management",
    icon: Server
  },
  { 
    title: "Application QA", 
    description: "Thorough quality assurance and testing",
    icon: Code2
  },
  { 
    title: "Frontend Development", 
    description: "Creating engaging user interfaces",
    icon: Layout
  },
  { 
    title: "Backend Development", 
    description: "Robust server-side solutions",
    icon: Database
  },
  { 
    title: "Custom Applications", 
    description: "Tailored software solutions",
    icon: Smartphone
  },
];

export const Services = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full mb-4"
          >
            Our Services
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
          >
            Comprehensive Digital Solutions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            From strategy to execution, we provide end-to-end digital services
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 rounded-xl hover-lift group"
              >
                <div className="mb-6 inline-block p-4 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white group-hover:scale-110 transform transition-transform duration-300">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};