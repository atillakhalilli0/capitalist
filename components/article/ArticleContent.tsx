type ArticleContentProps = {
  content: string;
};

/**
 * Renders the article body coming from the backend.
 * `Article.content` is stored as an HTML string (produced by the admin editor),
 * so we render it directly instead of walking a TipTap JSON tree.
 */
export default function ArticleContent({ content }: ArticleContentProps) {
  if (!content) return null;

  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none font-serif text-lg leading-8 text-foreground/90"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
