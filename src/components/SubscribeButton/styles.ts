import styled, { css } from 'styled-components';

export const Container = styled.button`
  ${({ theme }) => css`
    padding: 1.25rem 4rem;
    line-height: 1.25rem;
    border-radius: 1000px;
    background: ${theme.colors.yellow};
    color: ${theme.colors.background};
    font-weight: bold;
    vertical-align: middle;
    transition: 180ms 80ms ease-in-out;

    :hover {
      filter: brightness(1.2);
    }

    :active {
      filter: brightness(0.8);
    }
  `}
`;
