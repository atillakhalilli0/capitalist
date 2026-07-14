export const createdAt = "2025-01-01T10:00:00.000Z";
export const updatedAt = "2025-01-01T10:00:00.000Z";

export const createTipTapContent = (text: string) => ({
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text,
        },
      ],
    },
  ],
});