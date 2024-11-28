import PopUpCard from "@/components/cards/PopUpCard";
import { Button } from "@/components/ui/button";
import { GellAllMeme } from "@/lib/actions/meme.action";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Meme | Debug Hub",
  description:
    "Debug Hub is a platform for developers to ask and answer questions. It is a place for developers to share their knowledge and help each other.",
};

const MemePage = async () => {
  const result = await GellAllMeme();

  return (
    <div>
      <div className="mb-8 flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Explore Memes</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <PopUpCard result={result} />
    </div>
  );
};

export default MemePage;
