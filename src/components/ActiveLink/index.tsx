import { useRouter } from 'next/dist/client/router';
import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

import { NavLink } from './styles';

type TypeLinkProps = LinkProps & {
  children: ReactNode;
};

export const ActiveLink = ({ children, ...rest }: TypeLinkProps) => {
  const { asPath } = useRouter();

  const isActive = asPath === rest.href;

  return (
    <Link {...rest}>
      <NavLink active={isActive}>{children}</NavLink>
    </Link>
  );
};
