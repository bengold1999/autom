import React, { useMemo } from 'react'
import { ReactFlow } from 'reactflow';
import '@xyflow/react/dist/style.css';
import { EditorNodeType } from '@/lib/types';
import { useEditor } from '@/app/providers/EditorProvider';
import EditorCanvasCardSingle from './EditorCanvasCardSingle';

type Props = {}

const initalNode: EditorNodeType[]=[]

const initialEdges :{
    id: string;
    source: string;
    target: string;
}[] = []

const EditorCanvas = (props: Props) => {
    const {dispatch,state} = useEditor()
    const nodeTypes = useMemo(
        () => ({
          Action: EditorCanvasCardSingle,
          Trigger: EditorCanvasCardSingle,
          Email: EditorCanvasCardSingle,
          Condition: EditorCanvasCardSingle,
          AI: EditorCanvasCardSingle,
          Slack: EditorCanvasCardSingle,
          'Google Drive': EditorCanvasCardSingle,
          Notion: EditorCanvasCardSingle,
          Discord: EditorCanvasCardSingle,
          'Custom Webhook': EditorCanvasCardSingle,
          'Google Calendar': EditorCanvasCardSingle,
          Wait: EditorCanvasCardSingle,
        }),
        []
      )
        
    
  return (
    <div>EditorCanvas</div>
  )
}

export default EditorCanvas