![Next.js](https://img.shields.io/badge/Next.js-13.0.0-lightgrey)
![TypeScript](https://img.shields.io/badge/TypeScript-4.8.3-blue)
![MUI](https://img.shields.io/badge/MUI-5.10.6-blue)

# next-wars

## See the project live [here](https://next-wars.vercel.app/)

This project retrieves data from the Star Wars API and displays the results using Next.js, TypeScript, and MUI. The project is designed around two endpoints. The people endpoint retrieves all people and displays some of their information. The planets endpoint retrieves planet information and replaces the URLs in the residents arrays with the names of the residents.

The project allows users to paginate between the previous and next endpoints to fetch data. The sorting buttons allow for sorting between name, height, and mass. Dedicated JSON buttons are included to fetch directly from the API via the routes /api/people and /api/planets and have been limited to twenty people and planets until the fetching of all information is optimized and cached. Return to main menu buttons are included to return to the main page. 

The project currently allows ten people or planets to be retrieved with getStaticProps, and then allows the client to retrieve the next set with client-side fetching while caching the responses with the Cache API. The project may eventually get all data from getStaticProps at build time and implement pagination in another way.

---

![project-screenshot-1](/assets/images/project-screenshots/project-screenshot-1.webp)

![project-screenshot-2](assets/images/project-screenshots/project-screenshot-2.webp)

![project-screenshot-3](assets/images/project-screenshots/project-screenshot-3.webp)

![project-screenshot-4](assets/images/project-screenshots//project-screenshot-4.webp)

![project-screenshot-5](assets/images/project-screenshots/project-screenshot-5.webp)

![project-screenshot-6](assets/images/project-screenshots/project-screenshot-6.webp)

![lighthouse](assets/images/project-screenshots/lighthouse.webp)

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
