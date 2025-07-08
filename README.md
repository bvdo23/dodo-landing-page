# Do Bui Van - Landing Page

This is a professional landing page showcasing Do Bui Van's skills and experience as a Full-Stack Developer.

## Features

- Modern, responsive design with animations
- Internationalization support (English and Vietnamese)
- Skills, Experience, Projects, and Contact sections
- Built with Next.js, TypeScript, and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bvdo23/landing-page.git
   cd landing-page
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## CI/CD Setup with Vercel

This project is configured for automatic deployment using GitHub Actions and Vercel.

### Setting up Vercel Deployment

1. Create a Vercel account at https://vercel.com
2. Create a new project and connect it to your GitHub repository
3. In your Vercel project settings, navigate to "General" > "Git" and ensure GitHub integration is set up
4. From your Vercel account settings, create a new token (Settings > Tokens)
5. In your GitHub repository, go to Settings > Secrets and variables > Actions
6. Add the following secrets:
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: Your Vercel organization ID (find in Vercel project settings)
   - `VERCEL_PROJECT_ID`: Your Vercel project ID (find in Vercel project settings)

Once set up, every push to the main branch will automatically deploy your site to Vercel.

## Customization

- Edit the translation files in `src/messages/` to update content
- Modify components in `src/component/` to change layout and design
- Add new tech stack icons in `public/images/tech/`
- Update your profile picture in `public/images/profile.jpg`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
