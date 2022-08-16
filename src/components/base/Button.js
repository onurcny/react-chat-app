import React, { useEffect, useState } from 'react'

export default function Button({
    title = "title",
    onClick = () => null,
    disabled = false
}) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={'w-full h-8 rounded bg-gradient-to-t from-primary to-secondary hover:to-primary'}>
            <span className='text-white'>{title}</span>
        </button>
    )
}
