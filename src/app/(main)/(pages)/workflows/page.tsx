import Workflows from '@/components/icons/workflows'
import React from 'react'
import WorkflowButton from './_comps/WorkFlowButton'
import Workflow from './_comps/worlflow'


type Props = {}

const Page = (props: Props) => {
  return (
    <div className="flex flex-col relative">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b justify-between">
        Workflows
        <WorkflowButton/>
      </h1>
      <Workflow
      description='Workflows are a powerfull that help you automate tasks'
      id='1'
      name='Google Drive'
      publish={true}/>
    </div>
  )
}

export default Page