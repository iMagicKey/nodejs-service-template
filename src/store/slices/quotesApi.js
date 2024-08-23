// Необходимо использовать React-специфическую точку входа для импорта `createApi`
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const quotesApiResponse = {
//     quotes: [quote],
//     total: 100,
//     skip: 0,
//     limit: 10,
// }

// Определяем сервис, используя базовый URL и ожидаемые конечные точки
export const quotesApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/quotes' }),
    reducerPath: 'quotesApi',
    // Типы тегов используются для кэширования и аннулирования.
    tagTypes: ['Quotes'],
    endpoints: (build) => ({
        // Указываем возвращаемый тип данных и тип аргумента для запроса.
        // В JavaScript нет прямой аналогии с generics из TypeScript, но функциональность остается.
        getQuotes: build.query({
            query: (limit = 10) => `?limit=${limit}`,
            // `providesTags` определяет, какой "тег" присваивается
            // кэшированным данным, возвращенным запросом.
            providesTags: (result, error, id) => [{ type: 'Quotes', id }]
        })
    })
})

// Хуки автоматически генерируются RTK-Query
// Экспортируем хук, который аналогичен `quotesApiSlice.endpoints.getQuotes.useQuery`
export const { useGetQuotesQuery } = quotesApiSlice
