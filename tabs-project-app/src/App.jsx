import { useEffect, useState } from "react";
import "./App.css";
// import "./Tabs.css"; // فایل CSS برای استایل‌دهی

function App() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    localStorage.setItem("selectedTab", JSON.stringify(tabIndex));
  };

  useEffect(() => {
    const selectedTab = JSON.parse(localStorage.getItem("selectedTab"));
    setActiveTab(selectedTab);
  });

  return (
    <div className="tabs">
      <h2>Tabs Component with React</h2>
      <div className="tab-buttons">
        <button
          className={activeTab === 1 ? "active" : ""}
          onClick={() => handleTabClick(1)}
        >
          TAB 1
        </button>
        <button
          className={activeTab === 2 ? "active" : ""}
          onClick={() => handleTabClick(2)}
        >
          TAB 2
        </button>
        <button
          className={activeTab === 3 ? "active" : ""}
          onClick={() => handleTabClick(3)}
        >
          TAB 3
        </button>
        <button
          className={activeTab === 4 ? "active" : ""}
          onClick={() => handleTabClick(4)}
        >
          TAB 4
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 1 && <div>Content 1: محتوای تب اول</div>}
        {activeTab === 2 && <div>Content 2: محتوای تب دوم</div>}
        {activeTab === 3 && <div>Content 3: محتوای تب سوم</div>}
        {activeTab === 4 && <div>Content 4: محتوای تب چهارم</div>}
      </div>
    </div>
  );
}

export default App;
