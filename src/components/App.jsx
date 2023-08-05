import React from 'react';
import Die from './Die.jsx';
import Popup_Comp from './Popup_Comp.jsx';
import Confetti from 'react-confetti'

export default function App(){

    const [arr,setArr]=React.useState(new_array_render());
    const [won,setWon]=React.useState(false);
    const [count,setCount]=React.useState(0);

    React.useEffect(()=>{
        localStorage.setItem('max_score',10000);
    },[])

    React.useEffect(()=>{
        if (count !==0 && count < localStorage.getItem('max_score')  ) localStorage.setItem('max_score',count)
    },[won])

    React.useEffect(()=>{
        let flag=1;
        for (let i=1;i<arr.length;i++){
            flag=flag & arr[i].isHeld & (arr[i-1].value===arr[i].value);
        }
        flag&=arr[0].isHeld;
        if (flag) setWon(true);
    },[arr])
    

    function new_array_render(){
        let num_of_dies=10;
        let arr=[];
        for (let i=0;i<num_of_dies;i++){
            arr.push({
                value:Math.floor(Math.random()*(6))+1,
                isHeld:false
            });
        }
        return arr;
    }

    function changearr(){
        return arr.map( obj=> {
            if (!obj.isHeld){
                return {
                    ...obj,
                    value:Math.floor(Math.random()*(6))+1,
                }
            }
            else return obj;
        })
    }


    function resetArr(){
        let newarr=new_array_render();

        setArr(newarr.map((x)=>{
            x.isHeld=false;
            return x;
        }))
    }

    function holdDice(id){
        setArr(
            arr.map( (element,index) => {
                if (index===id){
                    return {
                        ...element,
                        isHeld:!element.isHeld,
                    }
                }
                else return element;
            })
        )
    }

    
    
    function handleRollClick(){
        setArr(changearr());
        setCount(x=>x+1);
    }
    
    function handlePlayAgainClick(){
        setWon(p=>!p);
        setCount(0);
        resetArr();
    }
    
    function render_dies(){
        return arr.map((obj,index)=>(
            < Die 
                key={index} 
                id={index}
                obj={obj} 
                handleClick={holdDice}
            /> 
        ))
    }

    return (
        <main className='main'>
            <Popup_Comp/>
            
            <section className='dies'>
                {render_dies()}
            </section>
            { !won ?
                <button 
                className='roll_button' 
                onClick={handleRollClick}>
                ROLL
                </button>
                :
                <>
                    <button 
                    className='roll_button' 
                    onClick={handlePlayAgainClick}>
                    NEW GAME 
                    </button>
                    <div className='winning_mssg'>
                    YOU WIN !! <br/>Score: {count}
                    </div>
                    <Confetti/>
                </>
            }
            <div className="max_score">
                Max Score: {localStorage.getItem('max_score')==10000?"-":localStorage.getItem('max_score')}
            </div>
            
        </main>
    )
}