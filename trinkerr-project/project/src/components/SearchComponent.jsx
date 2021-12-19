import React from 'react';
// import axios from 'axios'
import styles from './Styling.module.css'

import data from '../mockServer/db.json'
// console.log('data',data)

const SearchComponent =()=> {

  const [query, setQuery] = React.useState('')
  const [queriedData, setQueriedData] = React.useState([])

  React.useEffect(()=>{
    let c = 0

    let res = JSON.parse( localStorage.getItem('staticData') )

    if( res === null){

        let arr = data.data
        let resArr = []
  
        for(let i=0; i<arr.length; i++){
          resArr.push([...arr[i], true,c++])
        }
        localStorage.setItem('staticData', JSON.stringify(resArr))

   
    }
    
  },[])


  React.useEffect(()=>{
      // console.log(query)

    if(query.length === 0 || query.charCodeAt(0) === 32){
      setQueriedData('')
    }else{

      let staticData = JSON.parse( localStorage.getItem('staticData'))
      // console.log(staticData)

      let res = staticData.filter((el)=>el[0].includes(query))
      // console.log('res',res)
      localStorage.setItem( 'res' ,JSON.stringify(res))
      setQueriedData( JSON.parse( localStorage.getItem('res') ) )
      
    }
    
  },[query])


  const handleInfo=(id)=>{
   
    // console.log(id)

    let staticData = JSON.parse( localStorage.getItem('staticData'))
    
    let res1 = staticData.map((el)=>{
      // console.log(el[4], id)
      if(el[4] === id){
        // console.log('yes', el[4], id)
        let [el0,el1,el2,el3,el4] = [...el]
        el3 = !el3

        let resArray = []
        resArray.push(el0, el1,el2, el3,el4)
        return resArray
      }else{
        return el
      }
    })

    // console.log('res1',res1)

    localStorage.setItem('staticData', JSON.stringify(res1))

    staticData = JSON.parse( localStorage.getItem('staticData'))

    let res = staticData.filter((el)=>el[0].includes(query))

    // console.log('res',res)
    localStorage.setItem( 'res' ,JSON.stringify(res))
    setQueriedData( JSON.parse( localStorage.getItem('res') ) )

  }



  
  return (
    <div >
     <input className={styles.inputElement} placeholder="Search Stocks..." value = {query} onChange={(e)=>{ setQuery(e.target.value)}}/>
     <div>
       {
         queriedData && queriedData.map((el,i)=><div key ={i} className={styles.showData}>


               <div className={styles.showData__divElement}>

                    {
                        (el[0].trim().split('::')).map((e,i)=>{

                            if( i === 0){
                                return <div key={i} style={{color: el[1]-el[2]>0 ? "green" : "red", fontWeight:"bold", fontSize:"16px"}}>{e}</div>
                            }else{
                                return <div key={i} className={styles.showData__nsc}>{e}</div>
                            }
                        })
                    }
                </div>

                <button onClick={()=>handleInfo(el[4])} className={ el[3] ? styles.showData__buttonAdd : styles.showData__buttonDelete}>{el[3] ? "ADD" : "DELETE"}</button>
        </div>)
       }
     </div>
    </div>
  );
}

export {SearchComponent};










 //   axios.get(`http://localhost:3001/data`)
    //   .then((res)=> {
    //     let arr = res.data
    //     let resArr = []
  
    //     for(let i=0; i<arr.length; i++){
    //       resArr.push([...arr[i], true,c++])
  
    //     }
  
    //     return(
    //       localStorage.setItem('staticData', JSON.stringify(resArr))
    //     )
    //   })
    //   .catch((err)=>console.log(err))