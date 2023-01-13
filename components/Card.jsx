import React from 'react'

function Card({ img, instruct, ingredient, drink, truncateString, grid}) {
  const arrIngredients = ingredient.filter((val)=> val !== null)
  return (
    <>
        <div className={grid ? "bg-slate-200 rounded-sm p-2 shadow-md" : "flex flex-row bg-slate-200 rounded-sm p-2 shadow-md"}>
            <img src={img} className={grid ? "w-full object-cover object-center rounded-t-md" : "w-28 h-28 md:h-auto md:w-[200px] my-auto"} />
            <div className={!grid ? "mx-4 " : ""}>
                <h1 className='font-bold text-lg my-2'>{drink}</h1>
                <h3 className='font-semibold text-sm mb-1'>Ingredients: 
                  <span className='font-normal'> {arrIngredients.join("/")}</span>
                </h3>
                <h3 className='font-semibold text-sm'>Instruction: </h3>
                <p className='text-sm'>{grid ? truncateString(instruct) : instruct}</p>
            </div>
        </div>
    </>
  )
}

export default Card

