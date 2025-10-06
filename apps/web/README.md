This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Cloudflare Pages

This project is configured for deployment on Cloudflare Pages with Cloudflare Workers support.

### Environment Variables

Create a `.env.local` file in the project root with your environment variables:

```bash
# Database
DATABASE_URL=your-database-url

# Authentication
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# External APIs
OPENAI_API_KEY=your-openai-api-key

# File Storage (R2)
CLOUDFLARE_R2_ACCESS_KEY_ID=your-r2-access-key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-r2-secret-key
CLOUDFLARE_R2_BUCKET_NAME=your-bucket-name

# OCR Services
OCR_API_KEY=your-ocr-api-key
```

**Important**: In Cloudflare Workers, environment variables are accessed via the `env` parameter in API routes and middleware, not `process.env` (unless the `nodejs_compat` flag is enabled).

### Local Development

```bash
# Install dependencies
npm install

# Run development server (Next.js with Turbopack)
npm run dev

# Preview production build (Wrangler)
npm run preview

# Build for production (OpenNext Cloudflare)
npm run build-open

# Deploy to Cloudflare Pages
npm run deploy
```

### CI/CD

The project includes GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically deploys to Cloudflare Pages on pushes to the `main` branch.

Required secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Cloudflare Configuration

The `wrangler.toml` file is configured with:
- Node.js compatibility for full feature support
- Compatibility date: 2025-04-01
- Support for environment-specific configurations

For more details, see the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/) and [OpenNext Cloudflare guide](https://opennext.js.org/cloudflare).
