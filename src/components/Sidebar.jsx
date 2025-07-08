import React, { useState, useEffect } from 'react';
import { getChatMessages } from '../firebaseRead';
import { Plus, User, Settings, Folder } from 'lucide-react';
import '../style/sidebar.css';

const Sidebar = ({ user, onSelectChat, onNewChat }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    const fetchChats = async () => {
      if (!user) return; // don't fetch if not logged in
      const data = await getChatMessages(user.uid);
      setChatHistory(data);
    };
    fetchChats();
  }, [user]);

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-top">
        <button className="toggle-btn" onClick={toggleSidebar}>☰</button>

        <div className="sidebar-links">
          <button className="sidebar-item">
            <Folder size={19} />
            {isExpanded && <span>Chats</span>}
          </button>

          <button className="sidebar-item" onClick={() => onNewChat?.()}>
            <Plus size={19} />
            {isExpanded && <span>New Chat</span>}
          </button>

          <button className="sidebar-item">
            <Settings size={20} />
            {isExpanded && <span>Settings</span>}
          </button>
        </div>

        {isExpanded && <div className="recents-header">Recent Chats</div>}

        {isExpanded && (
          <div className="recents-list">
            {!user ? (
              <div className="recent-item">Please log in to view chats</div>
            ) : chatHistory.length === 0 ? (
              <div className="recent-item">No chats yet</div>
            ) : (
              chatHistory.slice(0, 10).map((chat) => (
                <div
                  key={chat.id}
                  className="recent-item"
                  title={
                    chat.createdAt?.seconds
                      ? new Date(chat.createdAt.seconds * 1000).toLocaleString()
                      : 'Unknown time'
                  }
                  onClick={() => onSelectChat?.(chat.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {chat.text?.slice(0, 40) || '[Empty message]'}...
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
