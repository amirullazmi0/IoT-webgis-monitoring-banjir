import React from 'react'
import CardCount from './CardCount'
import CardData from './CardData'
import CardKoordinat from './CardKoordinat'

const SectionAdmin = ({ props }) => {
    return (
        <div className='card shadow-lg bg-white mt-4 mb-4'>
            <div className="card-body p-3">
                <CardCount base_url={props.base_url} />
                <div className="grid lg:grid-cols-2 gap-2">
                    <CardData base_url={props.base_url} />
                    <CardKoordinat base_url={props.base_url} />
                </div>
            </div>
        </div>
    )
}

export default SectionAdmin