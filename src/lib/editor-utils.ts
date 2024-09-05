import { ConnectionProviderProps } from "@/app/providers/connectionsProvider"
import { EditorCanvasCardType } from "./types"
import { EditorState } from "@/app/providers/EditorProvider"
import { getSlackConnection, listBotChannels } from "@/app/(main)/(pages)/connections/_action/slack-connection"
import { getNotionConnection, getNotionDatabase } from "@/app/(main)/(pages)/connections/_action/notion-connection"
import { getDiscordConnectionUrl } from "@/app/(main)/(pages)/connections/_action/discord-connection"
import { Option } from "@/components/ui/multipleSelector"
import { channel } from "diagnostics_channel"

export const onDragStart = (
    event: any,
    nodeType: EditorCanvasCardType['type']
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  export const onContentChange = (
    nodeConnection: ConnectionProviderProps,
    nodeType: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (nodeType === 'Slack') {
      onSlackContent(nodeConnection, event)
    } else if (nodeType === 'Discord') {
      onDiscordContent(nodeConnection, event)
    } else if (nodeType === 'Notion') {
      onNotionContent(nodeConnection, event)
    }
  }

  export const onDiscordContent = (
    nodeConnection: ConnectionProviderProps,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    nodeConnection.setDiscordNode((prev: any) => ({
      ...prev,
      content: event.target.value,
    }))
  }

  export const onAddTemplateSlack = (
    nodeConnection: ConnectionProviderProps,
    template: string
  ) => {
    nodeConnection.setSlackNode((prev: any) => ({
      ...prev,
      content: `${prev.content} ${template}`,
    }))
  }

  export const onAddTemplateDiscord = (
    nodeConnection: ConnectionProviderProps,
    template: string
  ) => {
    nodeConnection.setDiscordNode((prev: any) => ({
      ...prev,
      content: `${prev.content} ${template}`,
    }))
  }
  
  export const onAddTemplate = (
    nodeConnection: ConnectionProviderProps,
    title: string,
    template: string
  ) => {
    if (title === 'Slack') {
      onAddTemplateSlack(nodeConnection, template)
    } else if (title === 'Discord') {
      onAddTemplateDiscord(nodeConnection, template)
    }
  }

  export const onSlackContent = (
    nodeConnection: ConnectionProviderProps,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    nodeConnection.setSlackNode((prev: any) => ({
      ...prev,
      content: event.target.value,
    }))
  }

  export const onNotionContent = (
    nodeConnection: ConnectionProviderProps,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    nodeConnection.setNotionNode((prev: any) => ({
      ...prev,
      content: event.target.value,
    }))
  }

  export const onConnections = async (
    nodeConnection: ConnectionProviderProps,
    editorState: EditorState,
    googleFile: any
  ) => {
    if (editorState.editor.selectedNode.data.title == 'Discord') {
      const connection = await getDiscordConnectionUrl()
      if (connection) {
        nodeConnection.setDiscordNode({
          webhookURL: connection.url,
          content: '',
          webhookName: connection.name,
          guildName: connection.guildName,
        })
      }
    }
    if (editorState.editor.selectedNode.data.title == 'Notion') {
      const connection = await getNotionConnection()
      if (connection) {
        nodeConnection.setNotionNode({
          accessToken: connection.accessToken,
          databaseId: connection.databaseId,
          workspaceName: connection.workspaceName,
          content: {
            name: googleFile.name,
            kind: googleFile.kind,
            type: googleFile.mimeType,
          },
        })
  
        if (nodeConnection.notionNode.databaseId !== '') {
          const response = await getNotionDatabase(
            nodeConnection.notionNode.databaseId,
            nodeConnection.notionNode.accessToken
          )
        }
      }
    }
    if (editorState.editor.selectedNode.data.title == 'Slack') {
      const connection = await getSlackConnection()
      if (connection) {
        nodeConnection.setSlackNode({
          appId: connection.appId,
          authedUserId: connection.authedUserId,
          authedUserToken: connection.authedUserToken,
          slackAccessToken: connection.slackAccessToken,
          botUserId: connection.botUserId,
          teamId: connection.teamId,
          teamName: connection.teamName,
          userId: connection.userId,
          content: '',
        })
      }
    }
  }

  export const fetchBotSlackChannels = async ( 
    token:string,
    setSlackChannels: (slackChannels:Option[]) => void
  ) => {
    await listBotChannels(token)?.then((channels) => setSlackChannels(channels))
  }