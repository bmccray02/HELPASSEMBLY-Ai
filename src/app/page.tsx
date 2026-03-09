'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  LayoutDashboard, Wrench, Users, Calendar, DollarSign, Settings, 
  Plus, Search, Edit, Trash2, Eye, ChevronDown, ChevronRight,
  TrendingUp, Clock, CheckCircle, AlertCircle, Phone, Mail,
  MapPin, Building, User, ChevronUp, MoreHorizontal, RefreshCw,
  GripVertical, ArrowUpDown, Filter, Download, Upload, Sparkles,
  Monitor, Dumbbell, UtensilsCrossed, Trees, Lightbulb, Sofa
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

// Types
interface Service {
  id: string;
  name: string;
  slug: string;
  basePrice: number;
  priceType: string;
  shortDesc: string | null;
  includes: string | null;
  imageUrl: string | null;
  isActive: boolean;
  isFeatured: boolean;
  category?: { id: string; name: string; color: string | null } | null;
  addOns?: { id: string; name: string; price: number }[];
}

interface Customer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string | null;
  email: string | null;
  phone: string | null;
  mobile: string | null;
  company: string | null;
  city: string | null;
  state: string | null;
  status: string;
  group: string | null;
  source: string | null;
  totalSpent: number;
  totalBookings: number;
  _count?: { bookings: number };
}

interface Booking {
  id: string;
  bookingDate: string | null;
  status: string;
  totalPrice: number;
  address: string | null;
  city: string | null;
  customer?: Customer | null;
  service?: Service | null;
  technician?: { id: string; firstName: string; lastName: string } | null;
}

interface Technician {
  id: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  status: string;
  baseCity: string | null;
  rating: number;
  totalJobs: number;
  _count?: { bookings: number };
}

interface DashboardStats {
  totalServices: number;
  activeServices: number;
  totalCustomers: number;
  activeCustomers: number;
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  todayBookings: number;
  totalTechnicians: number;
  activeTechnicians: number;
}

interface DashboardData {
  stats: DashboardStats;
  revenue: { total: number; thisMonth: number; bookingsThisMonth: number };
  recentBookings: Booking[];
  topServices: (Service & { _count: { bookings: number } })[];
  statusBreakdown: Record<string, number>;
  customerGroups: { name: string; count: number }[];
}

// Category Icons
const categoryIcons: Record<string, React.ReactNode> = {
  'installation': <Wrench className="w-4 h-4" />,
  'furniture': <Sofa className="w-4 h-4" />,
  'fitness': <Dumbbell className="w-4 h-4" />,
  'outdoor': <Trees className="w-4 h-4" />,
  'electronics': <Monitor className="w-4 h-4" />,
  'grill': <UtensilsCrossed className="w-4 h-4" />,
};

// Status Colors
const statusColors: Record<string, string> = {
  'pending': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  'confirmed': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'in_progress': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  'completed': 'bg-green-500/10 text-green-600 border-green-500/20',
  'cancelled': 'bg-red-500/10 text-red-600 border-red-500/20',
};

