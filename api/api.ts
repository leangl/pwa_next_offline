import fetch from 'isomorphic-unfetch';

export type Show = {
    id: number
    url: string
    name: string
    summary: string
}

export const getShows = async (): Promise<Show[]> => {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.length}`);

    return data.map(entry => entry.show);
};