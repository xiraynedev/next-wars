![Next.js](https://img.shields.io/badge/Next.js-13.0.0-lightgrey)
![TypeScript](https://img.shields.io/badge/TypeScript-4.8.3-blue)
![MUI](https://img.shields.io/badge/MUI-5.10.6-blue)

# next-wars

## See the application live [here](https://next-wars.vercel.app/)

Next Wars was built with Next.js, React, TypeScript, and Tailwind CSS to retrieve data from the Star Wars API. The application was designed around two endpoints. The people endpoint to retrieve all people and display some of their information on the client. The planets endpoint to retrieve planet information and replace the URLs in the residents arrays with the names of the residents.

The application allows users to paginate between the previous and next endpoints to fetch data. The sorting buttons allow for sorting between name, height, and mass. Dedicated JSON buttons are included to fetch directly from the API via the routes /api/people and /api/planets. The application currently allows ten people or planets to be retrieved with getStaticProps, and then allows the client to retrieve the next set with client-side fetching while caching the responses with the Cache API.

The next version of the application is a work in progress and will incorporate hand drawn images of the main characters.

---

![application screenshot](assets/images/application-screenshots/application-screenshot.webp)

![people screenshot](assets/images/application-screenshots/people-screenshot.webp)

![people screenshot 2](assets/images/application-screenshots/people-screenshot-2.webp)

![planets screenshot](assets/images/application-screenshots/planets-screenshot.webp)

![planets screenshot 2](assets/images/application-screenshots/planets-screenshot-2.webp)

![people api](assets/images/application-screenshots/people-api.webp)

![planets api](assets/images/application-screenshots/planets-api.webp)

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
