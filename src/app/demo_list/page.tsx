
// server component used to build static demo list page

import DemoList from ".";
import { getCachedDemos } from "@/demos-parser";

export default function DemoListPage() {
  const demos = getCachedDemos();
  return <DemoList demos={demos}/>;
}
