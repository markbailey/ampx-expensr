import { ReactComponent as PlusIcon } from '../assets/icons/plus.svg';
import { ReactComponent as MoreHorizontalIcon } from '../assets/icons/more-horizontal.svg';
import Button, { IconButton } from './Button';
import Dropdown, { MenuButton } from './Dropdown';

type ItemWithId = { id: string };
interface DataTableProps<T extends ItemWithId> {
  title: string;
  items: T[];
  columns: string[];
  onItemAddClick(): void;
  onItemDeleteClick(id: string): void;
  onItemEditClick(id: string): void;
}

interface TableRowProps<T extends ItemWithId> {
  columns: string[];
  data: T;
  onItemDeleteClick(id: string): void;
  onItemEditClick(id: string): void;
}

interface TableHeaderProps {
  columns: string[];
}

function TableHeader(props: TableHeaderProps) {
  const { columns } = props;
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {columns.map((column) => (
          <th
            key={column}
            scope="col"
            className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
          >
            {column}
          </th>
        ))}

        <th scope="col" className="relative px-4 py-3">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
  );
}

function TableRow<T extends ItemWithId>(props: TableRowProps<T>) {
  const { columns, data, onItemEditClick, onItemDeleteClick } = props;
  const firstColumnData = data[columns[0] as keyof T] as string;
  const onDeleteActionClick = () => onItemDeleteClick(data.id);
  const onEditActionClick = () => onItemEditClick(data.id);

  return (
    <tr className="border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {firstColumnData}
      </th>

      {columns.slice(1).map((column, i) => (
        <td key={`${data.id}Col${i}`} className="px-4 py-3">
          {data[column as keyof T] as string | number}
        </td>
      ))}

      <th scope="col" className="relative px-4 py-3 text-right">
        <Dropdown
          className="top-14 right-0 w-32"
          trigger={
            <IconButton data-dropdown-toggle="actions-dropdown">
              <span className="sr-only">Actions</span>
              <MoreHorizontalIcon className="w-6 h-6" />
            </IconButton>
          }
        >
          <div className="text-left py-3 px-4">
            <span className="block text-sm font-semibold text-gray-900 dark:text-white">
              Actions
            </span>
          </div>

          <div className="py-1 font-light text-gray-500 dark:text-gray-400">
            <MenuButton onClick={onEditActionClick}>Edit</MenuButton>
          </div>

          <div className="py-1">
            <MenuButton onClick={onDeleteActionClick}>Delete</MenuButton>
          </div>
        </Dropdown>
      </th>
    </tr>
  );
}

function DataTable<T extends ItemWithId>(props: DataTableProps<T>) {
  const { title, items, columns, onItemAddClick, onItemEditClick, onItemDeleteClick } = props;
  return (
    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl xl:text-2xl tracking-tight">{title}</h2>
        </div>

        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <Button onClick={onItemAddClick}>
            <PlusIcon className="h-5 w-5 mr-2" />
            <span>Add Item</span>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <TableHeader columns={columns} />
          <tbody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                data={item}
                columns={columns}
                onItemEditClick={onItemEditClick}
                onItemDeleteClick={onItemDeleteClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
