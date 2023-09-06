import React from 'react'

const CardPopUp = ({ value }) => {
    return (
        <div className='card-popUp'>
            {value <= 10 &&
                <div className="siaga-rendah">
                    Rendah
                </div>
            }
            {value > 10 && value <= 20 &&
                <div className="siaga-sedang">
                    Sedang
                </div>
            }
            {value > 20 &&
                <div className="siaga-tinggi">
                    Tinggi
                </div>
            }
            {/* asd */}
            <div className="value">{value}</div>
        </div>
    )
}

export default CardPopUp