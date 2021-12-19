import React from 'react'
import styles from './Styling.module.css'
import { BiUpArrow,BiDownArrow } from "react-icons/bi";


const WishListComponent =()=>{
   const [wishList, setWishList] = React.useState([])

   React.useEffect(()=>{

    let staticData = JSON.parse( localStorage.getItem('staticData'))
    let res = staticData.filter((el)=> el[3] === false)

    localStorage.setItem( 'wishList' ,JSON.stringify(res))
    setWishList( JSON.parse( localStorage.getItem('wishList') ) )

   },[])

   const handleDelete=(id)=>{

    let staticData = JSON.parse( localStorage.getItem('staticData'))
    
    let res1 = staticData.map((el)=>{

        if(el[4] === id){

        let [el0,el1,el2,el3,el4] = [...el]
        el3 = !el3

        let resArray = []
        resArray.push(el0, el1,el2, el3,el4)
        return resArray
      }else{
        return el
      }
    })


    localStorage.setItem('staticData', JSON.stringify(res1))

    staticData = JSON.parse( localStorage.getItem('staticData'))

    let res = staticData.filter((el)=> el[3] === false)

    localStorage.setItem( 'wishList' ,JSON.stringify(res))
    setWishList( JSON.parse( localStorage.getItem('wishList') ) )
   }

    return(
        <>

        {
            wishList.length === 0 
            ? 
            <div className={styles.showData__wishListMsg}> 
                <img src= 'emptyListImg.png' alt='empty list image'/>
                <h4>Empty List !</h4>
            </div>
            :
            wishList?.map((el)=><div key={el[4]} className={styles.showData}>

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

                <div className={styles.showData__divElement2}>
                    <div style={{color: el[1]-el[2]>0 ? "green" : "red", fontWeight:"bold", fontSize:"16px"}}> {el[1]} </div>
                    <div> 
                        <span className={styles.showData__arrow}>{  el[1]-el[2]>0 ? <BiUpArrow color="green" size={12}/> : <BiDownArrow color="red" size={12}/>}</span>
                        { ( ( ( el[1]-el[2] ) / el[2] ) * 100 ).toFixed(2)}% 
                    </div>
                </div>
            
                <button onClick = {()=>handleDelete(el[4])} className={styles.showData__buttonDelete}>Delete</button>

                
            </div>
            )
        }
        </>
    )
}

export {WishListComponent}