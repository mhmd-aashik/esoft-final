import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA, CURRENCY_NOTATIONS } from "@/constants";
import { BadgeCounts, FilterProps } from "@/types";
import { techMap } from "@/constants/techMap";
import { JobPageFilters } from "@/constants/filters";
import { GetFormattedSalaryParams } from "./actions/shared.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// format date to time ago
export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const elapsed = now.getTime() - createdAt.getTime();
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
};

// formatNumber M and K for views and upvotes and likes
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    return `${formattedNum}M`;
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return num.toString();
  }
};

export function getJoinedDate(date: Date): string {
  // Get month and year from the Date object
  const month: string = date.toLocaleString("default", { month: "short" });
  const year: number = date.getFullYear();

  // Concatenate month and year
  const joinedDate: string = `${month} ${year}`;

  return joinedDate;
}

interface urlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: urlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface removeUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeyFromQuery = ({
  params,
  keysToRemove,
}: removeUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export const assignBadges = (params: BadgeParam) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });

  return badgeCounts;
};

export const getDeviconClassName = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();

  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} colored`
    : "devicon-devicon-plain";
};

export function processJobTitle(title: string | undefined | null): string {
  if (title === undefined || title === null) {
    return "No Job Title";
  }

  const words = title.split(" "); // 2 words

  const validWords = words.filter((word) => {
    return (
      word !== undefined &&
      word !== null &&
      word.toLowerCase() !== "undefined" &&
      word.toLowerCase() !== "null"
    );
  });

  if (validWords.length === 0) {
    return "No Job Title";
  }

  return validWords.join(" ");
}

export const employmentTypeConverter = (type: string): string => {
  let employmentType: string = "";

  JobPageFilters.forEach((filter: FilterProps) => {
    if (filter.value === type) {
      employmentType = filter.name;
    }
  });

  return employmentType;
};

export const getFormattedSalary = ({
  min,
  max,
  currency,
  period,
}: GetFormattedSalaryParams) => {
  if (!min || !max) return null;

  const salaryInfo = {
    symbol: CURRENCY_NOTATIONS[currency] || "$",
    low: salaryFormatter(min, 1),
    high: salaryFormatter(max, 1),
    per: period ? `/${period.toLowerCase()}ly` : "",
  };

  const { symbol, low, high, per } = salaryInfo;

  const formattedSalary = `${symbol}${low} - ${symbol}${high}${per}`;

  return formattedSalary as string;
};

const salaryFormatter = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const lookupItem = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);
  return lookupItem
    ? (num / lookupItem.value).toFixed(digits).replace(rx, "$1") +
        lookupItem.symbol
    : "0";
};

export function isValidImage(url: string) {
  return /\.(jpg|jpeg|png|webp||svg)$/.test(url);
}
