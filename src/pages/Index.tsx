
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Building, Ticket, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // If user is already logged in, redirect to their dashboard
  React.useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/member");
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-livo-600">
              <span className="text-lg font-bold text-white">L</span>
            </div>
            <span className="text-xl font-bold">Livo</span>
          </div>
          <Button onClick={() => navigate("/login")}>Sign In</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-livo-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Simplify Residential <span className="text-livo-600">Facility Management</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-md">
                A powerful platform that streamlines ticket management for residential properties.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-livo-600 hover:bg-livo-700" onClick={() => navigate("/login")}>
                  Get Started
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full rounded-xl bg-livo-200"></div>
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" 
                  alt="Residential building management" 
                  className="relative rounded-xl shadow-lg object-cover h-64 w-full md:h-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="h-12 w-12 bg-livo-100 rounded-lg text-livo-700 flex items-center justify-center mb-4">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Site Management</h3>
              <p className="text-gray-600">
                Efficiently manage multiple residential properties from a single, centralized dashboard.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="h-12 w-12 bg-livo-100 rounded-lg text-livo-700 flex items-center justify-center mb-4">
                <Ticket className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Streamlined Ticketing</h3>
              <p className="text-gray-600">
                Simple issue reporting and tracking system for residents and management teams.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="h-12 w-12 bg-livo-100 rounded-lg text-livo-700 flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
              <p className="text-gray-600">
                Custom permissions for admins, managers, and residents with tailored interfaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Built for Every Role</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Livo provides customized experiences for everyone involved in property management
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="h-10 w-10 bg-blue-100 rounded-full text-blue-700 flex items-center justify-center mb-4">
                <span className="font-bold">A</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">For Admins</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-livo-600 mr-2">✓</span>
                  <span>Manage entire organization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-livo-600 mr-2">✓</span>
                  <span>Configure sites and user permissions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-livo-600 mr-2">✓</span>
                  <span>Access organization-wide analytics</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="h-10 w-10 bg-green-100 rounded-full text-green-700 flex items-center justify-center mb-4">
                <span className="font-bold">M</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">For Managers</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-livo-600 mr-2">✓</span>
                  <span>Oversee assigned properties</span>
                </li>
                <li className="flex items-start">
                  <span className="text-livo-600 mr-2">✓</span>
                  <span>Manage and assign tickets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-livo-600 mr-2">✓</span>
                  <span>Track site-specific performance metrics</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="h-10 w-10 bg-amber-100 rounded-full text-amber-700 flex items-center justify-center mb-4">
                <span className="font-bold">R</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">For Residents</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-livo-600 mr-2">✓</span>
                  <span>Easily submit maintenance requests</span>
                </li>
                <li className="flex items-start">
                  <span className="text-livo-600 mr-2">✓</span>
                  <span>Track the status of your tickets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-livo-600 mr-2">✓</span>
                  <span>Communicate with building management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-livo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to streamline your property management?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-livo-100">
            Join thousands of property managers who trust Livo for their facility management needs.
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate("/login")}>
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white">
                  <span className="text-lg font-bold text-livo-600">L</span>
                </div>
                <span className="text-xl font-bold text-white">Livo</span>
              </div>
              <p className="max-w-xs text-sm">
                Simplifying residential facility management with powerful tools and streamlined workflows.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">PRODUCT</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white">Features</a></li>
                  <li><a href="#" className="hover:text-white">Pricing</a></li>
                  <li><a href="#" className="hover:text-white">Testimonials</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">COMPANY</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white">About</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">LEGAL</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-center md:text-left md:flex justify-between">
            <p>&copy; 2025 Livo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
