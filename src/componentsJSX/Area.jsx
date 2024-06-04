import React from 'react';
import { useHistory } from 'react-router-dom'; // 引入 useHistory hook

import './Area.scss';

const Area = () => {
  const areas = [
    { id: 1, name: '臺北', imageUrl: '/src/assets/images/areas/taipei.jpg' },
    { id: 2, name: '臺中', imageUrl: '/src/assets/images/areas/taichung.jpg' },
    { id: 3, name: '臺南', imageUrl: '/src/assets/images/areas/tainan.jpg' },
    { id: 4, name: '高雄', imageUrl: '/src/assets/images/areas/kaohsiung.jpg' },
    { id: 5, name: '宜蘭', imageUrl: '/src/assets/images/areas/yilan.jpg' },
    { id: 6, name: '花蓮', imageUrl: '/src/assets/images/areas/hualien.jpg' },
  ];

    const history = useHistory(); // 使用 useHistory hook 獲取 history 實例

  const handleAreaClick = (areaId) => {
    // 導航到搜索頁面，將 areaId 作為查詢參數
    console.log(areaId);
    history.push(`/search?areaId=${areaId}`);
  };


  return (
    <section className="area-section">
      <h2 className="area-title">旅遊地區</h2>
      <div className="area-cards-container">
        {areas.map(area => (
          <div key={area.id} className="area-card" onClick={() => handleAreaClick(area.id)}>
            <img src={area.imageUrl} alt={area.name} className="area-image" />
            <div className="area-overlay">
              <div className="area-name">{area.name}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Area;
