import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Image from 'next/image';

import { RichText } from 'prismic-dom';

import { MetaTags } from '../../components';
import { PostContainer, PostContent, Post } from '../../../styles/single-post';
import { getPrismicClient } from '../../services';

type PostThumbnail = {
  dimensions: {
    width: number;
    height: number;
  };
  alt: string;
  copyright: string | null;
  url: string;
};

type Post = {
  slug: string;
  thumbnail: PostThumbnail;
  title: string;
  content: string;
  updatedAt: string;
};

type PostProps = {
  post: Post;
};

export default function Posts({ post }: PostProps) {
  return (
    <>
      <MetaTags title={post.title} image={post.thumbnail.url} />

      <PostContainer>
        <Post>
          <header>
            <h1>{post.title}</h1>
            <time>{post.updatedAt}</time>
          </header>

          <Image
            src={post.thumbnail.url}
            width={post.thumbnail.dimensions.width}
            height={post.thumbnail.dimensions.height}
            alt={post.thumbnail.alt}
            objectFit="cover"
          />

          <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
        </Post>
      </PostContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PostProps> = async (
  ctx,
) => {
  const { req, params } = ctx;

  const session = await getSession({ req });
  const slug = String(params.slug);

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const prismic = getPrismicClient(req);

  const { data, last_publication_date } = await prismic.getByUID(
    'post',
    String(slug),
    {},
  );

  const post = {
    slug,
    thumbnail: {
      ...data.thumbnail,
    },
    title: RichText.asText(data.title),
    content: RichText.asHtml(data.content),
    updatedAt: new Date(last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  };

  return {
    props: {
      post,
    },
  };
};
