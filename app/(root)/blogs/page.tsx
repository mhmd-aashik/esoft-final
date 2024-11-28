import { Button } from "@/components/ui/button";
import { getAllBlogs } from "@/lib/actions/blog.action";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Blog | Debug Hub",
  description:
    "Debug Hub is a platform for developers to ask and answer questions. It is a place for developers to share their knowledge and help each other.",
};

const BlogPage = async () => {
  const result = await getAllBlogs();

  return (
    <>
      <div className="mb-8 flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="h1-bold text-dark100_light900">Explore Blogs</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient h-auto px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {result.map((data: any) => (
          <div
            className="flex h-full flex-col space-x-7 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
            key={data.id}
          >
            <div className="relative h-56 w-full">
              <Image
                className="size-full object-cover"
                src={data.social_image}
                alt={data.title}
                layout="fill"
              />
            </div>

            <div className="flex grow flex-col p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {data.title}
              </h3>
              <p className="mt-4 text-base text-gray-800">{data.title}</p>

              <div className="mt-4 flex items-center space-x-3">
                <Image
                  className="size-8 rounded-full"
                  src={data.user.profile_image}
                  alt={data.user.username}
                  width={32}
                  height={32}
                />
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    {data.user.profilename}
                  </p>
                  <p className="text-xs text-gray-500">
                    Published on {data.published_timestamp}
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <Link
                  href={data.url}
                  className="mt-2 block rounded-lg bg-primary-500 py-2 text-center text-white transition duration-300 hover:bg-primary-500/80"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogPage;
