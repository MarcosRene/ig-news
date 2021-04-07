import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;
    border-bottom: 1px solid ${theme.colors.detail};

    > header {
      width: 100%;
      max-width: 63.75rem;
      height: 5rem;
      margin: 0 auto;
      padding: 0 2rem;

      display: flex;
      justify-content: center;
      align-items: center;

      > nav {
        height: 100%;
        margin-left: 5rem;
      }

      > button {
        margin-left: auto;
      }
    }
  `}
`;
