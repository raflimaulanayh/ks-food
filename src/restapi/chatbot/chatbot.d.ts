interface ChatMessagePart {
  type: 'text'
  text: string
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content?: string
  parts?: ChatMessagePart[]
}
