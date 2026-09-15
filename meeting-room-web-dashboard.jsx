import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Building2,
  DoorOpen,
  Wallet,
  AlertTriangle,
  X,
  Search,
  SlidersHorizontal,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Data — extracted from Service_Request.xlsx (Room_Master, Asset_Master,
// Room_Asset, Maintenance). This is a point-in-time export, not a live feed.
// ---------------------------------------------------------------------------
const DATA = {"rooms": [{"id": "R001", "building": "อาคารเทรดดิ้ง", "floor": 1, "name": "MeetingRoom 1", "capacity": 10}, {"id": "R002", "building": "อาคารเทรดดิ้ง", "floor": 1, "name": "MeetingRoom 2", "capacity": 10}, {"id": "R003", "building": "อาคารเทรดดิ้ง", "floor": 1, "name": "MeetingRoom 3", "capacity": 10}, {"id": "R004", "building": "อาคารสิงห์คอมเพล็กซ์", "floor": 39, "name": "MeetingRoom 3901", "capacity": 17}, {"id": "R005", "building": "อาคารสิงห์คอมเพล็กซ์", "floor": 39, "name": "MeetingRoom 3902", "capacity": 11}, {"id": "R006", "building": "อาคารสิงห์คอมเพล็กซ์", "floor": 39, "name": "MeetingRoom 3903", "capacity": 9}, {"id": "R007", "building": "อาคารสิงห์คอมเพล็กซ์", "floor": 39, "name": "MeetingRoom 3904", "capacity": 25}, {"id": "R008", "building": "คลังสาขาบางบัวทอง", "floor": 2, "name": "MeetingRoom 1", "capacity": null}, {"id": "R009", "building": "คลังสาขาบางบัวทอง", "floor": 2, "name": "MeetingRoom 2", "capacity": null}, {"id": "R010", "building": "คลังสาขาบางบัวทอง", "floor": 2, "name": "MeetingRoom 3", "capacity": null}, {"id": "R011", "building": "คลังมีนบุรี", "floor": 2, "name": "MeetingRoom 1", "capacity": null}, {"id": "R012", "building": "คลังทวีวัฒนา 1", "floor": 2, "name": "MeetingRoom 1", "capacity": null}, {"id": "R013", "building": "คลังทวีวัฒนา 2", "floor": 2, "name": "MeetingRoom 1", "capacity": null}, {"id": "R014", "building": "อาคารเทรดดิ้ง", "floor": 1, "name": "General", "capacity": null}, {"id": "R015", "building": "อาคารสิงห์คอมเพล็กซ์", "floor": 39, "name": "General", "capacity": null}, {"id": "R016", "building": "อาคารสิงห์คอมเพล็กซ์", "floor": 39, "name": "Co-Working Space", "capacity": null}], "assets": [{"id": "A001", "name": "TV  Samsung 65 นิ้ว", "type": "Display", "category": "Asset", "value": 15000.0, "lifeYears": 5, "status": "Active", "roomId": "R001"}, {"id": "A002", "name": "LOGITECH MEETUP 2 CONFERENCECAM", "type": "Video Conference", "category": "Asset", "value": 28080.0, "lifeYears": 5, "status": "Active", "roomId": "R001"}, {"id": "A003", "name": "EAKER HDMI Wireless  อะแดปเตอร์ต่อจอไร้สาย", "type": "Display", "category": "Cost", "value": 2100.0, "lifeYears": 5, "status": "Active", "roomId": "R001"}, {"id": "A004", "name": "LOGITECH Wireless Presenter Pointer R400", "type": "Video Conference", "category": "Cost", "value": 1000.0, "lifeYears": 5, "status": "Active", "roomId": "R001"}, {"id": "A005", "name": "UGREEN รุ่น US372 สายเพิ่มความยาว", "type": "Accessory", "category": "Cost", "value": 300.0, "lifeYears": 5, "status": "Active", "roomId": "R001"}, {"id": "A006", "name": "TV  Samsung 65 นิ้ว", "type": "Display", "category": "Asset", "value": 15000.0, "lifeYears": 5, "status": "Active", "roomId": "R002"}, {"id": "A007", "name": "LOGITECH MEETUP 2 CONFERENCECAM", "type": "Video Conference", "category": "Asset", "value": 28080.0, "lifeYears": 5, "status": "Active", "roomId": "R002"}, {"id": "A008", "name": "EAKER HDMI Wireless  อะแดปเตอร์ต่อจอไร้สาย", "type": "Display", "category": "Cost", "value": 2100.0, "lifeYears": 5, "status": "Active", "roomId": "R002"}, {"id": "A009", "name": "LOGITECH Wireless Presenter Pointer R400", "type": "Video Conference", "category": "Cost", "value": 1000.0, "lifeYears": 5, "status": "Active", "roomId": "R002"}, {"id": "A010", "name": "UGREEN รุ่น US372 สายเพิ่มความยาว", "type": "Accessory", "category": "Cost", "value": 300.0, "lifeYears": 5, "status": "Active", "roomId": "R002"}, {"id": "A011", "name": "TV  Samsung 65 นิ้ว", "type": "Display", "category": "Asset", "value": 15000.0, "lifeYears": 5, "status": "Active", "roomId": "R003"}, {"id": "A012", "name": "LOGITECH MEETUP 2 CONFERENCECAM", "type": "Video Conference", "category": "Asset", "value": 28080.0, "lifeYears": 5, "status": "Active", "roomId": "R003"}, {"id": "A013", "name": "EAKER HDMI Wireless  อะแดปเตอร์ต่อจอไร้สาย", "type": "Display", "category": "Cost", "value": 2100.0, "lifeYears": 5, "status": "Active", "roomId": "R003"}, {"id": "A014", "name": "LOGITECH Wireless Presenter Pointer R400", "type": "Video Conference", "category": "Cost", "value": 1000.0, "lifeYears": 5, "status": "Active", "roomId": "R003"}, {"id": "A015", "name": "UGREEN รุ่น US372 สายเพิ่มความยาว", "type": "Accessory", "category": "Cost", "value": 300.0, "lifeYears": 5, "status": "Active", "roomId": "R003"}, {"id": "A016", "name": "Projector Epson EB-L260F", "type": "Display", "category": "Asset", "value": 65490.0, "lifeYears": 5, "status": "Active", "roomId": "R004"}, {"id": "A017", "name": "LOGITECH Wireless Presenter Pointer R400", "type": "Video Conference", "category": "Cost", "value": 1000.0, "lifeYears": 5, "status": "Active", "roomId": "R004"}, {"id": "A018", "name": "UGREEN รุ่น US372 สายเพิ่มความยาว", "type": "Accessory", "category": "Cost", "value": 300.0, "lifeYears": 5, "status": "Active", "roomId": "R004"}, {"id": "A019", "name": "AVER  Video Conference VC520 Pro2", "type": "Video Conference", "category": "Asset", "value": 55000.0, "lifeYears": 5, "status": "Active", "roomId": "R004"}, {"id": "A020", "name": "AVER Expansion Mic ไมโครโฟนขยายคู่พร้อมสายยาว 5 เมตร", "type": "Video Conference", "category": "Cost", "value": 16822.43, "lifeYears": 5, "status": "Active", "roomId": "R004"}, {"id": "A021", "name": "EAKER HDMI Wireless  อะแดปเตอร์ต่อจอไร้สาย", "type": "Display", "category": "Cost", "value": 1950.0, "lifeYears": 5, "status": "Active", "roomId": "R004"}, {"id": "A022", "name": "Projector EPSON EB-695Wi", "type": "Display", "category": "Asset", "value": null, "lifeYears": 5, "status": "Active", "roomId": "R005"}, {"id": "A023", "name": "LOGITECH Wireless Presenter Pointer R400", "type": "Video Conference", "category": "Cost", "value": 1000.0, "lifeYears": 5, "status": "Active", "roomId": "R005"}, {"id": "A024", "name": "UGREEN รุ่น US372 สายเพิ่มความยาว", "type": "Accessory", "category": "Cost", "value": 300.0, "lifeYears": 5, "status": "Active", "roomId": "R005"}, {"id": "A025", "name": "LOGITECH MEETUP 2 CONFERENCECAM", "type": "Video Conference", "category": "Asset", "value": 26400.0, "lifeYears": 5, "status": "Active", "roomId": "R005"}, {"id": "A026", "name": "RALLY BAR REMOTE CONTROL", "type": "Video Conference", "category": "Cost", "value": 2480.0, "lifeYears": 5, "status": "Active", "roomId": "R005"}, {"id": "A027", "name": "EAKER HDMI Wireless  อะแดปเตอร์ต่อจอไร้สาย", "type": "Display", "category": "Cost", "value": 1950.0, "lifeYears": 5, "status": "Active", "roomId": "R005"}, {"id": "A028", "name": "Projector Epson รุ่น EB-2155W", "type": "Display", "category": "Asset", "value": null, "lifeYears": 5, "status": "Active", "roomId": "R006"}, {"id": "A029", "name": "LOGITECH Wireless Presenter Pointer R400", "type": "Video Conference", "category": "Cost", "value": 1000.0, "lifeYears": 5, "status": "Active", "roomId": "R006"}, {"id": "A030", "name": "UGREEN รุ่น US372 สายเพิ่มความยาว", "type": "Accessory", "category": "Cost", "value": 300.0, "lifeYears": 5, "status": "Active", "roomId": "R006"}, {"id": "A031", "name": "LOGITECH MEETUP 2 CONFERENCECAM", "type": "Video Conference", "category": "Asset", "value": 28090.0, "lifeYears": 5, "status": "Active", "roomId": "R006"}, {"id": "A032", "name": "RALLY BAR REMOTE CONTROL", "type": "Video Conference", "category": "Cost", "value": 2480.0, "lifeYears": 5, "status": "Active", "roomId": "R006"}, {"id": "A033", "name": "EAKER HDMI Wireless  อะแดปเตอร์ต่อจอไร้สาย", "type": "Display", "category": "Cost", "value": 1950.0, "lifeYears": 5, "status": "Active", "roomId": "R006"}, {"id": "A034", "name": "TV  Samsung 98 นิ้ว", "type": "Display", "category": "Asset", "value": 55500.0, "lifeYears": 5, "status": "Active", "roomId": "R007"}, {"id": "A035", "name": "LOGITECH Wireless Presenter Pointer R400", "type": "Video Conference", "category": "Cost", "value": 1000.0, "lifeYears": 5, "status": "Active", "roomId": "R007"}, {"id": "A036", "name": "UGREEN รุ่น US372 สายเพิ่มความยาว", "type": "Accessory", "category": "Cost", "value": 300.0, "lifeYears": 5, "status": "Active", "roomId": "R007"}, {"id": "A037", "name": "LOGITECH GROUP CONFERENCECAM", "type": "Video Conference", "category": "Asset", "value": 27800.0, "lifeYears": 5, "status": "Active", "roomId": "R007"}, {"id": "A038", "name": "RALLY BAR REMOTE CONTROL", "type": "Video Conference", "category": "Cost", "value": 2480.0, "lifeYears": 5, "status": "Active", "roomId": "R007"}, {"id": "A039", "name": "จอ Digital Signage (Raspberry Pi 5)", "type": "Display", "category": "Cost", "value": 39156.25, "lifeYears": 5, "status": "Active", "roomId": "R007"}, {"id": "A040", "name": "EAKER HDMI Wireless  อะแดปเตอร์ต่อจอไร้สาย", "type": "Display", "category": "Cost", "value": 1950.0, "lifeYears": 5, "status": "Active", "roomId": "R007"}, {"id": "A041", "name": "EAKER HDMI Wireless  อะแดปเตอร์ต่อจอไร้สาย", "type": "Display", "category": "Cost", "value": 2150.0, "lifeYears": 5, "status": "Active", "roomId": "R016"}], "maintenance": [{"id": "WO001", "roomId": "R003", "assetId": "A028", "date": "2025-03-13", "vendor": "บจก. มหาจักรดีเวลอปเมนท์", "item": "เปลี่ยนหลอดพร้อมทำความสะอาด 3903", "cost": 10250.0, "type": "Replacement", "gl": "62303009-ค่าซ่อมแซม-อุปกรณ์เทคโนโลยีสารสนเทศ", "warrantyEnd": "2025-03-13"}, {"id": "WO002", "roomId": "R007", "assetId": "A039", "date": "2026-06-22", "vendor": "บจก. บุญรอดบริวเวอรี่", "item": "ติดตั้งหน้าจอแสดงผลสถานะ 3904", "cost": 39156.25, "type": "Installation", "gl": "62402002-ค่าบริการสำนักงาน", "warrantyEnd": "2028-06-30"}, {"id": "WO003", "roomId": "R004", "assetId": "A016", "date": "2026-07-14", "vendor": "บจก. เมโทรซิสเต็มส์คอร์ปอเรชั่น", "item": "ซื้อเครื่องใหม่ รับประกัน 13/7/2030 หรือ 12,000 ชม 3901", "cost": 65490.0, "type": "Installation", "gl": "12510009-เครื่องมือเครื่องใช้สำนักงาน", "warrantyEnd": "2030-07-13"}, {"id": "WO004", "roomId": "R005", "assetId": "A022", "date": "2025-05-13", "vendor": "บจก. มหาจักรดีเวลอปเมนท์", "item": "ปากกา EASY INTERACTIVE PEN (ORANGE) 3902", "cost": 1998.0, "type": "Replacement", "gl": "62701001-ค่าเครื่องใช้และวัสดุสิ้นเปลืองสำนักงาน", "warrantyEnd": "2025-06-12"}]};

const ROOM_BY_ID = Object.fromEntries(DATA.rooms.map((r) => [r.id, r]));
const BUILDINGS = [...new Set(DATA.rooms.map((r) => r.building))];
const ASSET_TYPES = [...new Set(DATA.assets.map((a) => a.type))];
const CHART_COLORS = ["#2F6F6A", "#B8811F", "#8A5A9E", "#4A7FB5", "#B4472F", "#5B8C5A"];

const fmtTHB = (n) =>
  n == null ? "—" : `฿${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export default function MeetingRoomWebDashboard() {
  const [buildingFilter, setBuildingFilter] = useState("All");
  const [roomFilter, setRoomFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("assets");

  const handleBuildingChange = (val) => {
    setBuildingFilter(val);
    setRoomFilter("All"); // room list depends on the selected building, so reset it
  };

  // Rooms available for the room dropdown — scoped to the selected building (or all)
  const availableRooms = useMemo(() => {
    return DATA.rooms
      .filter((r) => buildingFilter === "All" || r.building === buildingFilter)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [buildingFilter]);

  const filteredAssets = useMemo(() => {
    return DATA.assets.filter((a) => {
      const room = ROOM_BY_ID[a.roomId];
      if (buildingFilter !== "All" && (!room || room.building !== buildingFilter)) return false;
      if (roomFilter !== "All" && a.roomId !== roomFilter) return false;
      if (typeFilter !== "All" && a.type !== typeFilter) return false;
      if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [buildingFilter, roomFilter, typeFilter, search]);

  const filteredMaint = useMemo(() => {
    return DATA.maintenance.filter((m) => {
      const room = ROOM_BY_ID[m.roomId];
      if (buildingFilter !== "All" && (!room || room.building !== buildingFilter)) return false;
      if (roomFilter !== "All" && m.roomId !== roomFilter) return false;
      return true;
    });
  }, [buildingFilter, roomFilter]);

  const kpis = useMemo(() => {
    const totalValue = filteredAssets.reduce((s, a) => s + (a.value || 0), 0);
    const missingValue = filteredAssets.filter((a) => a.value == null).length;
    const totalMaint = filteredMaint.reduce((s, m) => s + m.cost, 0);
    const rooms = new Set(filteredAssets.map((a) => a.roomId)).size;
    return { totalValue, missingValue, totalMaint, rooms };
  }, [filteredAssets, filteredMaint]);

  const valueByBuilding = useMemo(() => {
    return BUILDINGS.map((b) => ({
      building: b.length > 14 ? b.slice(0, 13) + "…" : b,
      full: b,
      value: DATA.assets
        .filter((a) => ROOM_BY_ID[a.roomId]?.building === b)
        .reduce((s, a) => s + (a.value || 0), 0),
    })).filter((d) => d.value > 0);
  }, []);

  const countByType = useMemo(() => {
    return ASSET_TYPES.map((t) => ({
      name: t,
      value: filteredAssets.filter((a) => a.type === t).length,
    })).filter((d) => d.value > 0);
  }, [filteredAssets]);

  const costByGL = useMemo(() => {
    const map = {};
    filteredMaint.forEach((m) => {
      const label = m.gl.split("-")[1] || m.gl;
      map[label] = (map[label] || 0) + m.cost;
    });
    return Object.entries(map).map(([name, cost]) => ({ name, cost }));
  }, [filteredMaint]);

  const activeFilters = [
    buildingFilter !== "All" ? { key: "building", label: buildingFilter } : null,
    roomFilter !== "All" ? { key: "room", label: ROOM_BY_ID[roomFilter]?.name || roomFilter } : null,
    typeFilter !== "All" ? { key: "type", label: typeFilter } : null,
  ].filter(Boolean);

  return (
    <div style={s.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        button, select, input { font-family: 'Inter', sans-serif; }
        .filter-btn:hover { background: #E4E9E4 !important; }
        .tab-btn:hover { color: #1C1F1E !important; }
        table.data-table tr:hover td { background: #F4F4F0; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: #D6D6CF; border-radius: 4px; }
        input:focus, select:focus, button:focus-visible { outline: 2px solid #2F6F6A; outline-offset: 1px; }
      `}</style>

      <header style={s.header}>
        <div>
          <div style={s.tag}>FACILITIES · ASSET &amp; MAINTENANCE DATA</div>
          <h1 style={s.h1}>Meeting room dashboard</h1>
          <div style={s.sourceLine}>
            Source: Service_Request.xlsx (point-in-time export — not live-synced)
          </div>
        </div>
      </header>

      {/* Filter bar */}
      <div style={s.filterBar}>
        <div style={s.filterGroup}>
          <SlidersHorizontal size={14} color="#5B615F" />
          <select
            value={buildingFilter}
            onChange={(e) => handleBuildingChange(e.target.value)}
            style={s.select}
          >
            <option value="All">ทุกอาคาร (All buildings)</option>
            {BUILDINGS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <select
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
            style={s.select}
          >
            <option value="All">ทุกห้อง (All rooms)</option>
            {availableRooms.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={s.select}
          >
            <option value="All">ทุกประเภทอุปกรณ์ (All types)</option>
            {ASSET_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div style={s.searchBox}>
          <Search size={14} color="#8B8F87" />
          <input
            placeholder="ค้นหาอุปกรณ์..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={s.searchInput}
          />
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div style={s.chipRow}>
          {activeFilters.map((f) => (
            <span key={f.key} style={s.chip}>
              {f.label}
              <X
                size={12}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (f.key === "building") handleBuildingChange("All");
                  else if (f.key === "room") setRoomFilter("All");
                  else setTypeFilter("All");
                }}
              />
            </span>
          ))}
        </div>
      )}

      {/* KPI row */}
      <div style={s.kpiRow}>
        <KPI icon={Wallet} label="มูลค่าทรัพย์สิน (ตามตัวกรอง)" value={fmtTHB(kpis.totalValue)} />
        <KPI icon={DoorOpen} label="ห้องที่มีอุปกรณ์เข้าเงื่อนไข" value={kpis.rooms} />
        <KPI
          icon={AlertTriangle}
          label="รายการไม่ระบุมูลค่า"
          value={kpis.missingValue}
          accent={kpis.missingValue > 0 ? "#B4472F" : undefined}
        />
        <KPI icon={Building2} label="ค่าซ่อม/ติดตั้งที่บันทึกไว้" value={fmtTHB(kpis.totalMaint)} />
      </div>

      {/* Charts */}
      <div style={s.chartRow}>
        <div style={s.chartCard}>
          <h3 style={s.h3}>มูลค่าทรัพย์สินตามอาคาร</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={valueByBuilding} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#E3E2DA" vertical={false} />
              <XAxis dataKey="building" tick={{ fontSize: 10, fill: "#5B615F" }} axisLine={{ stroke: "#D6D6CF" }} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#5B615F" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v) => [fmtTHB(v), "มูลค่า"]} labelFormatter={(l, p) => p?.[0]?.payload?.full || l} contentStyle={{ fontSize: 12, borderRadius: 4, border: "1px solid #D6D6CF" }} />
              <Bar dataKey="value" fill="#2F6F6A" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={s.chartCard}>
          <h3 style={s.h3}>จำนวนอุปกรณ์ตามประเภท</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={countByType} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={(d) => d.name}>
                {countByType.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: "1px solid #D6D6CF" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={s.chartCard}>
          <h3 style={s.h3}>ค่าใช้จ่ายตามบัญชี GL</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={costByGL} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
              <CartesianGrid stroke="#E3E2DA" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#5B615F" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: "#5B615F" }} width={90} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [fmtTHB(v), "ค่าใช้จ่าย"]} contentStyle={{ fontSize: 12, borderRadius: 4, border: "1px solid #D6D6CF" }} />
              <Bar dataKey="cost" fill="#B8811F" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabs */}
      <div style={s.tabBar}>
        <button className="tab-btn" onClick={() => setTab("assets")} style={s.tabBtn(tab === "assets")}>
          รายการอุปกรณ์ ({filteredAssets.length})
        </button>
        <button className="tab-btn" onClick={() => setTab("maint")} style={s.tabBtn(tab === "maint")}>
          ประวัติซ่อม/ติดตั้ง ({filteredMaint.length})
        </button>
      </div>

      {tab === "assets" ? (
        <div style={s.tableWrap}>
          <table className="data-table" style={s.table}>
            <thead>
              <tr>
                {["Asset ID", "ชื่ออุปกรณ์", "ประเภท", "หมวด", "มูลค่า", "ห้อง", "อาคาร"].map((h) => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((a) => {
                const room = ROOM_BY_ID[a.roomId];
                return (
                  <tr key={a.id}>
                    <td style={s.tdMono}>{a.id}</td>
                    <td style={s.td}>{a.name}</td>
                    <td style={s.td}>{a.type}</td>
                    <td style={s.td}>
                      <span style={a.category === "Asset" ? s.tagAsset : s.tagCost}>{a.category}</span>
                    </td>
                    <td style={{ ...s.td, ...(a.value == null ? s.missingVal : {}) }}>
                      {a.value == null ? "ไม่ระบุ" : fmtTHB(a.value)}
                    </td>
                    <td style={s.td}>{room?.name || "—"}</td>
                    <td style={s.td}>{room?.building || "—"}</td>
                  </tr>
                );
              })}
              {filteredAssets.length === 0 && (
                <tr><td colSpan={7} style={s.emptyCell}>ไม่พบข้อมูลตามตัวกรอง</td></tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={s.tableWrap}>
          <table className="data-table" style={s.table}>
            <thead>
              <tr>
                {["วันที่", "รายการ", "ห้อง", "ประเภทงาน", "ผู้รับเหมา", "ค่าใช้จ่าย", "รับประกันถึง"].map((h) => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredMaint.map((m) => {
                const room = ROOM_BY_ID[m.roomId];
                return (
                  <tr key={m.id}>
                    <td style={s.tdMono}>{m.date}</td>
                    <td style={s.td}>{m.item}</td>
                    <td style={s.td}>{room?.name} · {room?.building}</td>
                    <td style={s.td}>
                      <span style={m.type === "Installation" ? s.tagAsset : s.tagWarn}>{m.type}</span>
                    </td>
                    <td style={s.td}>{m.vendor}</td>
                    <td style={s.td}>{fmtTHB(m.cost)}</td>
                    <td style={s.tdMono}>{m.warrantyEnd}</td>
                  </tr>
                );
              })}
              {filteredMaint.length === 0 && (
                <tr><td colSpan={7} style={s.emptyCell}>ไม่พบข้อมูลตามตัวกรอง</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div style={s.footNote}>
        ข้อมูล ณ วันที่ export — มีเพียง 4 work order เท่านั้น ตัวเลขค่าซ่อมจึงเป็นภาพรวมคร่าว ๆ ยังไม่ใช่แนวโน้มที่แม่นยำ
      </div>
    </div>
  );
}

function KPI({ icon: Icon, label, value, accent }) {
  return (
    <div style={s.kpiCard}>
      <Icon size={16} color={accent || "#2F6F6A"} />
      <div>
        <div style={{ ...s.kpiValue, color: accent || "#1C1F1E" }}>{value}</div>
        <div style={s.kpiLabel}>{label}</div>
      </div>
    </div>
  );
}

const s = {
  app: { fontFamily: "'Inter', sans-serif", background: "#EFEFEC", color: "#1C1F1E", minHeight: "100%", width: "100%", padding: "24px 28px" },
  header: { marginBottom: 18 },
  tag: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.04em", color: "#5B615F", marginBottom: 4 },
  h1: { fontSize: 22, fontWeight: 700, margin: 0 },
  sourceLine: { fontSize: 11.5, color: "#8B8F87", marginTop: 4 },
  filterBar: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 10, alignItems: "center" },
  filterGroup: { display: "flex", alignItems: "center", gap: 8, background: "#FFFFFF", border: "1px solid #D6D6CF", borderRadius: 6, padding: "6px 10px" },
  select: { border: "none", background: "transparent", fontSize: 12.5, color: "#1C1F1E", cursor: "pointer" },
  searchBox: { display: "flex", alignItems: "center", gap: 6, background: "#FFFFFF", border: "1px solid #D6D6CF", borderRadius: 6, padding: "6px 10px", minWidth: 200 },
  searchInput: { border: "none", outline: "none", fontSize: 12.5, flex: 1, background: "transparent" },
  chipRow: { display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" },
  chip: { display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 600, background: "#E4E9E4", color: "#2F6F6A", padding: "4px 8px", borderRadius: 999 },
  kpiRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginBottom: 18 },
  kpiCard: { display: "flex", gap: 10, alignItems: "flex-start", background: "#FFFFFF", border: "1px solid #D6D6CF", borderRadius: 6, padding: "12px 14px" },
  kpiValue: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, fontWeight: 600 },
  kpiLabel: { fontSize: 11, color: "#5B615F", marginTop: 2 },
  chartRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginBottom: 22 },
  chartCard: { background: "#FFFFFF", border: "1px solid #D6D6CF", borderRadius: 6, padding: "14px 16px" },
  h3: { fontSize: 12.5, fontWeight: 700, margin: "0 0 8px" },
  tabBar: { display: "flex", gap: 4, borderBottom: "1px solid #D6D6CF", marginBottom: 0 },
  tabBtn: (active) => ({
    padding: "9px 14px", border: "none", background: "none", cursor: "pointer",
    fontSize: 13, fontWeight: 600, color: active ? "#2F6F6A" : "#8B8F87",
    borderBottom: active ? "2px solid #2F6F6A" : "2px solid transparent",
  }),
  tableWrap: { background: "#FFFFFF", border: "1px solid #D6D6CF", borderTop: "none", borderRadius: "0 0 6px 6px", overflowX: "auto", maxHeight: 420, overflowY: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 12.5 },
  th: { textAlign: "left", padding: "9px 12px", background: "#F4F4F0", borderBottom: "1px solid #D6D6CF", fontSize: 11, fontWeight: 700, color: "#5B615F", position: "sticky", top: 0 },
  td: { padding: "8px 12px", borderBottom: "1px solid #EDEDE7" },
  tdMono: { padding: "8px 12px", borderBottom: "1px solid #EDEDE7", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, color: "#5B615F" },
  missingVal: { color: "#B4472F", fontWeight: 600 },
  tagAsset: { fontSize: 10.5, fontWeight: 600, background: "#E7EFEE", color: "#2F6F6A", padding: "2px 7px", borderRadius: 4 },
  tagCost: { fontSize: 10.5, fontWeight: 600, background: "#F0EFE9", color: "#5B615F", padding: "2px 7px", borderRadius: 4 },
  tagWarn: { fontSize: 10.5, fontWeight: 600, background: "#F5EEDD", color: "#B8811F", padding: "2px 7px", borderRadius: 4 },
  emptyCell: { padding: "24px 12px", textAlign: "center", color: "#8B8F87" },
  footNote: { fontSize: 11, color: "#8B8F87", marginTop: 12, textAlign: "center" },
};
