import { ConnectionsProvider } from '@/app/providers/connectionsProvider'
import EditorProvider from '@/app/providers/EditorProvider'
import React from 'react'
import EditorCanvas from './_comps/EditorCanvas'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='h-full'>
        <EditorProvider>
            <ConnectionsProvider>
                <EditorCanvas></EditorCanvas>
            </ConnectionsProvider>
        </EditorProvider>
    </div>
  )
}

export default page