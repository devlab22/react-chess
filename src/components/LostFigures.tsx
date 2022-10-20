import React, {FC} from 'react';
import { Figure } from '../models';

interface LostProps{
    title: string;
    figures: Figure[];
}
const LostFigures: FC<LostProps>  = ({title, figures}) => {
    return (
        <div className='lost'>
            <h3>{title}</h3>
            {figures.map(figure => (
                <div key={figure.id}>
                    {figure.name} {figure.logo && <img height={20} width={20} src={figure.logo} alt={figure.name}/>}
                </div>
            ))}
        </div>
    );
};

export default LostFigures;