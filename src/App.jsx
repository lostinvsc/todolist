import { useState, useRef, useEffect } from 'react'
import './App.css'

let arr=[];
function App() {
  const [count, setCount] = useState(0)
  const [showfinished, setShow] = useState(true)
  const [array, setArr] = useState([])
  const data = useRef()



  function savedata(){
if(data.current.value!=''){
  let l=localStorage.length;
  let a= JSON.stringify({content:data.current.value, done:false});
  localStorage.setItem(`${l}`,a);
arr.push(localStorage.getItem(`${l-1}`))

  data.current.value='';
  setCount(count + 1)
}
  }

  useEffect(() => {
    let newarr=[];
 
    for (let i = 0; i <100; i++) {
      if(localStorage.getItem(`${i}`)!=null){
      newarr.push(localStorage.getItem(`${i}`))
      localStorage.removeItem(`${i}`)
      }
      }
    setArr(newarr);
      for (let i = 0; i < newarr.length; i++) {
        localStorage.setItem(`${i}`,newarr[i]);
      }
}, [count]);

function del(index){

    setCount(count + 1)
localStorage.removeItem(`${index}`)

}

function edit(index){
setCount(count + 1);

data.current.value=JSON.parse(localStorage.getItem(`${index}`)).content;
// localStorage.removeItem(`${index}`)
}

function changehandle(index){
  let newvar;

  newvar=JSON.parse(localStorage.getItem(`${index}`))
  newvar.done=!(newvar.done);
   localStorage.setItem(`${index}`,JSON.stringify(newvar));   
  setCount(count + 1);

}
  return (
    <div className='w-[100% flex justify-center '>
      <div className=' w-[1000px] flex flex-col items-start bg-purple-200 p-3 gap-y-3 rounded-md'>

        <h1 className='text-2xl w-[100%] text-center' >i-Task Manages all your todos at one place</h1>
        <h3 className='text-xl font-bold'>Add a Todo</h3>

        <div className=' flex gap-4 w-[100%] justify-center'>

          <input type="text" className=' border-stone-950  border-2 w-[80%] rounded-full px-2' ref={data} />
          <button className=' border-stone-950  border-2 px-3 py-1 rounded-full' onClick={savedata}>Save</button>
        </div>
        <hr />
        <div className='flex items-center gap-3'>
          <input type="checkbox" onChange={()=>setShow(!showfinished)} />
          <div>Show Finished</div>
        </div>

        <div className='w-[100%] flex justify-center'>

          <hr className='w-[90%] border-black border-[0.2px]' />
        </div>

        <h1 className=' font-bold'>Your Todos</h1>
        <div className='w-[100%]'>
          <ul className=' list-disc flex flex-col w-[100%]'>
            {array.map((value, index, a) => {
              
               return <li key={index} className={(JSON.parse(value).done&&showfinished)?' hidden flex items-center justify-between mb-2 ':'flex items-center justify-between mb-2'} >
                <div className='flex items-center gap-2'>
                  <input type="checkbox" onChange={()=>{changehandle(index)}}/>
                  <p className={JSON.parse(value).done?' line-through ':''}>{JSON.parse(value).content}</p>
                </div>
                <div className='flex gap-2'>
                  <button className='border-black border-[0.1px]  bg-purple-100 rounded-full px-2' onClick={() => {edit(index)}}>Edit</button>
                  <button className='border-black border-[0.1px]  bg-purple-100 rounded-full px-2' onClick={() => { del(index)}}>Del</button>
                </div>
              </li> 
             
            
            })
            }
          </ul>
        </div>



      </div>
    </div>
  )
}

export default App
