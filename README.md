# NeighborAid

**Connecting Orange County residents with essential community resources.**

NeighborAid is a community assistance web application designed to help individuals discover local support services based on their needs. Whether someone is looking for food assistance, housing support, financial relief, or health resources, NeighborAid provides a simple and accessible way to explore relevant organizations.

## The Problem

Finding reliable community assistance can be overwhelming. Information is often spread across different websites, making it difficult for individuals to identify which organizations offer the support they need.

NeighborAid aims to simplify this process by bringing essential community resources together in one easy-to-navigate platform.

## Our Solution

NeighborAid helps users identify their needs, discover relevant Orange County organizations, and save useful resources for later.

The current MVP uses keyword-based classification to suggest assistance categories without requiring user accounts or a separate backend.

## Key Features

- **Personalized Assistance:** Users describe their needs and receive category suggestions based on keyword matching.
- **Resource Discovery:** Browse local organizations across four assistance categories.
- **Resource Details:** View organization information and access official websites.
- **Saved Resources:** Bookmark useful organizations and remove them when no longer needed.
- **Action Plan:** Access a checklist to help organize next steps.
- **Responsive Design:** Navigate the application across desktop and mobile screen sizes.

## Assistance Categories

| Category | Featured Organization | Support |
|---|---|---|
| Housing | 211 Orange County | Housing information and referrals |
| Food | Second Harvest Food Bank of Orange County | Food assistance resources |
| Financial | Community Action Partnership of Orange County | Utility assistance information |
| Health & Safety | OC Links | Behavioral health support and referrals |

*NeighborAid is an independent project and is not affiliated with or endorsed by these organizations. Program details, eligibility, and availability should be confirmed directly with each provider.*

## Technology Stack

- **Next.js** — React-based web framework
- **React** — User interface components
- **TypeScript** — Application development
- **Tailwind CSS** — Responsive styling
- **Browser Storage** — Local persistence of saved resources
- **Git & GitHub** — Version control and collaboration
- **Vercel** — Deployment platform (configuration in progress)

### Architecture

The current MVP operates without a separate backend service or database. Community resource information is maintained within the application, assistance suggestions use keyword-based logic, and saved resources are stored locally in the user's browser.

No user registration, authentication, or external AI API is required.

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/estherric/NeighborAid.git
cd NeighborAid
```

**2. Switch to the MVP integration branch**

```bash
git switch feature/figma-integration
```

**3. Navigate to the web application**

```bash
cd web
```

**4. Install dependencies**

```bash
npm install
```

**5. Start the development server**

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

On Windows PowerShell, use `npm.cmd` instead of `npm` if script execution is restricted.

### Production Build

```bash
npm run build
npm run start
```

## How to Use NeighborAid

1. **Start on the homepage:** Navigate to the Assistance section.
2. **Describe your needs:** Enter a short description of the type of help you're looking for.
3. **Explore suggestions:** Review the recommended assistance category and available resources.
4. **View resource details:** Learn more about an organization and follow its official links.
5. **Save useful resources:** Bookmark organizations to revisit later.
6. **Plan your next steps:** Use the Action Plan page to organize follow-up actions.

## Project Scope and Limitations

NeighborAid is a hackathon MVP intended to demonstrate a more accessible approach to discovering community resources.

- Resource listings are currently limited to a small set of Orange County organizations.
- Assistance classification uses predefined keywords rather than a generative AI model.
- Resource information may change and should be verified with official providers.
- Saved resources are stored locally and do not synchronize between devices.
- The platform does not submit applications, determine eligibility, or guarantee access to services.

## Future Improvements

Potential enhancements include:

- Expanding the community resource directory
- Adding location-based resource discovery
- Improving multilingual accessibility
- Integrating regularly updated resource information
- Enhancing search and recommendation capabilities
- Supporting optional cross-device saved resources

## Our Mission

We believe finding help should be simple, accessible, and less overwhelming.

**NeighborAid brings community resources closer to the people who need them.**