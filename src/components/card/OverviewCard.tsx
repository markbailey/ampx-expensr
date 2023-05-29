import { FC, HTMLAttributes, SVGProps, Suspense, lazy, useEffect, useState } from 'react';
import { formatCurrency } from '../../utilities/currency';
import classNames from 'classnames';

type IconProps = SVGProps<SVGElement> & { name: string };
export interface OverviewProps extends HTMLAttributes<HTMLDivElement> {
  icon: string;
  name: string;
  amount: number;
  currency: string;
  locale: Intl.LocalesArgument;
}

function Icon(props: IconProps) {
  const { name, ...otherProps } = props;
  const [Component, setComponent] = useState<FC<SVGProps<SVGElement>>>(() => null);

  useEffect(() => {
    setComponent(
      lazy(() =>
        import(`../../assets/icons/${name}.svg`).then(({ ReactComponent }) => ({
          default: ReactComponent,
        }))
      )
    );
  }, [name, setComponent]);

  return Component && <Component {...otherProps} />;
}

function OverviewCard(props: OverviewProps) {
  const { className: classNameProp, icon, name, amount, currency, locale, ...otherProps } = props;
  const className = classNames(
    'block',
    'text-center',
    'rounded-lg',
    'shadow',
    'text-gray-800',
    'bg-off-white',
    'dark:text-gray-400',
    'dark:bg-gray-800',
    'p-6',
    classNameProp
  );

  return (
    <div {...otherProps} className={className}>
      <Suspense>
        <Icon name={icon} className="w-16 h-16 mx-auto mb-4" />
      </Suspense>

      <h2 className="text-4xl xxl:text-5xl font-bold text-gray-900 dark:text-white">
        {formatCurrency(amount, currency, locale)}
      </h2>
      <h5 className="mb-2 text-xl xl:text-2xl tracking-tight">{name}</h5>
    </div>
  );
}

export default OverviewCard;
