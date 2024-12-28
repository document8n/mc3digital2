import AdminMenu from "@/components/AdminMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, DollarSign, CheckCircle2, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InvoiceForm } from "@/components/InvoiceForm";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const Invoices = () => {
  console.log("Rendering Invoices page");
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isMobile = useIsMobile();

  const { data: invoices, isLoading, refetch } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      console.log("Fetching invoices");
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          clients (
            business_name,
            contact_name
          )
        `)
        .order('due_date', { ascending: false });

      if (error) {
        console.error("Error fetching invoices:", error);
        throw error;
      }
      console.log("Fetched invoices:", data);
      return data;
    },
  });

  const handleEditInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedInvoice(null);
    refetch();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-green-500';
      case 'overdue':
        return 'text-red-500';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <AdminMenu />
      <div className={cn(
        "transition-all duration-300",
        isMobile ? "pt-16" : "ml-64"
      )}>
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Invoices</h1>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button className="hover:scale-105 transition-transform">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>
                    {selectedInvoice ? "Edit Invoice" : "Create New Invoice"}
                  </DialogTitle>
                </DialogHeader>
                <InvoiceForm
                  initialData={selectedInvoice}
                  onSuccess={handleFormSuccess}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Total Outstanding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  ${invoices?.reduce((sum, inv) => sum + (inv.status === 'pending' ? Number(inv.amount) : 0), 0).toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Paid This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  ${invoices?.reduce((sum, inv) => sum + (inv.status === 'paid' ? Number(inv.amount) : 0), 0).toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Total Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{invoices?.length || 0}</p>
              </CardContent>
            </Card>
          </div>

          {isLoading ? (
            <div className="text-center text-white">Loading invoices...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {invoices?.map((invoice) => (
                <Card 
                  key={invoice.id} 
                  className="hover:scale-105 transition-transform duration-200 cursor-pointer"
                  onClick={() => handleEditInvoice(invoice)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>#{invoice.invoice_number}</span>
                      <span className={`text-sm ${getStatusColor(invoice.status)}`}>
                        {invoice.status.toUpperCase()}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-sm space-y-2">
                        <p className="font-medium text-foreground">
                          {invoice.clients?.business_name}
                        </p>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Due: {format(new Date(invoice.due_date), 'MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <DollarSign className="h-4 w-4 mr-2" />
                          <span>${Number(invoice.amount).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm pt-2 border-t">
                        {invoice.status === 'paid' ? (
                          <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 mr-1 text-yellow-500" />
                        )}
                        <span>{invoice.status === 'paid' ? 'Paid' : 'Pending'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoices;