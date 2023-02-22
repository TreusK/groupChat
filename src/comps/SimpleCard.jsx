import { FaRegStar, FaFontAwesomeFlag, FaDesktop } from 'react-icons/fa';

function SimpleCard({ icon }) {

  return (
    <div className='bg-[#F7F7F7] flex md:flex-col justify-around items-center p-6 w-[375px] h-[220px] md:w-[250px] md:h-[330px] rounded-lg border border-solid shadow border-[#8D8E8F]'>
      {icon === 'star' &&
        <>
          <div className='cardHead flex justify-center items-center flex-[5]'>
            <FaRegStar className='w-16 h-16 text-amber-300' />
          </div>
          <div className='w-[2px] h-1/2 bg-gray-200 md:w-1/2 md:h-[2px]'></div>
          <div className='cardBody text-center flex-[8] pl-2 md:pl-0'>
            <h2 className='text-xl p-4'>Make new friends</h2>
            <p>Your old friends are probably here too!</p>
          </div>
        </>
      }

      {icon === 'flag' &&
        <>
          <div className='cardHead flex justify-center items-center flex-[5]'>
            <FaFontAwesomeFlag className='w-16 h-16 text-orange-500' />
          </div>
          <div className='w-[2px] h-1/2 bg-gray-200 md:w-1/2 md:h-[2px]'></div>
          <div className='cardBody text-center flex-[8] pl-2 md:pl-0'>
            <h2 className='text-xl p-4'>Connect with foreigners</h2>
            <p>People from all over the world use this!</p>
          </div>
        </>
      }

      {icon === 'desktop' &&
        <>
          <div className='cardHead flex justify-center items-center flex-[5]'>
            <FaDesktop className='w-16 h-16 text-green-400' />
          </div>
          <div className='w-[2px] h-1/2 bg-gray-200 md:w-1/2 md:h-[2px]'></div>
          <div className='cardBody text-center flex-[8] pl-2 md:pl-0'>
            <h2 className='text-xl p-4'>PC Only</h2>
            <p>Using your phones to communicate is a thing of the past!</p>
          </div>
        </>
      }
    </div>
  )
}

export default SimpleCard
