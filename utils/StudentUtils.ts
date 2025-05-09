import { FilterValueOptions } from '@/modules/home/components/FilterModal';
import { SortValueOptions } from '@/modules/home/components/SortModal';
import { StudentType } from '@/modules/home/components/StudentList';

type Props = {
  students: StudentType[];
  searchValue: string;

  filterOption: FilterValueOptions;
  sortOption: {
    sortBy: SortValueOptions;
    sortInAscendingOrder: boolean;
  };
};

export const getFilteredSortedStudents = ({
  filterOption,
  sortOption,
  students,
  searchValue,
}: Props) => {
  const activeStatus = Object.entries(filterOption)
    .filter(([_, value]) => value === true)
    .map(([key]) => key);

  const filteredStudents = students.filter((student) =>
    activeStatus.length > 0
      ? activeStatus.includes(student.enrollmentStatus)
      : true
  );

  const results =
    searchValue === ''
      ? filteredStudents
      : filteredStudents.filter(
          (item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.email.toLowerCase().includes(searchValue.toLowerCase())
        );

  const sortStudents = (a: StudentType, b: StudentType) => {
    const { sortBy, sortInAscendingOrder } = sortOption;

    if (sortBy === 'name') {
      return sortInAscendingOrder
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'email') {
      return sortInAscendingOrder
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email);
    } else if (sortBy === 'dateAdded') {
      return sortInAscendingOrder
        ? new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        : new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
    return 0;
  };

  return [...results].sort(sortStudents);
};
