import md from "markdown-it";

export const useMarkdown = () => {
  const markdown = md();
  return markdown;
};
