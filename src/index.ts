#!/usr/bin/env bun

interface ContentPost {
  day: number;
  topic: string;
  title: string;
  platform: string;
  scheduledTime: string;
}

interface CalendarOptions {
  posts: number;
  platform: string;
  days: number;
  topics: string[];
}

const DEFAULT_TOPICS = [
  "AI", "Automation", "Productivity", "Tools", "Tips",
  "Tutorials", "Insights", "Trends", "Best Practices"
];

const PLATFORM_BEST_TIMES: Record<string, string[]> = {
  linkedin: ["09:00", "12:00", "17:00"],
  twitter: ["09:00", "12:00", "15:00", "18:00"],
  instagram: ["11:00", "14:00", "19:00"],
  tiktok: ["12:00", "15:00", "19:00", "21:00"]
};

function generateCalendar(options: CalendarOptions): ContentPost[] {
  const { posts, platform, days, topics } = options;
  const calendar: ContentPost[] = [];
  const times = PLATFORM_BEST_TIMES[platform] || PLATFORM_BEST_TIMES["twitter"];
  
  for (let i = 0; i < posts; i++) {
    const day = Math.floor((i / (posts / days)) % days) + 1;
    const topic = topics[i % topics.length];
    const time = times[i % times.length];
    
    calendar.push({
      day,
      topic,
      title: `${topic} - Post ${i + 1}`,
      platform,
      scheduledTime: time
    });
  }
  
  return calendar;
}

function displayCalendar(calendar: ContentPost[]): void {
  console.log("\n📅 Content Calendar\n");
  console.log("─".repeat(60));
  
  let currentDay = 0;
  for (const post of calendar) {
    if (post.day !== currentDay) {
      currentDay = post.day;
      console.log(`\n📆 Day ${post.day}`);
      console.log("─".repeat(40));
    }
    
    console.log(`  🕐 ${post.scheduledTime} | ${post.topic}`);
    console.log(`     ${post.title}\n`);
  }
  
  console.log("─".repeat(60));
  console.log(`\n✅ Total posts: ${calendar.length}\n`);
}

async function main() {
  const args = process.argv.slice(2);
  const options: CalendarOptions = {
    posts: 30,
    platform: "linkedin",
    days: 30,
    topics: DEFAULT_TOPICS
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === "--generate" || arg === "-g") {
      options.posts = parseInt(args[++i]) || 30;
    } else if (arg === "--platform" || arg === "-p") {
      const platform = args[++i]?.toLowerCase();
      if (["linkedin", "twitter", "instagram", "tiktok"].includes(platform)) {
        options.platform = platform;
      }
    } else if (arg === "--days" || arg === "-d") {
      options.days = parseInt(args[++i]) || 30;
    } else if (arg === "--topics" || arg === "-t") {
      options.topics = [];
      while (i + 1 < args.length && !args[i + 1].startsWith("-")) {
        options.topics.push(args[++i]);
      }
      if (options.topics.length === 0) {
        options.topics = DEFAULT_TOPICS;
      }
    } else if (arg === "--help" || arg === "-h") {
      console.log(`
Content Calendar Generator
==========================

Usage:
  content-calendar-generator [options]

Options:
  --generate, -g <number>   Number of posts to generate (default: 30)
  --platform, -p <name>     Platform: linkedin, twitter, instagram, tiktok (default: linkedin)
  --days, -d <number>       Number of days for the calendar (default: 30)
  --topics, -t <words...>   Topics to include in the calendar
  --help, -h               Show this help message

Examples:
  content-calendar-generator --generate 30 --platform linkedin --days 30
  content-calendar-generator -g 40 -p twitter -d 70 -t "AI" "Automation" "Agents"
`);
      process.exit(0);
    }
  }
  
  const calendar = generateCalendar(options);
  displayCalendar(calendar);
}

main().catch(console.error);
