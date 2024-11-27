"use server";

import Meme from "@/database/meme.model";
import { connectToDatabase } from "../mongoose";

export async function GellAllMeme() {
  try {
    connectToDatabase();

    const meme = await Meme.find();
    return JSON.parse(JSON.stringify(meme));
  } catch (error) {
    console.log(error);
    throw error;
  }
}
