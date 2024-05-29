import React from 'react';
import Card from '../../components/card/Card';
import styles from './catalog.module.scss'


const data =  [
  {title:'Анакампсерос руфесценс Санрайз'},
  {title:'Сансевиерия трехпучковая Муншайн'},
  {title:'Крассула Храм Будды'} 
]  



const Catalog: React.FC = () => {  
  
  return (
    <>
    <h1>Каталог</h1>
    <div className={styles.catalog__container}>                              
                {data.map(card=><Card key={card.title}>{card.title}</Card>)}                              
    </div>
      </>
    
    
  );
};

export default Catalog;
//Анакампсерос руфесценс Санрайз