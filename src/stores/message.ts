import { defineStore } from 'pinia'
import { db } from '../db'
import { MessageProps, MessageStatus, UpdatgedStreamData  } from '../ts/type'

export interface MessageStore {
  items: MessageProps[]
}

export const useMessageStore = defineStore('message', {
  state: (): MessageStore => {
    return {
      items: []
    }
  },
  actions: {
    async fetchMessagesByConversation(conversationId: number) {
      const items = await db.messages.where({ conversationId }).toArray()
      // 按创建时间升序排列，即最早的消息在最前面
      this.items = items.sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    },
    async createMessage(createdData: Omit<MessageProps, 'id'>) {
      const newMessageId = await db.messages.add(createdData)
      this.items.push( { id: newMessageId, ...createdData })
      // 保持消息列表按时间升序
      this.items.sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      return newMessageId
    },
    async updateMessage(messageId: number, updatedData: Partial<MessageProps>) {
      await db.messages.update(messageId, updatedData)
      const index = this.items.findIndex(item => item.id === messageId)
      if (index !== -1) {
        this.items[index] = { ...this.items[index], ...updatedData }
      }
    }
  },
  getters: {
    getLastQuestion: (state) => (conversationId: number) => {
      return [...state.items].reverse().find(item => item.conversationId === conversationId && item.type === 'question')
    },
    isMessageLoading: (state) => {
      return state.items.some(item => item.status === 'loading' || item.status === 'streaming')
    },
    // 按创建时间升序排列的消息
    sortedMessages: (state) => {
      return [...state.items].sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    }
  }
})