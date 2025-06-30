import {FC} from "react";

import {TableFranchiseNotice} from "@/types/franchiseNotice";

import {createColumns} from "./columns";
import {DataTable} from "./data-table";


interface FranchiseNoticeListProps {
  data: TableFranchiseNotice[];
  lang?: string;
}

export const FranchiseNoticeList: FC<FranchiseNoticeListProps> = ({data, lang}) => {
  const columns = createColumns({lang})


  return (
    <div>
      <DataTable
        columns={columns}
        data={data}/>
    </div>
  )
}