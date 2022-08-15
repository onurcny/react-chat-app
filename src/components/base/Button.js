import React, { useEffect, useState } from 'react'

export default function Button({
    title = "title",
    onClick = () => null
}) {
    return (
        <button
            onClick={onClick}
            className={'w-full h-8 rounded bg-gradient-to-t from-primary to-secondary hover:to-primary'}>
            <span className='text-white'>{title}</span>
        </button>
    )
}
