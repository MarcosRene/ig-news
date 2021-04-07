import styled, { css } from 'styled-components';

export const PostListContainer = styled.main`
  ${() => css`
    max-width: 70rem;
    margin: 0 auto;
    padding: 0 2rem;
  `}
`;

export const PostList = styled.ul`
  ${({ theme }) => css`
    max-width: 45rem;
    margin: 5rem auto 0;

    > li {
      transition: 180ms ease-in-out;

      time {
        display: flex;
        align-items: center;
        font-size: 1rem;
        color: ${theme.colors.text};
      }

      strong {
        display: block;
        font-size: 1.5rem;
        margin-top: 1rem;
        line-height: 2rem;
        transition: 180ms ease-in-out;
      }

      p {
        color: ${theme.colors.text};
        margin-top: 0.5rem;
        line-height: 1.625rem;
        border-left: 3px solid ${theme.colors.background};
        transition: 180ms ease-in-out;
      }

      :hover {
        strong {
          color: ${theme.colors.yellow};
        }

        p {
          border-left-color: ${theme.colors.yellow};
          padding-left: 1rem;
        }
      }

      + li {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid ${theme.colors.thinBorder};
      }
    }
  `}
`;
