![Next.js](https://img.shields.io/badge/Next.js-14.0.4-lightgrey)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.3-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.2.6-blue)

# next-wars

## See the application live [here](https://next-wars.vercel.app/)

Next Wars was built with Next.js, React, TypeScript, and Tailwind CSS to retrieve data from the Star Wars API. The application was designed around two endpoints. The people endpoint to retrieve all people and display some of their information on the client. The planets endpoint to retrieve planet information and replace the URLs in the residents arrays with the names of the residents.

The application allows users to paginate between the previous and next endpoints to fetch data. The sorting buttons allow for sorting between name, height, and mass. Dedicated JSON buttons are included to fetch directly from the API via the route /api/people and can sort the data by name, height, or mass. The application currently allows ten people or planets to be retrieved with getStaticProps, and then allows the client to retrieve the next set with client-side fetching while caching the responses with the Cache API.

---

![application screenshot](assets/images/application-screenshots/application-screenshot.webp)

![people screenshot](assets/images/application-screenshots/people-screenshot.webp)

![planets screenshot](assets/images/application-screenshots/planets-screenshot.webp)

![people api](assets/images/application-screenshots/people-api.webp)

![lighthouse screenshot](assets/images/application-screenshots/lighthouse.webp)

## Installation Instructions

1. Clone the repo:

```sh
git clone https://github.com/xiraynedev/next-wars.git
```

2. Change directory:

```sh
cd next-wars
```

3. Install dependencies

```sh
npm i
```

4. Start the dev server:

```sh
npm run dev
```
