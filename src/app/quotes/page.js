import React from 'react'
import Quotes from '@/components/Quotes'

function QuotesPage() {
    return (
        <div className="flex flex-col p-4 gap-3">
            <h1 className="font-medium text-[30px]">Quotes page</h1>
            <p>This page is intended to showcase RTK Query.</p>
            <div className="pt-4">
                <Quotes />
            </div>
        </div>
    )
}

export default QuotesPage
