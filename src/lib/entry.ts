import * as path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { Page } from "./page";
import { processor } from "./processor";
import { blogDir } from "./constants";

export interface Entry extends Page {
  date: number;
}

export const getEntry = async (slug: string): Promise<Entry> => {
  const filename = `${slug}.md`;
  const mdPath = path.resolve(blogDir, filename);
  const md = await fs.readFile(mdPath, "utf-8");
  const { data, content } = matter(md);
  const body = await processor(content);
  return {
    title: data.title,
    body,
    date: new Date(data.date).getTime(),
    slug,
  };
};

export const getEntries = async (limit?: number): Promise<Entry[]> => {
  const slugs = await fs.readdir(blogDir);
  const entryPromises = slugs.map((filename) =>
    getEntry(path.basename(filename, ".md"))
  );
  return Promise.all(entryPromises).then((entries) =>
    entries
      .slice()
      .sort((a, b) => b.date - a.date)
      .slice(0, limit || entries.length)
  );
};
