import React from 'react';
import styles from './Styling.module.css'
import data from '../mockServer/db.json'        

const SearchComponent =()=> {

  const [query, setQuery] = React.useState('')
  const [queriedData, setQueriedData] = React.useState([])


  // ..............................On Mounting of the component, get the data from the server and store it in local Storage.........................
  
  React.useEffect(()=>{
    let c = 0

    let res = JSON.parse( localStorage.getItem('staticData') )         //using the localStorage because the state vanishes when we reload the page. Hence used localStorage to persist data in the react app   

    if( res === null){                                                                                 

        let arr = data.data
        let resArr = []
  
        for(let i=0; i<arr.length; i++){
          resArr.push([...arr[i], true,c++])                      //Add the properties (boolen and id). They will be used to add and delete the data and for toggling.
        }
        localStorage.setItem('staticData', JSON.stringify(resArr))

   
    }
    
  },[])


 //................................For every change in the input / query, fiter out the data for that perticular input ..........................
  
 React.useEffect(()=>{

    if(query.length === 0 || query.charCodeAt(0) === 32){
      setQueriedData('')
    }else{

      let staticData = JSON.parse( localStorage.getItem('staticData'))

      let res = staticData.filter((el)=>el[0].includes(query))

      localStorage.setItem( 'res' ,JSON.stringify(res))
      setQueriedData( JSON.parse( localStorage.getItem('res') ) )
      
    }
    
  },[query])


  //...............................On clicking a perticular data..........................

  const handleInfo=(id)=>{
   

    let staticData = JSON.parse( localStorage.getItem('staticData'))
    
    let res1 = staticData.map((el)=>{

      if(el[4] === id){

        let [el0,el1,el2,el3,el4] = [...el]
        el3 = !el3                                             //change the status of that data to !status

        let resArray = []
        resArray.push(el0, el1,el2, el3,el4)
        return resArray
      }else{
        return el
      }
    })


    localStorage.setItem('staticData', JSON.stringify(res1))          // set the new data

    staticData = JSON.parse( localStorage.getItem('staticData'))

    let res = staticData.filter((el)=>el[0].includes(query))          // using the data, filter out the data having the desired input

    localStorage.setItem( 'res' ,JSON.stringify(res))                  

    setQueriedData( JSON.parse( localStorage.getItem('res') ) )

  }

  const handleChange=(e)=>{
    let value = e.target.value
    value = value.toUpperCase()
    setQuery( value )
  }



  
  return (
    <div >
     <input className={styles.inputElement} placeholder="Search Stocks..." value = {query} onChange={(e)=>{ handleChange(e)}}/>
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