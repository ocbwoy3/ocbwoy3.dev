'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export function FloatingChatBar() {
	const [message, setMessage] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (message.trim()) {
			(window as any || global as any).REMUI_SocketManager?.sendMessageInChat(message);
			setMessage('')
		}
	}


	return (
		<div className="fixed bottom-0 left-0 right-0 p-4">
			<form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
				<div className="relative flex-grow">
					<Input
						type="text"
						placeholder="Type your message..."
						value={message}
						onChange={(e) => setMessage(e.target.value || "")}
						className="pr-16"
					/>
					<span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{message.length}/500</span>
				</div>
				<Button type="submit" size="icon" disabled={message.length === 0}>
					<Send className="h-4 w-4" />
					<span className="sr-only">Send message</span>
				</Button>
			</form>
		</div>
	)
}