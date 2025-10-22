# react-site

Updated version of tessmero.github.io, migrated from Jekyll/Bootstrap to [NextJS](https://nextjs.org/)/[Tailwind](https://tailwindcss.com/).

[old website repo](https://github.com/tessmero/old-tessmero.github.io) 
[old website template](https://nicolas-van.github.io/bootstrap-4-github-pages/)

<details>
    <summary>template for this repo</summary>

[create-next-app documentation](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
```bash
> npx create-next-app@latest
What is your project named?  react-site
Would you like to use TypeScript?  Yes
Which linter would you like to use?  ESLint
Would you like to use Tailwind CSS?  Yes
Would you like your code inside a `src/` directory?  Yes
Would you like to use App Router? (recommended) Yes
Would you like to use Turbopack? (recommended) Yes
Would you like to customize the import alias (`@/*` by default)? Yes
```

</details>

# Usage

Install dependencies

```bash
npm install
```


Start local development server

```bash
npm run dev
```

Enforce coding style standards defined in `eslint.config.mjs`

```bash
npx eslint --fix
```

Build static website, output in ```out```

```bash
npm run build
```

Test static website locally

```bash
cd out
python3 -m http.server
```

### Adding Routes

Add a subfolder under `src/app` to define a new route.
- Define "server-side" logic in `page.tsx` 
  - e.g. loading a list of demos 
  - runs at build-time when we generate the static website
- Define client-side logic in `index.tsx` with `'use client'`
    - e.g. sorting and filtering demos
    - runs on the user's web browser interactively
- Add a corresponding `page.tsx` under `src/app/@navbar` 
    - should just point to the common navbar module. 
    - linked automatically through the `navbar` property in `src/app/layout.tsx`.

#### @navbar reasoning
The root layout and navbar are the same on all pages. We don't want them to clutter page-specific code. Still, we want to leave open the possiblity to have page-specific elements in the navbar. For example, the playable demo pages have a fullscreen button in the navbar. Our solution is to use [Next.js parallel routes](https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes).




