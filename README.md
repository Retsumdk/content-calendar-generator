# Content Calendar Generator

A CLI tool for generating social media content calendars with posting schedules and topic suggestions.

## Installation

```bash
bun install content-calendar-generator
```

## Usage

```bash
content-calendar-generator
  --generate <number-of-posts>
  --platform {linkedin|twitter|instagram|tiktok}
  --days <days>
  --topics x
```

## Examples

### Generate a 30-day calendar

```bash
content-calendar-generator --generate 30 --platform linkedin --days 30
```

### Generate with specific topics

```bash
content-calendar-generator --generate 40 --platform twitter --days 70 --topics "AI" "Automation" "Agents"
```

## Development

```bash
# Clone
git clone https://github.com/Retsumdk/content-calendar-generator.git

# Install deps
bun install
# or
npm install

# Run tests
npm test
```

## License

MIT

## Built by The BookMaster
