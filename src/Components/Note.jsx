
const Note = ({data , handleDelete , handleEdit}) => {

  return (
    <div className='mx-8 my-3 py-2 px-4 text-justify bg-[#22272b] rounded-2xl flex justify-between items-center'>
        <div className='w-[25vw] sm:w-[40vw] md:w-[50vw] xl:w-[56vw]'>
            {data.input}
        </div>
        <div className="flex gap-4">
            <i onClick={()=>{handleEdit(data.id)}} className="fa-regular fa-pen-to-square text-white cursor-pointer"></i>
            <i onClick={()=>{handleDelete(data.id)}} className="fa-solid fa-trash text-white cursor-pointer"></i>
        </div>
    </div>
  )
}

export default Note