'use client'
import { useModal } from '@/app/providers/modal-provider'
import Workflowform from '@/components/forms/workflowForm'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
// import { useBilling } from '@/providers/billing-provider'
import { Plus } from 'lucide-react'
import React from 'react'

type Props = {}

const WorkflowButton = (props: Props) => {
  const { setOpen, setClose } = useModal()
//   const { credits } = useBilling()

  const handleClick = () => {
    setOpen(
      <CustomModal
        title="Create a Workflow Automation"
        subheading="Workflows are a powerfull that help you automate tasks."
      >
        <Workflowform />
      </CustomModal>
    )
  }

  return (
    <Button
      size={'icon'} onClick={handleClick}
    //   {...(credits !== '0'
    //     ? {
    //         onClick: handleClick,
    //       }
    //     : {
    //         disabled: true,
    //       })}
    >
      <Plus />
    </Button>
  )
}

export default WorkflowButton