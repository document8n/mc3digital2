import AdminMenu from "@/components/AdminMenu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code2, Database, Globe2, Layout, Server, Smartphone, Briefcase, Wrench, Shield, Gauge, Boxes, Clock } from "lucide-react";

const serviceCategories = [
  {
    title: "Strategic Leadership",
    items: [
      {
        icon: Briefcase,
        name: "Outsourced CTO",
        description: "Strategic technology leadership, architecture decisions, and roadmap development"
      },
      {
        icon: Server,
        name: "Tech Stack Administration",
        description: "System architecture maintenance, performance optimization, and infrastructure scaling"
      }
    ]
  },
  {
    title: "Development Services",
    items: [
      {
        icon: Code2,
        name: "Software Development",
        description: "Full-stack development, custom solutions, and application maintenance"
      },
      {
        icon: Globe2,
        name: "Web & App Development",
        description: "Responsive web applications and mobile app development"
      },
      {
        icon: Database,
        name: "Backend Development",
        description: "Server-side architecture, database design, and API development"
      }
    ]
  },
  {
    title: "User Experience & Design",
    items: [
      {
        icon: Layout,
        name: "UI/UX Design",
        description: "User interface design, user experience optimization, and usability testing"
      },
      {
        icon: Smartphone,
        name: "Customer Experience (CX)",
        description: "Customer journey mapping, touchpoint optimization, and experience refinement"
      }
    ]
  },
  {
    title: "Quality & Operations",
    items: [
      {
        icon: Shield,
        name: "Application QA",
        description: "Quality assurance, testing automation, and performance optimization"
      },
      {
        icon: Wrench,
        name: "Day-to-Day Operations",
        description: "System maintenance, troubleshooting, and administrative support"
      }
    ]
  },
  {
    title: "Specialized Solutions",
    items: [
      {
        icon: Boxes,
        name: "No-Code Development",
        description: "Platform selection, workflow automation, and integration setup"
      },
      {
        icon: Gauge,
        name: "App Prototyping",
        description: "Rapid prototyping, MVP development, and proof of concept"
      }
    ]
  },
  {
    title: "Integration & Support",
    items: [
      {
        icon: Clock,
        name: "System Integration",
        description: "Third-party API integration, migrations, and upgrades"
      },
      {
        icon: Database,
        name: "Project Management",
        description: "Project planning, resource allocation, and timeline management"
      }
    ]
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <AdminMenu />
      <div className="pl-64">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-gray-300">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className="space-y-12">
            {serviceCategories.map((category, index) => (
              <div key={index} className="space-y-6">
                <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {category.items.map((service, serviceIndex) => {
                    const Icon = service.icon;
                    return (
                      <Card 
                        key={serviceIndex}
                        className="hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                      >
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                              <Icon className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl text-white">{service.name}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-gray-400">
                            {service.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-lg bg-gray-800/50 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-3">Note:</h3>
            <p className="text-gray-300">
              Our services are customizable to meet your specific requirements. Contact us for detailed pricing and scope information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;