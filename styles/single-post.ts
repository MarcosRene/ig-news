import styled, { css } from 'styled-components';

export const PostContainer = styled.main`
  ${() => css`
    max-width: 70rem;
    margin: 0 auto;
    padding: 0 2rem;
  `}
`;

export const Post = styled.article`
  ${({ theme }) => css`
    max-width: 45rem;
    margin: 5rem auto;

    > header {
      h1 {
        font-size: 3.5rem;
        font-weight: 900;
        color: ${theme.colors.titles};
      }

      time {
        display: block;
        font-size: 1rem;
        color: ${theme.colors.text};
      }

      + div {
        margin: 2rem 0 4rem !important;
      }
    }

    img {
      border-radius: 1rem;
    }
  `}
`;

type PostContentProps = {
  $preview?: boolean;
};

export const PostContent = styled.section<PostContentProps>`
  ${({ theme, $preview: isPreview }) => css`
    line-height: 2rem;
    font-size: 1.125rem;
    color: ${theme.colors.text};

    h3 {
      margin-top: 1.5rem;
    }

    p,
    ul {
      margin: 1.5rem 0;
    }

    ul {
      padding-left: 1.5rem;
      list-style-type: disc;

      li {
        margin: 0.5rem 0;
      }
    }

    ${isPreview &&
    css`
      background: ${`linear-gradient(${theme.colors.text}, transparent)`};
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `}
  `}
`;

export const SubscribeNotice = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.shape};
    padding: 1.5rem;
    margin: 4rem 0 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 1000px;
    font-size: 1.25rem;
    font-weight: bold;

    a {
      color: ${theme.colors.yellow};

      :hover {
        text-decoration: underline;
      }
    }
  `}
`;
