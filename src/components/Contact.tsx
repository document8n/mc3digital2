import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: data,
      });

      if (error) throw error;

      setShowSuccess(true);
      e.currentTarget.reset();
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        variant: "default", // This ensures it's not red
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <section id="contact" className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="glass-card p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your message has been sent successfully. Our team will review your inquiry and get back to you within 24 hours.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="inline-block px-4 py-1.5 text-sm font-medium bg-gray-100 rounded-full mb-4">
              Let's Discuss Your Vision
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Transform Your Digital Presence
            </h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you're a seasoned business owner looking to modernize your digital infrastructure, 
                or an entrepreneur ready to establish your online presence, we're here to help you succeed.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-10 rounded-xl shadow-xl backdrop-blur-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  name="name"
                  required
                  type="text"
                  placeholder="John Smith"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell us about your business and what you're looking to achieve..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg font-medium 
                         hover:shadow-lg transform transition-all duration-200 flex items-center justify-center gap-2 
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Start the Conversation
                  <Send className="w-4 h-4" />
                </>
              )}
            </motion.button>
            <p className="text-center text-sm text-gray-500 mt-4">
              We typically respond within 24 hours during business days.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};