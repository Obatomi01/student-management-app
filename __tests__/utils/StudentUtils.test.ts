import { FilterValueOptions } from '@/modules/home/components/FilterModal';
import { SortValueOptions } from '@/modules/home/components/SortModal';
import { StudentType } from '@/modules/home/components/StudentList';
import { getFilteredSortedStudents } from '@/utils/StudentUtils';

const mockStudents: StudentType[] = [
  {
    name: 'Alice',
    email: 'alice@example.com',
    enrollmentStatus: 'enrolled',
    dateAdded: '2023-01-01',
    id: 1,
    phoneNumber: '1234567890',
    address: '123 Main St',
  },
  {
    name: 'Bob',
    email: 'bob@example.com',
    enrollmentStatus: 'graduated',
    dateAdded: '2023-03-10',
    id: 2,
    phoneNumber: '9876543210',
    address: '456 Elm St',
  },
  {
    name: 'Charlie',
    email: 'charlie@example.com',
    enrollmentStatus: 'alumni',
    dateAdded: '2023-02-15',
    id: 3,
    phoneNumber: '5555555555',
    address: '789 Oak St',
  },
];

describe('getFilteredSortedStudents', () => {
  it('returns the correct number of filtered and sorted students', () => {
    const sortOption = {
      sortBy: 'name' as unknown as SortValueOptions,
      sortInAscendingOrder: true,
    };
    const filterOption = {
      enrolled: true,
      alumni: false,
      graduated: false,
    } as FilterValueOptions;
    const searchValue = '';

    const result = getFilteredSortedStudents({
      filterOption,
      sortOption,
      students: mockStudents,
      searchValue,
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Alice');
  });

  it('filters by search term', () => {
    const sortOption = {
      sortBy: 'name' as SortValueOptions,
      sortInAscendingOrder: true,
    };
    const filterOption = {
      enrolled: true,
      alumni: true,
      graduated: true,
    };
    const searchValue = 'bob';

    const result = getFilteredSortedStudents({
      filterOption,
      sortOption,
      students: mockStudents,
      searchValue,
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Bob');
  });
});
