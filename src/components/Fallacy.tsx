import React, { useMemo, useState } from 'react'
import { suffleArray } from '../lib/helpers';

interface IFallacyQuiz {
  text: string;
  correct?: boolean;
}

interface IFallacyExample {
  body: string;
  explanation?: string;
}

interface IFallacyProps {
  content: {
    title: string;
    description: string;
    examples: IFallacyExample[];
    quiz?: IFallacyQuiz[];
  };
  customRef: any;
}

const Fallacy: React.FC<IFallacyProps> = ({ content, customRef }) => {
  const [clicked, setClicked] = useState<null | number>(null);

  const randomQuiz = useMemo(() => {
    if (!content.quiz) {
      return null
    }

    return suffleArray(content.quiz)
  }, [content.quiz])

  return (
    <div className="flex flex-col mb-36 pt-6" ref={customRef}>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="basis-1/2 p-4 shadow-md bg-white border">
          <h1 className="text-2xl mb-4 font-black">
            { content.title }
          </h1>
          <div className="whitespace-pre-line">
            { content.description }
          </div>
        </div>

        <div className="basis-1/2 flex flex-col gap-4">
          { content.examples.map(({ body, explanation }, index) => (
            <div key={index} className="flex flex-col gap-4 border p-4 rounded bg-white shadow-md" >
              <div className="whitespace-pre-line italic">
                { body }
              </div>
              { !explanation ? null : (
                <div className="whitespace-pre-line">
                  { explanation }
                </div>
              ) }
            </div>
          )) }
        </div>
      </div>

      {/* <div className="font-bold mt-8">
        ¿Cuales de las siguientes opciones es una falacia de este tipo?
      </div>
      <div className="flex flex-row pt-2 gap-4">
        { !randomQuiz ? null : randomQuiz.map(({ text, correct }, index) => (
          <div
            key={index}
            className="border basis-1/3 p-4 hover:bg-slate-100 cursor-pointer rounded"
            onClick={() => {
              if (clicked === null) {
                setClicked(index);
              }
            }}
            style={(clicked === null || (clicked !== index && !correct))
              ? undefined
              : { backgroundColor: correct ? '#4ade80' : '#f87171' }
            }
          >
            { text }
          </div>
        )) }
      </div> */}

    </div>
  )
}

export default Fallacy