export default function AvaCommandDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Dialogs
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Fetch data
  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard');
      const data = await res.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  }, []);

  const fetchCustomers = useCallback(async () => {
    try {
      const res = await fetch('/api/customers');
      const data = await res.json();
      setCustomers(data.customers || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  }, []);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  }, []);

  const fetchTechnicians = useCallback(async () => {
    try {
      const res = await fetch('/api/technicians');
      const data = await res.json();
      setTechnicians(data.technicians || []);
    } catch (error) {
      console.error('Error fetching technicians:', error);
    }
  }, []);

  const seedDatabase = async () => {
    try {
      toast.info('Seeding database...');
      const res = await fetch('/api/seed');
      const data = await res.json();
      if (data.success) {
        toast.success(`Database seeded! ${data.counts.customersImported} customers imported.`);
        fetchDashboard();
        fetchServices();
        fetchCustomers();
        fetchTechnicians();
      } else {
        toast.error('Failed to seed database');
      }
    } catch (error) {
      toast.error('Error seeding database');
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([
        fetchDashboard(),
        fetchServices(),
        fetchCustomers(),
        fetchBookings(),
        fetchTechnicians()
      ]);
      setLoading(false);
    };
    init();
  }, [fetchDashboard, fetchServices, fetchCustomers, fetchBookings, fetchTechnicians]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // Filter customers
  const filteredCustomers = customers.filter(c => {
    const matchesSearch = searchQuery === '' || 
      c.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.mobile?.includes(searchQuery) ||
      c.phone?.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter bookings
  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Ava Command Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Ava Command Dashboard</h1>
              <p className="text-xs text-muted-foreground">HelpAssembly Service Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-9 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" onClick={() => {
              fetchDashboard();
              fetchServices();
              fetchCustomers();
              fetchBookings();
              fetchTechnicians();
            }}>
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button onClick={seedDatabase}>
              <Upload className="w-4 h-4 mr-2" />
              Import Data
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-73px)] border-r bg-card/30 p-4">
          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'services', label: 'Services', icon: Wrench },
              { id: 'customers', label: 'Customers', icon: Users },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
              { id: 'technicians', label: 'Technicians', icon: User },
              { id: 'pricing', label: 'Pricing Rules', icon: DollarSign },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
          
          <Separator className="my-4" />
          
          {/* Quick Stats */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4">Quick Stats</h3>
            <div className="space-y-2 px-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Active Services</span>
                <Badge variant="secondary">{dashboardData?.stats.activeServices || 0}</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Pending Bookings</span>
                <Badge variant="secondary">{dashboardData?.stats.pendingBookings || 0}</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Today's Jobs</span>
                <Badge variant="secondary">{dashboardData?.stats.todayBookings || 0}</Badge>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && dashboardData && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(dashboardData.revenue.total)}</div>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(dashboardData.revenue.thisMonth)} this month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.stats.totalBookings}</div>
                    <p className="text-xs text-muted-foreground">
                      {dashboardData.stats.pendingBookings} pending
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.stats.totalCustomers}</div>
                    <p className="text-xs text-muted-foreground">
                      {dashboardData.stats.activeCustomers} active
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Technicians</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.stats.activeTechnicians}</div>
                    <p className="text-xs text-muted-foreground">
                      of {dashboardData.stats.totalTechnicians} total
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts and Tables Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>Latest service requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-4">
                        {dashboardData.recentBookings.map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Wrench className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">
                                  {booking.customer?.firstName || booking.customer?.displayName || 'Unknown Customer'}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {booking.service?.name || 'Service'}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-sm">{formatCurrency(booking.totalPrice)}</p>
                              <Badge className={statusColors[booking.status]} variant="outline">
                                {booking.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Top Services */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Services</CardTitle>
                    <CardDescription>Most booked services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.topServices.map((service, index) => (
                        <div key={service.id} className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{service.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {service._count?.bookings || 0} bookings
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(service.basePrice)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Status Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking Status Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(dashboardData.statusBreakdown).map(([status, count]) => (
                      <div key={status} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className={`w-3 h-3 rounded-full ${
                          status === 'completed' ? 'bg-green-500' :
                          status === 'pending' ? 'bg-yellow-500' :
                          status === 'cancelled' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`} />
                        <div>
                          <p className="text-2xl font-bold">{count}</p>
                          <p className="text-xs text-muted-foreground capitalize">{status.replace('_', ' ')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Services</h2>
                  <p className="text-muted-foreground">Manage your service offerings</p>
                </div>
                <Dialog open={serviceDialogOpen} onOpenChange={setServiceDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingItem(null)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingItem ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                      <DialogDescription>
                        {editingItem ? 'Update service details' : 'Create a new service offering'}
                      </DialogDescription>
                    </DialogHeader>
                    <ServiceForm 
                      service={editingItem} 
                      onSuccess={() => {
                        setServiceDialogOpen(false);
                        fetchServices();
                      }} 
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <Card key={service.id} className="overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative">
                      {service.imageUrl ? (
                        <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {service.category?.slug && categoryIcons[service.category.slug] ? (
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                              {categoryIcons[service.category.slug]}
                            </div>
                          ) : (
                            <Wrench className="w-12 h-12 text-muted-foreground/30" />
                          )}
                        </div>
                      )}
                      {service.isFeatured && (
                        <Badge className="absolute top-2 right-2" variant="secondary">Featured</Badge>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          {service.category && (
                            <Badge variant="outline" className="mt-1" style={{ 
                              backgroundColor: service.category.color ? `${service.category.color}15` : undefined,
                              borderColor: service.category.color || undefined,
                              color: service.category.color || undefined
                            }}>
                              {service.category.name}
                            </Badge>
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => {
                              setEditingItem(service);
                              setServiceDialogOpen(true);
                            }}>
                              <Edit className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{service.shortDesc}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold">{formatCurrency(service.basePrice)}</p>
                          <p className="text-xs text-muted-foreground capitalize">{service.priceType}</p>
                        </div>
                        <Badge variant={service.isActive ? "default" : "secondary"}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Customers</h2>
                  <p className="text-muted-foreground">{customers.length} total customers</p>
                </div>
                <Dialog open={customerDialogOpen} onOpenChange={setCustomerDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingItem(null)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Customer
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingItem ? 'Edit Customer' : 'Add New Customer'}</DialogTitle>
                    </DialogHeader>
                    <CustomerForm 
                      customer={editingItem}
                      onSuccess={() => {
                        setCustomerDialogOpen(false);
                        fetchCustomers();
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search customers..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Customers Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Group</TableHead>
                        <TableHead>Bookings</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.slice(0, 20).map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-medium">
                                  {(customer.firstName?.[0] || customer.displayName?.[0] || '?').toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">
                                  {customer.firstName && customer.lastName 
                                    ? `${customer.firstName} ${customer.lastName}` 
                                    : customer.displayName || 'Unknown'}
                                </p>
                                {customer.company && (
                                  <p className="text-xs text-muted-foreground">{customer.company}</p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {customer.email && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Mail className="w-3 h-3" />
                                  {customer.email}
                                </div>
                              )}
                              {(customer.mobile || customer.phone) && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Phone className="w-3 h-3" />
                                  {customer.mobile || customer.phone}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {customer.city && customer.state && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                {customer.city}, {customer.state}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {customer.group && (
                              <Badge variant="outline">{customer.group}</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{customer._count?.bookings || customer.totalBookings || 0}</span>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{formatCurrency(customer.totalSpent)}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                              {customer.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => {
                                  setEditingItem(customer);
                                  setCustomerDialogOpen(true);
                                }}>
                                  <Edit className="w-4 h-4 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" /> View Details
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Bookings</h2>
                  <p className="text-muted-foreground">Manage service bookings</p>
                </div>
                <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingItem(null)}>
                      <Plus className="w-4 h-4 mr-2" />
                      New Booking
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingItem ? 'Edit Booking' : 'Create New Booking'}</DialogTitle>
                    </DialogHeader>
                    <BookingForm 
                      booking={editingItem}
                      services={services}
                      customers={customers}
                      technicians={technicians}
                      onSuccess={() => {
                        setBookingDialogOpen(false);
                        fetchBookings();
                        fetchDashboard();
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bookings Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Booking</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Technician</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.slice(0, 20).map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>
                            <span className="font-mono text-xs text-muted-foreground">
                              #{booking.id.slice(-6).toUpperCase()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">
                                {booking.customer?.firstName || booking.customer?.displayName || 'Unknown'}
                              </p>
                              {booking.city && (
                                <p className="text-xs text-muted-foreground">{booking.city}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span>{booking.service?.name || 'N/A'}</span>
                          </TableCell>
                          <TableCell>
                            {booking.technician ? (
                              <span>{booking.technician.firstName} {booking.technician.lastName}</span>
                            ) : (
                              <span className="text-muted-foreground">Unassigned</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {booking.bookingDate ? (
                              <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                            ) : (
                              <span className="text-muted-foreground">TBD</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{formatCurrency(booking.totalPrice)}</span>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusColors[booking.status]} variant="outline">
                              {booking.status.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => {
                                  setEditingItem(booking);
                                  setBookingDialogOpen(true);
                                }}>
                                  <Edit className="w-4 h-4 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Technicians Tab */}
          {activeTab === 'technicians' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Technicians</h2>
                  <p className="text-muted-foreground">Manage your service team</p>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Technician
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {technicians.map((tech) => (
                  <Card key={tech.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-lg font-bold">
                              {tech.firstName[0]}{tech.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <CardTitle className="text-lg">{tech.firstName} {tech.lastName}</CardTitle>
                            {tech.baseCity && (
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {tech.baseCity}
                              </p>
                            )}
                          </div>
                        </div>
                        <Badge variant={tech.status === 'active' ? 'default' : 'secondary'}>
                          {tech.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Total Jobs</p>
                          <p className="text-lg font-bold">{tech.totalJobs}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Rating</p>
                          <p className="text-lg font-bold">{tech.rating > 0 ? tech.rating.toFixed(1) : 'N/A'}</p>
                        </div>
                      </div>
                      {tech.phone && (
                        <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {tech.phone}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Picing Intelligence</h2>
                  <p className="text-muted-foreground">Configure dynamic pricing rules</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Location Multipliers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Atlanta</span>
                      <Badge variant="outline">1.10x</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tampa</span>
                      <Badge variant="outline">1.00x</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Orlando</span>
                      <Badge variant="outline">1.00x</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Urgency Fees</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Same Day</span>
                      <Badge variant="outline">+15%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Next Day</span>
                      <Badge variant="outline">+8%</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Distance Fees</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Base Distance</span>
                      <Badge variant="outline">20 miles</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Per Mile Rate</span>
                      <Badge variant="outline">$1.50</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing Calculator</CardTitle>
                  <CardDescription>Calculate service price with all modifiers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Base Service</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((s) => (
                            <SelectItem key={s.id} value={s.id}>{s.name} - {formatCurrency(s.basePrice)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Select defaultValue="atlanta">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="atlanta">Atlanta (1.10x)</SelectItem>
                          <SelectItem value="tampa">Tampa (1.00x)</SelectItem>
                          <SelectItem value="orlando">Orlando (1.00x)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Urgency</Label>
                      <Select defaultValue="standard">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="nextday">Next Day (+8%)</SelectItem>
                          <SelectItem value="sameday">Same Day (+15%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-card/80 backdrop-blur-sm border-t py-3 px-6">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <p>Ava Command Dashboard v1.0 - HelpAssembly Services LLC</p>
          <p>Last updated: {new Date().toLocaleString()}</p>
        </div>
      </footer>
    </div>
  );
}

// Service Form Component
function ServiceForm({ service, onSuccess }: { service: any; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    basePrice: service?.basePrice || '',
    shortDesc: service?.shortDesc || '',
    includes: service?.includes || '',
    isActive: service?.isActive ?? true
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = service ? `/api/services/${service.id}` : '/api/services';
      const method = service ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          basePrice: parseFloat(formData.basePrice) || 0
        })
      });
      
      if (res.ok) {
        toast.success(service ? 'Service updated!' : 'Service created!');
        onSuccess();
      } else {
        toast.error('Failed to save service');
      }
    } catch (error) {
      toast.error('Error saving service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Service Name</Label>
          <Input 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., TV Mounting"
            required
          />
        </div>
        <div>
          <Label>Base Price</Label>
          <Input 
            type="number"
            step="0.01"
            value={formData.basePrice}
            onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
            placeholder="99.00"
            required
          />
        </div>
      </div>
      <div>
        <Label>Short Description</Label>
        <Input 
          value={formData.shortDesc}
          onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
          placeholder="Brief description for service cards"
        />
      </div>
      <div>
        <Label>What's Included</Label>
        <Textarea 
          value={formData.includes}
          onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
          placeholder="e.g., full assembly, unboxing, anchoring"
        />
      </div>
      <div className="flex items-center gap-2">
        <Switch 
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
        />
        <Label>Active</Label>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : (service ? 'Update Service' : 'Create Service')}
        </Button>
      </DialogFooter>
    </form>
  );
}

// Customer Form Component
function CustomerForm({ customer, onSuccess }: { customer: any; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    email: customer?.email || '',
    mobile: customer?.mobile || '',
    phone: customer?.phone || '',
    street: customer?.street || '',
    city: customer?.city || '',
    state: customer?.state || '',
    zip: customer?.zip || '',
    group: customer?.group || '',
    source: customer?.source || '',
    notes: customer?.notes || '',
    status: customer?.status || 'Active'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = customer ? `/api/customers/${customer.id}` : '/api/customers';
      const method = customer ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        toast.success(customer ? 'Customer updated!' : 'Customer created!');
        onSuccess();
      } else {
        toast.error('Failed to save customer');
      }
    } catch (error) {
      toast.error('Error saving customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>First Name</Label>
          <Input 
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input 
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Email</Label>
          <Input 
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <Label>Mobile</Label>
          <Input 
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Label>Street Address</Label>
          <Input 
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          />
        </div>
        <div>
          <Label>City</Label>
          <Input 
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>State</Label>
          <Input 
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            placeholder="GA"
          />
        </div>
        <div>
          <Label>ZIP</Label>
          <Input 
            value={formData.zip}
            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
          />
        </div>
        <div>
          <Label>Status</Label>
          <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Group</Label>
          <Input 
            value={formData.group}
            onChange={(e) => setFormData({ ...formData, group: e.target.value })}
            placeholder="e.g., Amazon Atlanta"
          />
        </div>
        <div>
          <Label>Source</Label>
          <Input 
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            placeholder="e.g., Thumbtack"
          />
        </div>
      </div>
      <div>
        <Label>Notes</Label>
        <Textarea 
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : (customer ? 'Update Customer' : 'Create Customer')}
        </Button>
      </DialogFooter>
    </form>
  );
}

// Booking Form Component
function BookingForm({ booking, services, customers, technicians, onSuccess }: { 
  booking: any; 
  services: Service[];
  customers: Customer[];
  technicians: Technician[];
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    customerId: booking?.customerId || '',
    serviceId: booking?.serviceId || '',
    technicianId: booking?.technicianId || '',
    bookingDate: booking?.bookingDate?.split('T')[0] || '',
    status: booking?.status || 'pending',
    address: booking?.address || '',
    city: booking?.city || '',
    state: booking?.state || '',
    zip: booking?.zip || '',
    basePrice: booking?.basePrice || '',
    totalPrice: booking?.totalPrice || '',
    customerNotes: booking?.customerNotes || '',
    internalNotes: booking?.internalNotes || ''
  });
  const [loading, setLoading] = useState(false);

  const handleServiceChange = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    setFormData({ 
      ...formData, 
      serviceId, 
      basePrice: service?.basePrice || '',
      totalPrice: service?.basePrice || ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = booking ? `/api/bookings/${booking.id}` : '/api/bookings';
      const method = booking ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          basePrice: parseFloat(formData.basePrice) || 0,
          totalPrice: parseFloat(formData.totalPrice) || 0
        })
      });
      
      if (res.ok) {
        toast.success(booking ? 'Booking updated!' : 'Booking created!');
        onSuccess();
      } else {
        toast.error('Failed to save booking');
      }
    } catch (error) {
      toast.error('Error saving booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Customer</Label>
          <Select value={formData.customerId} onValueChange={(v) => setFormData({ ...formData, customerId: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.slice(0, 50).map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.firstName && c.lastName ? `${c.firstName} ${c.lastName}` : c.displayName || c.email || c.mobile}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Service</Label>
          <Select value={formData.serviceId} onValueChange={handleServiceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.name} - ${s.basePrice}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Technician</Label>
          <Select value={formData.technicianId} onValueChange={(v) => setFormData({ ...formData, technicianId: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Assign technician" />
            </SelectTrigger>
            <SelectContent>
              {technicians.filter(t => t.status === 'active').map((t) => (
                <SelectItem key={t.id} value={t.id}>{t.firstName} {t.lastName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Date</Label>
          <Input 
            type="date"
            value={formData.bookingDate}
            onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
          />
        </div>
        <div>
          <Label>Status</Label>
          <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Address</Label>
          <Input 
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <Label>City</Label>
            <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
          </div>
          <div>
            <Label>State</Label>
            <Input value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
          </div>
          <div>
            <Label>ZIP</Label>
            <Input value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Base Price</Label>
          <Input 
            type="number"
            step="0.01"
            value={formData.basePrice}
            onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
          />
        </div>
        <div>
          <Label>Total Price</Label>
          <Input 
            type="number"
            step="0.01"
            value={formData.totalPrice}
            onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label>Customer Notes</Label>
        <Textarea 
          value={formData.customerNotes}
          onChange={(e) => setFormData({ ...formData, customerNotes: e.target.value })}
        />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : (booking ? 'Update Booking' : 'Create Booking')}
        </Button>
      </DialogFooter>
    </form>
  );
}
