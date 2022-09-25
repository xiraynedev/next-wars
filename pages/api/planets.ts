import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();    

    const fullData = { ...data }

    while(fullData.next) {
        await fetch(fullData.next)
        .then((result: any) => result.json())
        .then((resultData: any) => {
            fullData.next = resultData.next;
            fullData.results.push(resultData.results);
        })
    }

    res.json(fullData);
}
