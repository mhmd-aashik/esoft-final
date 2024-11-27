import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { getDeviconClassName } from "@/lib/utils";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  const iconClass = getDeviconClassName(name);
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium text-light400_light500  rounded-md border-none bg-primary-500/20 px-3 py-2 uppercase">
        <i className={`${iconClass} mr-2 text-xl`}></i>
        {name}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  );
};

export default RenderTag;
