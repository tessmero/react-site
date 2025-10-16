import fs from "fs";
import path from "path";
import matter from "gray-matter";

const demosDir = path.join(process.cwd(), "_demos");


export interface DemoProps {
  layout: string
  title: string
  date: string
  lastUpdated: string
  changelog: string[]
  techs: string[]
  sound: true
  music: true
  hasReports: true
  content: string
}

export function getDemosData() {
  const files = fs.readdirSync(demosDir);
  return files.map((filename) => {
    const filePath = path.join(demosDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);
    return { ...data, content } as DemoProps
  });
}
