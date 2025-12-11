import { Business } from './types';

// Fallback list if the live map fetch fails
export const INITIAL_BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Court Street Grocers', 
    address: '485 Court St',
    phoneNumber: '(718) 722-7229',
    category: 'Food',
    status: 'confirmed',
    notes: 'Member of Merchants Association'
  },
  {
    id: '2',
    name: 'Union Market',
    address: '402-404 Court St',
    phoneNumber: '(718) 643-0888',
    category: 'Supermarket',
    status: 'confirmed',
    notes: 'Opposes protected lane design'
  },
  {
    id: '3',
    name: 'Marco Polo Ristorante',
    address: '345 Court St',
    phoneNumber: '(718) 852-5015',
    category: 'Restaurant',
    status: 'confirmed',
  },
  {
    id: '4',
    name: 'Enoteca on Court',
    address: '347 Court St',
    phoneNumber: '(718) 243-1000',
    category: 'Restaurant',
    status: 'confirmed',
  },
  {
    id: '5',
    name: 'G. Esposito & Sons Jersey Pork Store',
    address: '357 Court St',
    phoneNumber: '(718) 875-6863',
    category: 'Food',
    status: 'confirmed',
  },
  {
    id: '6',
    name: 'Sam\'s Restaurant',
    address: '238 Court St',
    phoneNumber: '(718) 596-3458',
    category: 'Restaurant',
    status: 'confirmed',
  },
  {
    id: '7',
    name: 'Caputo\'s Bake Shop',
    address: '329 Court St',
    phoneNumber: '(718) 875-6871',
    category: 'Bakery',
    status: 'confirmed',
  },
  {
    id: '8',
    name: 'Monteleone\'s Bakery',
    address: '355 Court St',
    phoneNumber: '(718) 852-5600',
    category: 'Bakery',
    status: 'confirmed',
  },
  {
    id: '9',
    name: 'Avlee Greek Kitchen',
    address: '349 Court St',
    phoneNumber: '(718) 855-5125',
    category: 'Restaurant',
    status: 'confirmed',
  },
  {
    id: '10',
    name: 'Court Pastry Shop',
    address: '298 Court St',
    phoneNumber: '(718) 875-4820',
    category: 'Bakery',
    status: 'confirmed',
  },
  {
    id: '11',
    name: 'Pastosa Ravioli',
    address: '348 Court St',
    phoneNumber: '(718) 625-7952',
    category: 'Food',
    status: 'confirmed',
  },
  {
    id: '12',
    name: 'Sahadi\'s',
    address: '187 Atlantic Ave',
    phoneNumber: '(718) 624-4550',
    category: 'Market',
    status: 'confirmed',
    notes: 'Member of opposition group'
  },
  {
    id: '13',
    name: 'Queen Italian Restaurant',
    address: '84 Court St',
    phoneNumber: '(718) 596-5955',
    category: 'Restaurant',
    status: 'confirmed'
  },
  {
    id: '14',
    name: 'Key Food',
    address: 'Court St',
    phoneNumber: '',
    category: 'Supermarket',
    status: 'confirmed'
  },
  {
    id: '15',
    name: 'CVS Pharmacy',
    address: '156 Henry St',
    phoneNumber: '',
    category: 'Retail',
    status: 'confirmed'
  }
];

export const CALL_SCRIPT = `Hi, I'm a local resident and customer. I'm calling to let you know I support the new bike lane on Court Street. It makes the street safer for everyone. I'm disappointed to hear you are lobbying to remove it, and I will be taking my business to shops that support safe streets until you change your stance.`;