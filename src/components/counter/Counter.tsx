import React, {useEffect, useState} from 'react';
import styles from './counter.module.scss';
import Increment from '../../assets/svg/increment.svg'
import Decrement from '../../assets/svg/decrement.svg'

type Props = {
    count: number,
    changeCounter: (count: number) => void;
}

const Counter: React.FC<Props> = ({count = 1, changeCounter}) => {
    const [counter, setCounter] = useState(count);

    useEffect(() => {
        setCounter(count);
    }, [count]);

    const incrementHandle = () => {
        setCounter(counter + 1);
        changeCounter(counter + 1);
    }

    const decrementHandle = () => {
        if (counter > 1) {
            setCounter(counter - 1);
            changeCounter(counter - 1);
        }
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (+e.target.value >= 1) {
            setCounter(+e.target.value);
            changeCounter(+e.target.value)
        }
    }

    return (
        <div className={styles.counter}>
            <button className={styles.btn}
                disabled={counter === 1}
                onClick={decrementHandle}
            ><Decrement></Decrement>
            </button>
            <input
                type="number"
                min="1"
                inputMode="numeric"
                className={styles.counterInput}
                onChange={changeHandler}
                value={counter}/>
            <button className={styles.btn}
                onClick={incrementHandle}
            ><Increment></Increment>
            </button>
        </div>
    );
};

export default Counter;
