

import { getDemosData, DemoProps } from "./demos-data";
import DemoList, {Props} from ".";


export default function DemoListPage(){
  const demos = getDemosData()
  return <DemoList demos={demos}/>;
}