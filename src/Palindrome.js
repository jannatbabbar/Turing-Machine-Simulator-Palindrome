import { useEffect, useState } from 'react';
import trans from './trans.jpg'

const Palindrome = () => {
    const [arr,setArr] = useState(["B",1,2,0,1,"B"]);
    const [bgcolor, setBgcolor]=useState([]);
    const [currentNum,setCurrent] = useState(arr[1]); 
    const [i, setI] = useState(1);
    const len = arr.length;
    const [change,setChange] = useState(false);
    const [forward, setForward] = useState(true);
    const [pal, setPal] = useState(false);
    const [notpal, setNotPal] = useState(false);
    for(let j=0;j<len;j++){
        bgcolor.push("rgba(217,185,102,255)");
    }

    const forwardFunc = ()=>{
        if(i===1 && arr[i]!="X"){
            const newarr = [];
            for(var k=0;k<len;k++){
                if(k===i){
                    newarr.push("X");
                }
                else{
                    newarr.push(arr[k]);
                }
            }
            setArr(newarr);
        }
        if(change){
            if(arr[i]=="X") setPal(true);
            else{if(arr[i]===currentNum){
                const newarr = [];
                for(var k=0;k<len;k++){
                    if(k===i){
                        newarr.push("X");
                    }
                    else{
                        newarr.push(arr[k]);
                    }
                }
                setArr(newarr);
                
                setForward(false);
                setChange(false);
                setI(i-1);
            }
             else setNotPal(true);
        }
            
        }
        else if(arr[i]==="X" || arr[i]==="B"){
            setChange(true);
            setI(i-1);  
        }
        else setI(i+1);
    }

    const backwardFunc = ()=>{
        // const newarr = arr;
        if(change){
            if(arr[i]!=="X"){
                setCurrent(arr[i]);
                const newarr = [];
                for(var k=0;k<len;k++){
                    if(k===i){
                        newarr.push("X");
                    }
                    else{
                        newarr.push(arr[k]);
                    }
                }
                setArr(newarr);
                setForward(true);
                setChange(false);
                setI(i+1);
            }
            else setPal(true);
        }
        else if(arr[i]==="X"||arr[i]==="B"){
            setChange(true);
            setI(i+1);  
        }
        else setI(i-1);
    }

    const timer = ()=>{
        const bg2 = [];
        if(!pal && !notpal){
        for(var j=0;j<len;j++){
            if(j===i){
                bg2.push("rgb(255, 255, 255, 0.8)");
            }
            else bg2.push("rgba(217,185,102,255)");
        }
        setBgcolor(bg2);
        // if(i===0||i===len-1) {
            // const newarr = [];
            // for(var k=0;k<len;k++){
            //     if(k===i){
            //         newarr.push("x");
            //     }
            //     else{
            //         newarr.push(arr[k]);
            //     }
        //     }
        //     setArr(newarr);
        // }
        
        setTimeout(()=>{
            bg2[i]="rgba(217,185,102,255)";
            setBgcolor(bg2);
        },400)
        if(forward) forwardFunc();
        else backwardFunc();
    }
        // setI(i+1);      

        //  if(i>=5) stopInterval();
    };
    // const callInterval = ()=>{
    //     interval = setInterval(timer,1200);
    // }
    // const stopInterval = ()=>{
    //     clearInterval(interval);
    // }
    useEffect(()=>{
        const interval = setInterval(timer,500)
        return ()=>{
             clearInterval(interval);
        }
    },[i])
    return ( 
        <div className="mainContainer">
            <div>
                <h1 className="mainHeading">Turing Machine Simulator for recognising a palindrome</h1>
            </div>
            <div className="container">
            {
                arr.map((item,index)=>{
                    return(
                        <div>
                            <div style={{backgroundColor: bgcolor[index]}} className="square" >
                                <h4>{item}</h4>    
                            </div>
                            {/* {index===0&&<Arrow />} */}
                        </div>
                    )
                })
            }
            </div>
            <div className="inputTape">
                <h3 >Input tape</h3>
            </div>

            <div className="sidebyside">
                <div className="message">
                    {pal && <h2>Machine Halted. Is a palindrome</h2>}
                    {notpal && <h2>Machine Halted. Not a palindrome</h2>}
                </div>
                <figure>
                    <img src={trans} alt=""/>
                    <figcaption className="caption">State Transition Diagram</figcaption>
                </figure>
                
            </div>
            
            <br/>
            <br/>
            
            
            
        </div>
     );
}
 
export default Palindrome;