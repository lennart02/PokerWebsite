import { Book, Calculator, Clock, Users } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navigation({
  activeTab,
  onTabChange,
}: NavigationProps) {
  const tabs = [
    { id: "game", label: "Game", icon: Users },
    { id: "timer", label: "Blinds", icon: Clock },
    { id: "rules", label: "Rules", icon: Book },
    { id: "settlements", label: "Settlements", icon: Calculator },
  ];

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600 dark:text-indigo-300"
                      : "border-transparent text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:border-gray-100 hover:border-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
