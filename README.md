# react-site

Updated version of tessmero.github.io based on [React](https://react.dev/).

Migrated from Jekyll/Bootstrap to [NextJS](https://nextjs.org/)/[Tailwind](https://tailwindcss.com/).

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

Build static website, output in ```out```

```bash
npm run build
```

Test static website locally

```bash
cd out
python3 -m http.server
```


