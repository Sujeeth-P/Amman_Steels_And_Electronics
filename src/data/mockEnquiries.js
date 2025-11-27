export const mockEnquiries = [
  {
    id: 'ENQ-2024-001',
    customerName: 'Ramesh Constructions',
    email: 'ramesh@construct.com',
    phone: '+91 98765 43210',
    date: '2024-03-10',
    status: 'Pending',
    items: [
      { name: 'TMT Bar - Grade 550D', quantity: 50, unit: 'Ton' },
      { name: 'UltraTech OPC 53 Grade', quantity: 200, unit: 'Bag' }
    ],
    totalEstimated: 3334000
  },
  {
    id: 'ENQ-2024-002',
    customerName: 'City Infrastructure Ltd',
    email: 'procurement@cityinfra.in',
    phone: '+91 99887 76655',
    date: '2024-03-09',
    status: 'Contacted',
    items: [
      { name: 'MS Square Pipes', quantity: 500, unit: 'Kg' }
    ],
    totalEstimated: 29000
  },
  {
    id: 'ENQ-2024-003',
    customerName: 'Velu Home Builders',
    email: 'velu@gmail.com',
    phone: '+91 88776 65544',
    date: '2024-03-08',
    status: 'Closed',
    items: [
      { name: 'Modular Switches Set', quantity: 20, unit: 'Box' },
      { name: 'Copper Wiring 2.5mm', quantity: 10, unit: 'Coil' }
    ],
    totalEstimated: 42000
  }
];

export const dashboardStats = [
  { label: 'Total Enquiries', value: '124', change: '+12%', trend: 'up' },
  { label: 'Pending Quotes', value: '8', change: '-2', trend: 'down' },
  { label: 'Total Products', value: '45', change: '+5', trend: 'up' },
  { label: 'Monthly Revenue', value: '₹4.2M', change: '+18%', trend: 'up' }
];
