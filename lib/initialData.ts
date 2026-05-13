import { Quota, Employee } from '@/types/employee';
import { generateId } from './utils';

export function createInitialQuotas(): Quota[] {
  return [
    {
      id: generateId(),
      name: 'Quota 1',
      employees: [
        {
          id: generateId(),
          sNo: 1,
          name: 'Prasad Kumari',
          work: 'Carpenter',
          comeBy: 'self',
          state: 'Telangana',
          salary: 6.5,
          joinedDate: '2026-02-06',
          visaExpiration: '',
          amountDue: 2180
        },
        {
          id: generateId(),
          sNo: 2,
          name: 'Ravi Jogu',
          work: 'Formen',
          comeBy: 'Self',
          state: 'Telangana',
          salary: 7.5,
          joinedDate: '2026-02-07',
          visaExpiration: '',
          amountDue: 2735
        },
        {
          id: generateId(),
          sNo: 3,
          name: 'Sagar',
          work: 'Left',
          comeBy: '',
          state: '',
          salary: 0,
          joinedDate: '',
          visaExpiration: '',
          amountDue: 2950
        },
        {
          id: generateId(),
          sNo: 4,
          name: 'Buyya Lingam',
          work: 'Helper',
          comeBy: '',
          state: '',
          salary: 5.5,
          joinedDate: '2026-03-24',
          visaExpiration: '',
          amountDue: 0
        },
        {
          id: generateId(),
          sNo: 5,
          name: 'Abdual Karim',
          work: 'Helper',
          comeBy: '',
          state: '',
          salary: 4.5,
          joinedDate: '2026-04-27',
          visaExpiration: '',
          amountDue: 250
        },
        {
          id: generateId(),
          sNo: 6,
          name: 'Rajveer Singh',
          work: 'Steel Fixer',
          comeBy: 'Bipin',
          state: '',
          salary: 5.75,
          joinedDate: '2026-05-03',
          visaExpiration: '',
          amountDue: 0
        }
      ]
    },
    {
      id: generateId(),
      name: 'Quota 2',
      employees: [
        {
          id: generateId(),
          sNo: 1,
          name: 'Mohd Rizwan',
          work: 'Electrician',
          comeBy: 'Bipin',
          state: '',
          salary: 0,
          joinedDate: '2026-05-12',
          visaExpiration: '',
          amountDue: 0
        },
        {
          id: generateId(),
          sNo: 2,
          name: 'Shadab',
          work: 'Electrician',
          comeBy: 'Bipin',
          state: 'UP',
          salary: 0,
          joinedDate: '2026-05-12',
          visaExpiration: '',
          amountDue: 0
        },
        {
          id: generateId(),
          sNo: 3,
          name: 'Siddique Hasan',
          work: 'Electrician',
          comeBy: 'Bipin',
          state: 'Delhi',
          salary: 0,
          joinedDate: '2026-05-12',
          visaExpiration: '',
          amountDue: 0
        },
        {
          id: generateId(),
          sNo: 4,
          name: 'Ashik Ali',
          work: 'Plumber',
          comeBy: 'Self',
          state: 'Lucknow',
          salary: 0,
          joinedDate: '',
          visaExpiration: '',
          amountDue: 0
        },
        {
          id: generateId(),
          sNo: 5,
          name: 'Bablu',
          work: 'Tile Layer',
          comeBy: 'Self',
          state: 'Lucknow',
          salary: 0,
          joinedDate: '',
          visaExpiration: '',
          amountDue: 0
        },
        {
          id: generateId(),
          sNo: 6,
          name: 'Jackson',
          work: 'Tile Layer',
          comeBy: '',
          state: 'Africa',
          salary: 0,
          joinedDate: '',
          visaExpiration: '',
          amountDue: 0
        }
      ]
    },
    {
      id: generateId(),
      name: 'Quota 3',
      employees: [
        {
          id: generateId(),
          sNo: 1,
          name: 'PARVEZ MUSARRAF',
          work: '',
          comeBy: '',
          state: '',
          salary: 0,
          joinedDate: '',
          visaExpiration: '',
          amountDue: 0
        },
        {
          id: generateId(),
          sNo: 2,
          name: 'SAMEER SALEEM',
          work: '',
          comeBy: '',
          state: '',
          salary: 0,
          joinedDate: '',
          visaExpiration: '',
          amountDue: 0
        },
        {
          id: generateId(),
          sNo: 3,
          name: 'SHAN MOHAMMAD MOHD SHARAFAT',
          work: '',
          comeBy: '',
          state: '',
          salary: 0,
          joinedDate: '',
          visaExpiration: '',
          amountDue: 0
        },
        {
          id: generateId(),
          sNo: 4,
          name: 'MOHD ASLAM',
          work: '',
          comeBy: '',
          state: '',
          salary: 0,
          joinedDate: '',
          visaExpiration: '',
          amountDue: 0
        },
        {
          id: generateId(),
          sNo: 5,
          name: 'MOHD ASLAM MOHD SALEEM',
          work: '',
          comeBy: '',
          state: '',
          salary: 0,
          joinedDate: '',
          visaExpiration: '',
          amountDue: 0
        },
        {
          id: generateId(),
          sNo: 6,
          name: 'MOHD SALEEM',
          work: '',
          comeBy: '',
          state: '',
          salary: 0,
          joinedDate: '',
          visaExpiration: '',
          amountDue: 0
        },
        {
          id: generateId(),
          sNo: 7,
          name: 'MOHD SALEEM MOHD YAQOOB',
          work: '',
          comeBy: '',
          state: '',
          salary: 0,
          joinedDate: '',
          visaExpiration: '',
          amountDue: 0
        },
        {
          id: generateId(),
          sNo: 8,
          name: 'MOHD YAQOOB',
          work: '',
          comeBy: '',
          state: '',
          salary: 0,
          joinedDate: '',
          visaExpiration: '',
          amountDue: 0
        }
      ]
    }
  ];
}

// Made with Bob