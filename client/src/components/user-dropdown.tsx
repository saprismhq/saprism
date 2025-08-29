import { useState, useRef, useEffect } from "react";
import { User, LogOut, ChevronDown, Activity } from "lucide-react";
import { useAuth } from "@/lib/api/auth";
import { useSystemStatus, getOverallStatusColor } from "@/lib/api/status";

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { data: systemStatus, isLoading: statusLoading } = useSystemStatus();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
        )}
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-gray-100">
            <div className="font-medium text-gray-900">
              {user.firstName || user.lastName ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'User'}
            </div>
            {user.email && (
              <div className="text-sm text-gray-500">{user.email}</div>
            )}
          </div>
          
          {/* System Status Section */}
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-4 h-4 text-gray-600" />
              <h4 className="text-sm font-medium text-gray-700">System Status</h4>
              {systemStatus && (
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  getOverallStatusColor(systemStatus)
                }`}>
                  {systemStatus.overallHealth === 'healthy' ? '●' : 
                   systemStatus.overallHealth === 'degraded' ? '◐' : '○'}
                </div>
              )}
            </div>
            
            {statusLoading ? (
              <div className="text-xs text-gray-500">Checking services...</div>
            ) : systemStatus ? (
              <div className="space-y-2">
                {/* Salesforce Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      systemStatus.services.salesforce.connected ? "bg-green-500" : "bg-red-500"
                    }`}></div>
                    <span className="text-xs text-gray-700">Salesforce</span>
                  </div>
                  <div className={`text-xs ${
                    systemStatus.services.salesforce.connected ? "text-green-600" : "text-red-600"
                  }`}>
                    {systemStatus.services.salesforce.connected ? "Connected" : "Offline"}
                  </div>
                </div>
                
                {/* OpenAI Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      systemStatus.services.openai.connected ? "bg-green-500" : "bg-red-500"
                    }`}></div>
                    <span className="text-xs text-gray-700">OpenAI</span>
                  </div>
                  <div className={`text-xs ${
                    systemStatus.services.openai.connected ? "text-green-600" : "text-red-600"
                  }`}>
                    {systemStatus.services.openai.connected ? "Connected" : "Offline"}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-red-600">Unable to check status</div>
            )}
          </div>
          
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}