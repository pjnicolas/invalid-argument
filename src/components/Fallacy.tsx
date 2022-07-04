import React, { useMemo, useState } from 'react'
import { suffleArray } from '../lib/helpers';
import { marked } from 'marked'
import moment from 'moment'
import { EFallacyType, IQuiz } from '../types';

interface IFallacyProps {
  type: EFallacyType;
  title: string;
  description: string;
  quiz?: IQuiz[];
  examples?: string[];
  date: string;
  // customRef: any;
}

const trTypeToText = {
  [EFallacyType.bias]: 'Sesgo cognitivo',
  [EFallacyType.fallacy]: 'Falacia lógica',
  [EFallacyType.gedankenexperiment]: 'Experimento mental',
}

const trTypeToColor = {
  [EFallacyType.bias]: '#f0f0ff',
  [EFallacyType.fallacy]: '#f0fff0',
  [EFallacyType.gedankenexperiment]: '#fff0f0',
}

const Fallacy: React.FC<IFallacyProps> = ({ title, description, quiz, examples, date, type }) => {
  const [clicked, setClicked] = useState<null | number>(null);

  const typeText = trTypeToText[type];
  const typeColor = trTypeToColor[type];

  const randomQuiz = useMemo(() => {
    if (!quiz) {
      return null
    }

    return suffleArray(quiz)
  }, [quiz])

  return (
    <div className="flex flex-col mb-36 pt-6">

      <div className="flex flex-col lg:flex-row gap-4">
        <div
          className="basis-1/2 p-4 shadow-md bg-white border"
          style={{
            backgroundColor: typeColor,
            flexBasis: examples ? '50%' : '100%',
          }}
        >
          <h1 className="text-2xl font-black">
            { title }
          </h1>
          <div className="text-md mb-4 italic flex flex-row justify-between">
            <div>
              { typeText }
            </div>
            <div className="text-sm">
              { moment(date).format('DD/MM/YYYY HH:mm[h]') }
            </div>
          </div>
          <div
            className="flex flex-col gap-4"
            dangerouslySetInnerHTML={{ __html: marked.parse(description) }}
          />
        </div>

        { !examples ? null : (
          <div className="basis-1/2 flex flex-col gap-4">
            {
              examples.map((example, index) => (
                <div
                key={index}
                className="flex flex-col gap-4 border p-4 rounded bg-white shadow-md"
                style={{ backgroundColor: typeColor }}
                dangerouslySetInnerHTML={{ __html: marked.parse(example) }}
                />
              ))
            }
          </div>
        ) }
      </div>

      {
        !randomQuiz ? null : (
          <>
            <div className="font-bold mt-8">
              ¿Cuales de las siguientes opciones es una falacia de este tipo?
            </div>
            <div className="flex flex-row pt-2 gap-4">
              { randomQuiz.map(({ value, isCorrect }, index) => (
                <div
                  key={index}
                  className="border basis-1/3 p-4 hover:bg-slate-100 cursor-pointer rounded"
                  onClick={() => {
                    if (clicked === null) {
                      setClicked(index);
                    }
                  }}
                  style={(clicked === null || (clicked !== index && !isCorrect))
                    ? undefined
                    : { backgroundColor: isCorrect ? '#4ade80' : '#f87171' }
                  }
                >
                  { value }
                </div>
              )) }
            </div>
          </>
        )
      }

    </div>
  )
}

export default Fallacy
