import { GetStaticProps } from 'next';
import Link from 'next/link';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { MetaTags } from '../../components';
import { PostListContainer, PostList } from '../../../styles/posts';
import { getPrismicClient } from '../../services';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

type PostProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <MetaTags title="Posts" />
      <PostListContainer>
        <PostList>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`posts/${post.slug}`}>
                <a>
                  <time>{post.updatedAt}</time>
                  <strong>{post.title}</strong>
                  <p>{post.excerpt}</p>
                </a>
              </Link>
            </li>
          ))}
        </PostList>
      </PostListContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps<PostProps> = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 100,
    },
  );

  const posts = response.results.map((post) => ({
    slug: post.uid,
    title: RichText.asText(post.data.title),
    excerpt:
      post.data.content.find((content) => content.type === 'paragraph')?.text ??
      '',
    updatedAt: new Date(post.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ),
  }));

  return {
    props: { posts },
    revalidate: 60 * 60,
  };
};
