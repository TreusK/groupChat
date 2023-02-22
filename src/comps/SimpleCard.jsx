import { FaRegStar, FaFontAwesomeFlag, FaDesktop } from 'react-icons/fa';

function SimpleCard({ icon }) {

  return (
    <div className='bg-[#F7F7F7] text-[#202020] p-12 w-[300px] h-[400px]'>
      {icon === 'star' &&
        <>
          <div className='cardHead flex justify-center'>
            <FaRegStar className='w-16 h-16 text-amber-300' />
          </div>
          <div className='cardBody text-center'>
            <h2 className='text-xl p-4'>Make new friends</h2>
            <p>Your old friends are probably here too!</p>
          </div>
        </>
      }

      {icon === 'flag' &&
        <>
          <div className='cardHead flex justify-center'>
            <FaFontAwesomeFlag className='w-16 h-16 text-orange-500' />
          </div>
          <div className='cardBody text-center'>
            <h2 className='text-xl p-4'>Connect with foreigners</h2>
            <p>People from all over the world get together and talk here!</p>
          </div>
        </>
      }

      {icon === 'desktop' &&
        <>
          <div className='cardHead flex justify-center'>
            <FaDesktop className='w-16 h-16 text-green-400' />
          </div>
          <div className='cardBody text-center'>
            <h2 className='text-xl p-4'>PC Only</h2>
            <p>Using your phones to communicate is a thing of the past!</p>
          </div>
        </>
      }
    </div>
  )
}

export default SimpleCard
