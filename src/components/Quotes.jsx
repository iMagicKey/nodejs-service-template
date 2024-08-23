'use client'

import React, { useState } from 'react'
import { useGetQuotesQuery } from '@/store/slices/quotesApi'

const options = [5, 10, 20, 30]

export const Quotes = () => {
    const [numberOfQuotes, setNumberOfQuotes] = useState(10)
    const { data, isError, isLoading, isSuccess } = useGetQuotesQuery(numberOfQuotes)

    if (isError) {
        return (
            <div>
                <h1>There was an error!!!</h1>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-3">
                    <h3 className="font-[600]">Select the Quantity of Quotes to Fetch:</h3>
                    <select value={numberOfQuotes} onChange={(e) => setNumberOfQuotes(Number(e.target.value))}>
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                {data.quotes.map(({ author, quote, id }) => (
                    <blockquote key={id} className="border p-4 ">
                        &ldquo;{quote}&rdquo;
                        <footer>
                            <cite>{author}</cite>
                        </footer>
                    </blockquote>
                ))}
            </div>
        )
    }

    return null
}

export default Quotes
