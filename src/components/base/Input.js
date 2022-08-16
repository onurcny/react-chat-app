import React from 'react'

export default function Input({
    width = 150,
    height = 30,
    label = null,
    onChangeText = () => null
}) {
    return (
        <label className='relative flex-1'>
            {label && (
                <span>{label}</span>
            )}
            <input className={'border-2 border-secondary rounded bg-white bg-opacity-10 outline-none text-white p-1'} style={{
                width,
                height
            }}
                onChange={e => onChangeText(e.target.value)} />
        </label>
    )
}
