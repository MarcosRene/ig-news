import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';

import { RichText } from 'prismic-dom';

import { MetaTags } from '../../../components';
import { getPrismicClient } from '../../../services';
import {
  PostContainer,
  PostContent,
  Post,
  SubscribeNotice,
} from '../../../../styles/single-post';

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
  excerpt: string;
  updatedAt: string;
};

type PostPreview = {
  post: Post;
};

export default function PostPreview({ post }: PostPreview) {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session, router, post.slug]);

  return (
    <>
      <MetaTags
        title={post.title}
        image={post.thumbnail.url}
        description={post.excerpt}
      />

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

          <PostContent
            $preview
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <SubscribeNotice>
            <span>Wanna continue reading?</span>

            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </SubscribeNotice>
        </Post>
      </PostContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps<PostPreview> = async (ctx) => {
  const { params } = ctx;

  const slug = String(params.slug);

  const prismic = getPrismicClient();

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
    content: RichText.asHtml(data.content.splice(0, 3)),
    excerpt: RichText.asText(data.content.splice(0, 3)),
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
