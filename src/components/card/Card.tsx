import { FC, forwardRef, useState } from 'react';
import styles from './card.module.scss';

const favoriteToggle = ()=>{
    
}
type InputProps = React.HTMLProps<HTMLInputElement> 


//const Input: FC<InputProps> = forwardRef(({ label, error, ...props }, ref) => {
    
const Card: FC<InputProps> = forwardRef(({ span,  ...props }, ref) => {
   // const [typeInput, setTypeInput] = useState(props.type);

return (    
    <div className={styles.card__container}>
    <div className={styles.card__img}>
    <div className={styles.card__favorite} onClick={favoriteToggle}></div>
    </div>
    <span className={styles.card__title}>{span}</span>
    <div className={styles.price__container}>
        <div className={styles.price}>29 BYN</div>
        <button className={styles.btn}>В корзину</button>
    </div>
    <div className={styles.line}></div>
    <div className={styles.quantity__container}>
        <div className={styles.stepper}>
        <div className={styles.minus}></div>
        <div className={styles.number}>
            <label className={styles.label} htmlFor="number"></label>
            <input
            className={styles.input}
            type="number"
            name="number"
            id="number"
            placeholder="1"
            />
        </div>
        <div className={styles.plus}></div>
        </div>
        <div className={styles.detailed}>...Подробнее</div>
    </div>
    </div>
    
);
});

export default Card;