import styled, { css } from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => css`
    width: 100%;
    max-width: 63.75rem;
    height: calc(100vh - 5rem);
    margin: 0 auto;
    padding: 0 2rem;
    color: ${theme.colors.text};

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  `}
`;

export const Section = styled.section`
  ${({ theme }) => css`
    font-size: 1.5rem;
    font-weight: 700;

    > h1 {
      margin: 2.5rem 0 1.25rem;
      font-size: 4.5rem;
      font-weight: 900;
      line-height: 4.5rem;

      > strong {
        color: ${theme.colors.blue};
      }
    }

    > p {
      margin-bottom: 2.5rem;
      font-weight: 400;

      > strong {
        color: ${theme.colors.blue};
        display: block;
      }
    }
  `}
`;
