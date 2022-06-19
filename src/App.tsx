import React, { useEffect, useRef, useState } from 'react';
import content from './_content'
import Fallacy from './components/Fallacy'
import './index.css'


const App: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const [scrolledIndex, setScrolledIndex] = useState<number>(0)
  const refs = useRef<Array<any>>(content.map(() => null))

  useEffect(() => {
    const onScroll = (e: any) => {
      const newScroll = e.target.documentElement.scrollTop

      const scrolledRef = refs.current.reduce((prev, ref, index) => {
        if (ref && typeof ref.offsetTop === 'number' && ref.offsetTop >= prev.offset && (newScroll + 100) > ref.offsetTop) {
          return { index, offset: prev.offset }
        }

        return prev
      }, { index: null, offset: 0 })

      setScrolledIndex(scrolledRef.index || 0)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="flex flex-row bg-slate-100">

      <div className="fixed right-4 top-4 lg:hidden">
        <button
          className="flex flex-col justify-between h-10 border p-2 hover:bg-slate-200 rounded-xl bg-white"
          onClick={() => {
            setOpenMenu(true);
          }}
        >
          <div className="w-6 h-1 bg-black" />
          <div className="w-6 h-1 bg-black" />
          <div className="w-6 h-1 bg-black" />
        </button>
      </div>

      <div className={`fixed overflow-y-auto h-screen bg-slate-200 py-4 w-screen lg:w-80 delay-200 transition-transform transform ${!openMenu ? '-translate-x-full' : ''} lg:translate-x-0`}>
        {
          content.map((f, index) => (
            <div
              key={index}
              className="py-2 px-8 hover:bg-slate-300 cursor-pointer text-center lg:text-left"
              style={{ fontWeight: scrolledIndex === index ? 700 : 400 }}
              onClick={() => {
                window.scrollTo({ top: refs.current[index].offsetTop, behavior: 'smooth' })
                setOpenMenu(false)
              }}
            >
              { f.title }
            </div>
          ))
        }
      </div>

      <div className="lg:ml-80" style={{ width: '100%' }}>
        <div
          style={{
            margin: '32px auto',
            padding: '16px 16px',
            maxWidth: '1000px',
          }}
        >
          {
            content.map((f, index) => (
              <Fallacy
                key={index}
                content={f}
                customRef={(r: any) => { refs.current[index] = r }}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
