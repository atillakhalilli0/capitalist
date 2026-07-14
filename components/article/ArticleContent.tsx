import Image from "next/image";
import type { ArticleContent as ArticleContentType } from "@/types/article";

type ArticleContentProps = {
  content: ArticleContentType;
};

function RenderNode({
  node,
}: {
  node: ArticleContentType;
}): React.ReactNode {
  switch (node.type) {
    case "doc":
      return (
        <>
          {node.content?.map((child, index) => (
            <RenderNode
              key={index}
              node={child}
            />
          ))}
        </>
      );

    case "paragraph":
      return (
        <p className="my-6 font-serif text-lg leading-8 text-foreground/90 md:text-xl md:leading-9">
          {node.content?.map((child, index) => (
            <RenderNode
              key={index}
              node={child}
            />
          ))}
        </p>
      );

    case "text":
      return node.text ?? "";

    case "heading":
      switch (node.attrs?.level) {
        case 2:
          return (
            <h2 className="mt-12 mb-6 font-sans text-2xl font-black tracking-tight text-foreground md:text-3xl">
              {node.content?.map((child, index) => (
                <RenderNode
                  key={index}
                  node={child}
                />
              ))}
            </h2>
          );

        case 3:
          return (
            <h3 className="mt-10 mb-5 font-sans text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
              {node.content?.map((child, index) => (
                <RenderNode
                  key={index}
                  node={child}
                />
              ))}
            </h3>
          );

        case 4:
          return (
            <h4 className="mt-8 mb-4 font-sans text-lg font-bold tracking-tight text-foreground">
              {node.content?.map((child, index) => (
                <RenderNode
                  key={index}
                  node={child}
                />
              ))}
            </h4>
          );

        default:
          return (
            <h2 className="mt-12 mb-6 font-sans text-2xl font-black tracking-tight text-foreground md:text-3xl">
              {node.content?.map((child, index) => (
                <RenderNode
                  key={index}
                  node={child}
                />
              ))}
            </h2>
          );
      }

    case "bulletList":
      return (
        <ul className="my-6 list-disc space-y-3 pl-6 font-serif text-lg leading-8 text-foreground/90">
          {node.content?.map((child, index) => (
            <RenderNode
              key={index}
              node={child}
            />
          ))}
        </ul>
      );

    case "orderedList":
      return (
        <ol className="my-6 list-decimal space-y-3 pl-6 font-serif text-lg leading-8 text-foreground/90">
          {node.content?.map((child, index) => (
            <RenderNode
              key={index}
              node={child}
            />
          ))}
        </ol>
      );

    case "listItem":
      return (
        <li>
          {node.content?.map((child, index) => (
            <RenderNode
              key={index}
              node={child}
            />
          ))}
        </li>
      );

    case "blockquote":
      return (
        <blockquote className="my-8 border-l-[3px] border-accent bg-accent/5 py-4 pl-6 pr-4 font-serif text-lg italic leading-8 text-foreground">
          {node.content?.map((child, index) => (
            <RenderNode
              key={index}
              node={child}
            />
          ))}
        </blockquote>
      );

    case "image":
      return (
        <figure className="my-10">
          <div className="relative aspect-video overflow-hidden rounded-md bg-muted border border-border">
            <Image
              src={(node.attrs?.src as string) ?? "/images/placeholder.jpg"}
              alt={(node.attrs?.alt as string) ?? ""}
              fill
              className="object-cover"
            />
          </div>

          {typeof node.attrs?.caption === "string" && (
            <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {node.attrs.caption}
            </figcaption>
          )}
        </figure>
      );

    case "horizontalRule":
      return <hr className="my-10 border-border" />;

    default:
      return (
        <>
          {node.content?.map((child, index) => (
            <RenderNode
              key={index}
              node={child}
            />
          ))}
        </>
      );
  }
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <RenderNode node={content} />
    </div>
  );
}