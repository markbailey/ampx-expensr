import { HTMLAttributes } from 'react';
import { Chart as ChartJS, Legend, Tooltip, ArcElement } from 'chart.js';
import classNames from 'classnames';
import { Pie } from 'react-chartjs-2';

interface BreakdownCardProps extends HTMLAttributes<HTMLDivElement> {
  type: string;
  items: ItemWithCategory[];
  categories: Category[];
}

ChartJS.register(ArcElement, Legend, Tooltip);

function getChartData(items: ItemWithCategory[], categories: Category[]) {
  const labels = items.map((item) => item.name);
  const datasetData = items.map((item) => item.amount);
  const colors = items
    .map((item) => categories.find((category) => category.id === item.categoryId)?.color)
    .filter((color) => color !== undefined) as string[];

  const datasets = [{ label: 'Amount', data: datasetData, backgroundColor: colors }];
  return { labels, datasets };
}

function BreakdownCard(props: BreakdownCardProps) {
  const { className: classNameProp, type, items, categories, ...otherProps } = props;
  const className = classNames(
    'rounded-lg',
    'text-gray-800',
    'bg-off-white',
    'dark:text-gray-400',
    'dark:bg-gray-800',
    'p-4',
    classNameProp
  );

  return (
    <div {...otherProps} className={className}>
      <h2 className="text-center rounded-t-lg p-3 -mx-4 -mt-4 mb-2">{`${type} Breakdown`}</h2>
      <Pie data={getChartData(items, categories)} className="!w-full !h-auto" />
    </div>
  );
}

export default BreakdownCard;
