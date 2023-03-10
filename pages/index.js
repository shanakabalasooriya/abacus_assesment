import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import {TfiLayoutGrid2Alt} from 'react-icons/tfi'
import { ImMenu } from 'react-icons/im'

import Card from '../components/Card'


export default function Home() {
  const [grid, setGrid] = useState(true)
  const [drinks, setDrinks] = useState([])
  const [searchTitle, setSearchTitle] = useState("")

  const fetchDrinks = async(name)=>{
    await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then( results => results.json())
    .then(data => setDrinks(data.drinks))
    .catch(error => console.log(error))
  }

  const searchHandler = ()=>{
    fetchDrinks(searchTitle)
  }

  const truncateString =(str)=>{
    if(str?.length > 70){
        return str.slice(0, 70) + '...'
    }else{
      return str
    }
  }

  
  useEffect(() => {
    fetchDrinks("margarita")
  }, [])
  
  return (
    <>
      <Head>
        <title>abacus prj</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='max-w-[80%] justify-center mx-auto'>

        <div className='flex flex-row  mt-10 gap-x-1'>
          <div className='flex-1 border-[1px] border-gray-400 rounded-sm'>
            <input type="text" name='search' placeholder='Search Text' onChange={(e)=>setSearchTitle(e.target.value)} className='p-2 w-full outline-none'/>
          </div>
          <div className='hover:bg-gray-400'>
            <button onClick={searchHandler} className='border-[1px] border-gray-400 p-2 px-10 rounded-sm hover:text-white font-semibold'>search</button>
          </div>
        </div>

        <div className='mt-8'>
          <div className='flex justify-end gap-x-1'>
            <button onClick={()=> setGrid(true)} className={grid ? 'p-1 bg-gray-400 border-[1px] border-gray-400 ' : "p-1 border-[1px] border-gray-400"}>
              <TfiLayoutGrid2Alt />
            </button>
            <button onClick={()=> setGrid(false)} className={!grid ? 'p-1 bg-gray-400 border-[1px] border-gray-400 ' : "p-1 border-[1px] border-gray-400"}>
              <ImMenu/>
            </button>
          </div>
          
          <div className={grid ? "mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10 " : "mt-8 flex flex-col gap-8"}>
            {drinks && drinks.map((item)=>{
              const {idDrink, strDrinkThumb, strDrink, strInstructions} = item
              const {strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5} = item
              const ingredientsArr = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5] //ingredients are in separately in api - not in a single array - had to create an array and add ingredients manually
            
              return(
                <Card 
                  key={idDrink} 
                  img={strDrinkThumb} 
                  drink={strDrink} 
                  ingredient={ingredientsArr} 
                  instruct={strInstructions} 
                  truncateString={truncateString} 
                  grid={grid}/>
              )
            })}
          </div>

        </div>
      </div>
    </>
  )
}
