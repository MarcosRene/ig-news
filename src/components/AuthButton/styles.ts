import styled, { css } from 'styled-components';

export const Container = styled.button`
  ${({ theme }) => css`
    padding: 0.75rem 1rem;
    font-weight: bold;
    border-radius: 1000px;
    background: ${theme.colors.shape};
    color: ${theme.colors.titles};
    line-height: 1.25rem;
    vertical-align: middle;
    transition: 180ms 80ms ease-in-out;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    :hover {
      filter: brightness(1.2);
    }

    :active {
      filter: brightness(0.8);
    }
  `};
`;
