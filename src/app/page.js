"use client"

import { useState, useRef, useEffect } from "react"

export default function Home() {

  const [step, setStep] = useState(1)
  const scrollContainerRef = useRef(null);
  const stepRef = useRef(null);

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    const stepContainer = stepRef.current;
    const isAtBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop <= scrollContainer.clientHeight;

    console.log(scrollContainer.scrollHeight - scrollContainer.scrollTop, scrollContainer.clientHeight)

    if (isAtBottom) {
      // Buraya scroll en aşağıda olduğunda yapılacak işlemi ekleyebilirsiniz
      console.log('Div en aşağıda!');
      // Buraya scroll işlemlerinizi ekleyebilirsiniz
      if(step < 5) {
        console.log('a')
        setStep(prevState => prevState + 1)
        scrollContainer.scrollTop = 0;
      }

      stepContainer.classList.remove('step')
      
      setTimeout(() => {
        stepContainer.classList.add('step')
      }, [10])
    }
    
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    // Scroll olayını dinle
    scrollContainer.addEventListener('scroll', handleScroll);

    // Component çözüldüğünde olay dinleyiciyi temizle
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []); // useEffect sadece bir kere çalışsın diye boş bağımlılık dizisi

  return (
    <div className='h-screen w-full  flex justify-between'>
      <div className='w-[5%] h-screen flex justify-center p-8'>
        <div className='step flex flex-col relative'>
          <div className='absolute top-24 left-1/2 w-0.5 h-48 bg-black' style={{transform: 'translate(-50%,-50%)'}}></div>
          <div className={`z-10 w-6 h-6 rounded-full ${step == 1 ? 'bg-orange-300' : step > 1 ? 'bg-green-300' : 'bg-white'} border border-black flex justify-center items-center text-sm text-black transition-all`}>1</div>
          <div className={`z-10 w-6 h-6 rounded-full ${step == 2 ? 'bg-orange-300' : step > 2 ? 'bg-green-300' : 'bg-white'} border border-black flex justify-center items-center text-sm text-black mt-8 transition-all`}>2</div>
          <div className={`z-10 w-6 h-6 rounded-full ${step == 3 ? 'bg-orange-300' : step > 3 ? 'bg-green-300' : 'bg-white'} border border-black flex justify-center items-center text-sm text-black mt-8 transition-all`}>3</div>
          <div className={`z-10 w-6 h-6 rounded-full ${step == 4 ? 'bg-orange-300' : step > 4 ? 'bg-green-300' : 'bg-white'} border border-black flex justify-center items-center text-sm text-black mt-8 transition-all`}>4</div>
        </div>
      </div>
      <div className='w-[95%] h-screen p-5 overflow-y-scroll' ref={scrollContainerRef}>
        <div className='h-[170vh] w-full flex justify-center'>
          <div className='drop-shadow-lg step bg-white h-1/2 rounded-xl w-full p-10' ref={stepRef}>
              <p className=''>Başlık</p>
            </div>
        </div>
      </div>
    </div>
  )
}
