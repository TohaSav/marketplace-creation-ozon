import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useAdminChat } from "@/hooks/useAdminChat";
import AdminChatTabs from "@/components/admin/chat/AdminChatTabs";
import ChatUserList from "@/components/admin/chat/ChatUserList";
import ChatWindow from "@/components/admin/chat/ChatWindow";
import TicketList from "@/components/admin/chat/TicketList";
import ChatSettingsModal from "@/components/admin/chat/ChatSettingsModal";

export default function AdminChat() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const {
    activeTab,
    selectedUser,
    selectedTicket,
    newMessage,
    searchQuery,
    chatUsers,
    tickets,
    messages,
    selectedUserData,
    setActiveTab,
    setSelectedUser,
    setSelectedTicket,
    setNewMessage,
    setSearchQuery,
    sendMessage,
    deleteUserChat,
  } = useAdminChat();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Чат поддержки</h1>
            <p className="text-gray-600">Управление обращениями клиентов</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт
            </Button>
            <Button size="sm" onClick={() => setSettingsOpen(true)}>
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <AdminChatTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            chatUsers={chatUsers}
            tickets={tickets}
          />

          {/* Chats Tab */}
          <TabsContent value="chats" className="space-y-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
              {/* Chat User List */}
              <ChatUserList
                users={chatUsers}
                selectedUserId={selectedUser}
                searchQuery={searchQuery}
                onUserSelect={setSelectedUser}
                onSearchChange={setSearchQuery}
                onDeleteUser={deleteUserChat}
              />

              {/* Chat Window */}
              <div className="lg:col-span-2">
                <ChatWindow
                  user={selectedUserData}
                  messages={messages}
                  newMessage={newMessage}
                  onNewMessageChange={setNewMessage}
                  onSendMessage={sendMessage}
                />
              </div>
            </div>
          </TabsContent>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="space-y-4">
            <TicketList
              tickets={tickets}
              selectedTicketId={selectedTicket}
              onTicketSelect={setSelectedTicket}
            />
          </TabsContent>
        </Tabs>

        {/* Settings Modal */}
        <ChatSettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
      </div>
    </AdminLayout>
  );
}
