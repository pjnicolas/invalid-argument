import React from 'react';
import Fallacy from './components/Fallacy'
import blog from './blog.json'
import './index.css'
import { EFallacyType, IBlogEntry } from './types';

const sortedBlog = blog.sort((a, b) => {
  const aDate = new Date(a.date)
  const bDate = new Date(b.date)
  return bDate.getTime() - aDate.getTime()
}) as any

const App: React.FC = () => {
  return (
    <div className="bg-slate-100">
      <div style={{ width: '100%' }}>
        <div
          style={{
            margin: 'auto',
            padding: '16px 16px',
            maxWidth: '1000px',
          }}
        >
          {
            sortedBlog.map(({ title, date, description, examples, quiz, type }: IBlogEntry) => (
              <Fallacy
                type={type}
                key={date}
                title={title}
                description={description}
                examples={examples}
                quiz={quiz}
                date={date}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
