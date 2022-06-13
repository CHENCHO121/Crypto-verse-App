import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders={
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '1af9667251mshd5833dd40231b9fp1b0b0cjsndf2633a8c77a',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'

}

const baseUrl='https://bing-news-search1.p.rapidapi.com';

const createRequest=(url)=>({url,headers:cryptoNewsApiHeaders});

export const cryptoNewsApi=createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptosNews:builder.query({
            query:({newsCategory,count})=>createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
});


export const {useGetCryptosNewsQuery} = cryptoNewsApi;




// const options = {
//     method: 'GET',
//     url: 'https://bing-news-search1.p.rapidapi.com/news',
//     params: {safeSearch: 'Off', textFormat: 'Raw'},
//     headers: {
//       'X-BingApis-SDK': 'true',
//       'X-RapidAPI-Key': '1af9667251mshd5833dd40231b9fp1b0b0cjsndf2633a8c77a',
//       'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
//     }
//   };