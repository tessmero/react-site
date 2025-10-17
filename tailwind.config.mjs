import {withMT} from "@material-tailwind/react/utils/withMT";

const config = withMT({
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [
  ],
});

export default config;


 